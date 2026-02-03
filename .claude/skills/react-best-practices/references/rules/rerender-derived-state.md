# Use Derived State, Don't Sync

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Using useEffect to sync state causes extra renders and complexity.

## Solution

Derive values during render instead of syncing with effects.

## Examples

### Bad - Syncing State with Effect
```tsx
'use client'

function Component({ items }) {
  const [filteredItems, setFilteredItems] = useState(items)
  const [searchQuery, setSearchQuery] = useState('')

  // Extra render, potential bugs, complexity
  useEffect(() => {
    setFilteredItems(
      items.filter(item => item.name.includes(searchQuery))
    )
  }, [items, searchQuery])

  return <List items={filteredItems} />
}
```

### Good - Derived During Render
```tsx
'use client'

function Component({ items }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Derived - no extra state, no effect, no extra render
  const filteredItems = items.filter(item =>
    item.name.includes(searchQuery)
  )

  return <List items={filteredItems} />
}
```

### Good - useMemo for Expensive Derivations
```tsx
'use client'

function Component({ items }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Memoized derivation for expensive operations
  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.includes(searchQuery))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [items, searchQuery])

  return <List items={filteredItems} />
}
```

### Bad - Syncing Form Validation
```tsx
'use client'

function Form() {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(email.includes('@'))
  }, [email])

  return <input value={email} onChange={e => setEmail(e.target.value)} />
}
```

### Good - Derived Validation
```tsx
'use client'

function Form() {
  const [email, setEmail] = useState('')

  // Derived - always in sync, no extra render
  const isValid = email.includes('@')

  return <input value={email} onChange={e => setEmail(e.target.value)} />
}
```

### Bad - Syncing Computed Properties
```tsx
'use client'

function Cart({ items }) {
  const [total, setTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0))
    setItemCount(items.length)
  }, [items])

  return <Summary total={total} count={itemCount} />
}
```

### Good - Derived Computed Properties
```tsx
'use client'

function Cart({ items }) {
  // All derived - no syncing needed
  const total = items.reduce((sum, item) => sum + item.price, 0)
  const itemCount = items.length
  const isEmpty = itemCount === 0
  const averagePrice = isEmpty ? 0 : total / itemCount

  return (
    <Summary
      total={total}
      count={itemCount}
      average={averagePrice}
    />
  )
}
```

### Complex Derivation Pattern
```tsx
'use client'

function DataTable({ data, sortColumn, sortDirection, filters }) {
  const processedData = useMemo(() => {
    let result = [...data]

    // Filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => item[key].includes(value))
      }
    })

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return sortDirection === 'asc' ? cmp : -cmp
      })
    }

    return result
  }, [data, sortColumn, sortDirection, filters])

  return <Table data={processedData} />
}
```

## When to Use State vs Derivation

| Scenario | Use |
|----------|-----|
| User input | State |
| Computed from other state/props | Derivation |
| UI state (open/closed) | State |
| Filtered/sorted lists | Derivation |
| Validation results | Derivation |
| Totals, counts, averages | Derivation |

## Key Points

1. If value can be computed from props/state, derive it
2. Avoid useEffect for state synchronization
3. Use useMemo only if derivation is expensive
4. Derived values are always in sync - no bugs
5. Fewer state variables = simpler component
