# useLatest Pattern

**Impact:** LOW
**Category:** Advanced Patterns

## Problem

Need to access latest value in callbacks without adding to dependencies.

## Solution

Store latest value in ref, access in callbacks.

## Examples

### The useLatest Hook
```tsx
'use client'

function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef(value)
  ref.current = value
  return ref
}
```

### Problem: Stale Closure
```tsx
'use client'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      console.log('Count is:', count)  // Always logs initial value!
    }, 1000)

    return () => clearInterval(id)
  }, [])  // count not in deps = stale closure

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
// Logs "Count is: 0" forever, even after clicking
```

### Solution: useLatest
```tsx
'use client'

function Counter() {
  const [count, setCount] = useState(0)
  const latestCount = useLatest(count)

  useEffect(() => {
    const id = setInterval(() => {
      console.log('Count is:', latestCount.current)  // Always latest!
    }, 1000)

    return () => clearInterval(id)
  }, [])  // No dependency on count needed

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
// Logs correct current count
```

### Accessing Multiple Latest Values
```tsx
'use client'

function DataFetcher({ query, filters, onResult }) {
  const latestQuery = useLatest(query)
  const latestFilters = useLatest(filters)
  const latestOnResult = useLatest(onResult)

  const fetchData = useCallback(async () => {
    const data = await api.search({
      query: latestQuery.current,
      filters: latestFilters.current,
    })
    latestOnResult.current(data)
  }, [])  // Empty deps - stable function

  useEffect(() => {
    const debounced = debounce(fetchData, 300)
    debounced()
    return () => debounced.cancel()
  }, [query, filters])  // Re-run on changes, but fetchData is stable

  return null
}
```

### Animation with Latest Props
```tsx
'use client'

function AnimatedValue({ value, duration }) {
  const [displayValue, setDisplayValue] = useState(value)
  const latestValue = useLatest(value)

  useEffect(() => {
    let animationId: number
    const startValue = displayValue
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = startValue + (latestValue.current - startValue) * progress
      setDisplayValue(current)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [value, duration])

  return <span>{displayValue.toFixed(2)}</span>
}
```

### Debounced Search with Latest Query
```tsx
'use client'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const latestQuery = useLatest(query)

  const search = useMemo(
    () => debounce(async () => {
      // Always uses latest query, even if debounced
      const currentQuery = latestQuery.current
      if (!currentQuery) {
        setResults([])
        return
      }

      const data = await api.search(currentQuery)

      // Check if query is still current (avoid race conditions)
      if (latestQuery.current === currentQuery) {
        setResults(data)
      }
    }, 300),
    []
  )

  useEffect(() => {
    search()
    return () => search.cancel()
  }, [query, search])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Results items={results} />
    </div>
  )
}
```

### Full-Featured useLatest
```tsx
'use client'

import { useRef, useLayoutEffect } from 'react'

function useLatest<T>(value: T) {
  const ref = useRef(value)

  // useLayoutEffect ensures ref is updated before any effects run
  useLayoutEffect(() => {
    ref.current = value
  })

  return ref
}
```

## When to Use

| Scenario | Use useLatest? |
|----------|---------------|
| Value needed in interval/timer | Yes |
| Value needed in event subscription | Yes |
| Avoiding stale closures | Yes |
| Simple derived state | No - just compute |
| Render-time values | No - use value directly |

## Key Points

1. Refs persist across renders without causing re-renders
2. Update ref synchronously on each render
3. Access `ref.current` in callbacks for latest value
4. Avoids stale closure problems
5. Useful for intervals, timers, subscriptions, debounced functions
