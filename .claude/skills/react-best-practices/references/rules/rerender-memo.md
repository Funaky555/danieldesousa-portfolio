# Memoization Patterns

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Expensive computations or component renders happen unnecessarily.

## Solution

Use React.memo, useMemo, and useCallback strategically.

## React.memo - Memoize Components

### Bad - Always Re-renders
```tsx
'use client'

function ExpensiveList({ items }) {
  console.log('Rendering list')  // Every parent render
  return items.map(item => <Item key={item.id} {...item} />)
}

function Parent() {
  const [count, setCount] = useState(0)
  const items = [{ id: 1, name: 'A' }]

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveList items={items} />  {/* Re-renders on count change! */}
    </div>
  )
}
```

### Good - memo Prevents Re-render
```tsx
'use client'

import { memo } from 'react'

const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log('Rendering list')  // Only when items change
  return items.map(item => <Item key={item.id} {...item} />)
})

function Parent() {
  const [count, setCount] = useState(0)
  const items = useMemo(() => [{ id: 1, name: 'A' }], [])  // Stable reference

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveList items={items} />  {/* Doesn't re-render! */}
    </div>
  )
}
```

## useMemo - Memoize Values

### Bad - Recalculates Every Render
```tsx
'use client'

function Component({ items }) {
  // Sorts on every render
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name))

  return <List items={sortedItems} />
}
```

### Good - Memoized Calculation
```tsx
'use client'

function Component({ items }) {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  )

  return <List items={sortedItems} />
}
```

## useCallback - Memoize Functions

### Bad - New Function Every Render
```tsx
'use client'

function Parent() {
  const [count, setCount] = useState(0)

  // New function every render
  const handleClick = () => {
    console.log('clicked')
  }

  return <MemoizedChild onClick={handleClick} />  // Child re-renders anyway!
}
```

### Good - Stable Function Reference
```tsx
'use client'

function Parent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])  // Stable reference

  return <MemoizedChild onClick={handleClick} />  // Child doesn't re-render
}
```

## Combined Pattern

```tsx
'use client'

import { memo, useMemo, useCallback } from 'react'

const DataTable = memo(function DataTable({ data, onRowClick, sortBy }) {
  const sortedData = useMemo(
    () => [...data].sort((a, b) => a[sortBy] - b[sortBy]),
    [data, sortBy]
  )

  return (
    <table>
      {sortedData.map(row => (
        <tr key={row.id} onClick={() => onRowClick(row.id)}>
          {/* ... */}
        </tr>
      ))}
    </table>
  )
})

function Parent() {
  const [data, setData] = useState([])
  const [sortBy, setSortBy] = useState('name')

  const handleRowClick = useCallback((id) => {
    console.log('Row clicked:', id)
  }, [])

  return (
    <DataTable
      data={data}
      sortBy={sortBy}
      onRowClick={handleRowClick}
    />
  )
}
```

## When NOT to Memoize

```tsx
// Don't memoize cheap operations
const double = x * 2  // Not worth memoizing

// Don't memoize if props change often anyway
const alwaysNew = useMemo(() => ({ time: Date.now() }), [])  // Still new!

// Don't memoize primitives
const name = useMemo(() => user.name, [user.name])  // Pointless
```

## Decision Guide

| Scenario | Tool |
|----------|------|
| Expensive computation | `useMemo` |
| Prevent child re-render | `memo` + stable props |
| Function prop to memoized child | `useCallback` |
| Object/array prop to memoized child | `useMemo` |
| Cheap operation | None |

## Key Points

1. `memo` - skip re-render if props unchanged
2. `useMemo` - cache expensive computed values
3. `useCallback` - cache function references
4. All require stable dependencies to be effective
5. Profile before optimizing - measure impact
