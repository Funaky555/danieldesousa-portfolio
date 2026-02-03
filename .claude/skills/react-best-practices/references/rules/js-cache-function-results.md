# Cache Function Results

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Repeatedly calling expensive functions with same inputs.

## Solution

Cache/memoize function results.

## Examples

### Bad - Repeated Expensive Calls
```tsx
function formatPrice(amount: number, currency: string) {
  // Expensive: creates new Intl.NumberFormat each time
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Called 1000 times with same currency
items.forEach(item => {
  console.log(formatPrice(item.price, 'USD'))  // Creates 1000 formatters!
})
```

### Good - Cached Formatter
```tsx
const formatters = new Map<string, Intl.NumberFormat>()

function formatPrice(amount: number, currency: string) {
  let formatter = formatters.get(currency)

  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    })
    formatters.set(currency, formatter)
  }

  return formatter.format(amount)
}

// Now only creates formatter once per currency
items.forEach(item => {
  console.log(formatPrice(item.price, 'USD'))  // Reuses formatter
})
```

### Generic Memoize Function
```tsx
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Usage
const expensiveCalculation = memoize((x: number, y: number) => {
  console.log('Calculating...')  // Only logs once per unique x,y
  return x ** y
})

expensiveCalculation(2, 10)  // Calculating... 1024
expensiveCalculation(2, 10)  // 1024 (cached)
expensiveCalculation(3, 10)  // Calculating... 59049
```

### With WeakMap for Object Keys
```tsx
const cache = new WeakMap<object, any>()

function processObject(obj: object) {
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const result = expensiveOperation(obj)
  cache.set(obj, result)
  return result
}
```

### React Hook for Memoized Formatter
```tsx
'use client'

function useCurrencyFormatter(currency: string) {
  return useMemo(
    () => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }),
    [currency]
  )
}

function PriceList({ items, currency }) {
  const formatter = useCurrencyFormatter(currency)

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{formatter.format(item.price)}</li>
      ))}
    </ul>
  )
}
```

### Date Formatter Cache
```tsx
const dateFormatters = new Map<string, Intl.DateTimeFormat>()

function formatDate(date: Date, locale: string, options: Intl.DateTimeFormatOptions) {
  const key = `${locale}-${JSON.stringify(options)}`

  if (!dateFormatters.has(key)) {
    dateFormatters.set(key, new Intl.DateTimeFormat(locale, options))
  }

  return dateFormatters.get(key)!.format(date)
}
```

### LRU Cache for Large Datasets
```tsx
class LRUCache<K, V> {
  private cache = new Map<K, V>()
  private maxSize: number

  constructor(maxSize: number) {
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      // Delete oldest (first item)
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }
}
```

## Key Points

1. Cache expensive object creation (Intl, RegExp, etc.)
2. Use Map for string keys, WeakMap for object keys
3. Consider LRU cache to prevent memory bloat
4. In React, useMemo serves similar purpose
5. Measure before optimizing - caching has overhead
