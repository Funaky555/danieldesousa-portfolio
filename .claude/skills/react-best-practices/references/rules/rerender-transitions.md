# Use Transitions for Non-Urgent Updates

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Expensive state updates block the UI, making it feel sluggish.

## Solution

Use useTransition to mark updates as non-urgent.

## Examples

### Bad - Blocking UI
```tsx
'use client'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)  // Urgent - user sees typing
    setResults(search(value))  // Expensive - blocks UI!
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultList results={results} />
    </div>
  )
}
// Typing feels laggy because search blocks each keystroke
```

### Good - Transition for Non-Urgent Update
```tsx
'use client'

import { useState, useTransition } from 'react'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)  // Urgent - immediate

    startTransition(() => {
      setResults(search(value))  // Non-urgent - can be interrupted
    })
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultList results={results} />
    </div>
  )
}
// Typing is smooth, results update when possible
```

### Tab Switching Example

```tsx
'use client'

import { useState, useTransition } from 'react'

function Tabs() {
  const [tab, setTab] = useState('home')
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab)  // Allow interruption if user clicks another tab
    })
  }

  return (
    <div>
      <TabBar
        activeTab={tab}
        onChange={handleTabChange}
        isPending={isPending}
      />
      <TabContent tab={tab} />
    </div>
  )
}
```

### With Loading Indicator
```tsx
'use client'

function FilterableList({ items }) {
  const [filter, setFilter] = useState('')
  const [filteredItems, setFilteredItems] = useState(items)
  const [isPending, startTransition] = useTransition()

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilter(value)  // Immediate - keep input responsive

    startTransition(() => {
      // Expensive filtering
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        item.tags.some(tag => tag.includes(value))
      )
      setFilteredItems(filtered)
    })
  }

  return (
    <div>
      <input value={filter} onChange={handleFilterChange} />
      <div className={isPending ? 'opacity-50' : ''}>
        <List items={filteredItems} />
      </div>
    </div>
  )
}
```

### useDeferredValue Alternative
```tsx
'use client'

import { useDeferredValue, useMemo } from 'react'

function Search({ items }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => items.filter(item => item.name.includes(deferredQuery)),
    [items, deferredQuery]
  )

  const isStale = query !== deferredQuery

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div className={isStale ? 'opacity-50' : ''}>
        <ResultList results={results} />
      </div>
    </div>
  )
}
```

## useTransition vs useDeferredValue

| Feature | useTransition | useDeferredValue |
|---------|---------------|------------------|
| Controls | State update | Value reading |
| Use when | You control the update | Value comes from props |
| Returns | [isPending, startTransition] | deferredValue |
| Pattern | Wrap setState in startTransition | Wrap value usage |

## When to Use Transitions

| Scenario | Use Transition? |
|----------|-----------------|
| Search filtering large lists | Yes |
| Tab switching with heavy content | Yes |
| Real-time form validation | Maybe |
| Keyboard input | No (keep responsive) |
| Critical UI updates | No |
| Navigation | Built into Next.js |

## Key Points

1. Transitions mark updates as interruptible
2. User input stays responsive
3. `isPending` shows loading state
4. New urgent updates can interrupt transitions
5. Works with Suspense for streaming
