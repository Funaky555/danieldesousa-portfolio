# Optimize Min/Max Loops

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Using Math.min/max with spread on large arrays can crash.

## Solution

Use reduce for large datasets or track min/max during iteration.

## Examples

### Bad - Spread Operator
```tsx
const numbers = getLargeArray()  // 100,000+ items

// This can cause "Maximum call stack size exceeded"!
const max = Math.max(...numbers)
const min = Math.min(...numbers)
```

### Good - Reduce
```tsx
const numbers = getLargeArray()

const max = numbers.reduce((a, b) => Math.max(a, b), -Infinity)
const min = numbers.reduce((a, b) => Math.min(a, b), Infinity)
```

### Good - Single Pass for Both
```tsx
const { min, max } = numbers.reduce(
  (acc, num) => ({
    min: Math.min(acc.min, num),
    max: Math.max(acc.max, num),
  }),
  { min: Infinity, max: -Infinity }
)
```

### Imperative Version (Fastest)
```tsx
function getMinMax(numbers: number[]): { min: number; max: number } {
  if (numbers.length === 0) {
    return { min: NaN, max: NaN }
  }

  let min = numbers[0]
  let max = numbers[0]

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) min = numbers[i]
    if (numbers[i] > max) max = numbers[i]
  }

  return { min, max }
}
```

### During Other Operations
```tsx
// Bad - multiple passes
const items = fetchItems()
const total = items.reduce((sum, i) => sum + i.value, 0)
const maxValue = Math.max(...items.map(i => i.value))
const minValue = Math.min(...items.map(i => i.value))

// Good - single pass
const stats = items.reduce(
  (acc, item) => ({
    total: acc.total + item.value,
    min: Math.min(acc.min, item.value),
    max: Math.max(acc.max, item.value),
    count: acc.count + 1,
  }),
  { total: 0, min: Infinity, max: -Infinity, count: 0 }
)
```

### Object Property Min/Max
```tsx
const users = getUsers()

// Bad - spread with map
const oldestAge = Math.max(...users.map(u => u.age))

// Good - reduce
const oldestAge = users.reduce(
  (max, user) => Math.max(max, user.age),
  0
)

// Get the entire object
const oldestUser = users.reduce(
  (oldest, user) => user.age > oldest.age ? user : oldest,
  users[0]
)
```

### Sorted Array Optimization
```tsx
// If array is already sorted:
const sortedNumbers = getSortedNumbers()

// O(1) instead of O(n)!
const min = sortedNumbers[0]
const max = sortedNumbers[sortedNumbers.length - 1]
```

### React with useMemo
```tsx
'use client'

function Chart({ data }) {
  const { min, max } = useMemo(() => {
    if (data.length === 0) return { min: 0, max: 0 }

    return data.reduce(
      (acc, point) => ({
        min: Math.min(acc.min, point.value),
        max: Math.max(acc.max, point.value),
      }),
      { min: data[0].value, max: data[0].value }
    )
  }, [data])

  return <ChartComponent data={data} yMin={min} yMax={max} />
}
```

## Performance Comparison

| Method | Small Array (100) | Large Array (100k) |
|--------|------------------|-------------------|
| `Math.max(...arr)` | Fast | Stack overflow |
| `arr.reduce(Math.max)` | Fast | Fast |
| Imperative loop | Fastest | Fastest |

## Key Points

1. `Math.max(...arr)` fails on large arrays
2. Use reduce for safe min/max
3. Combine with other operations when possible
4. For sorted arrays, use first/last element
5. Imperative loops are fastest but less readable
