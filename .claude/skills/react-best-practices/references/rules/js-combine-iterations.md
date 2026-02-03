# Combine Iterations

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Multiple array passes for related operations waste CPU cycles.

## Solution

Combine operations into a single pass when possible.

## Examples

### Bad - Multiple Passes
```tsx
const items = getLargeArray()  // 10,000 items

// Pass 1: Filter
const activeItems = items.filter(item => item.active)
// Pass 2: Map
const values = activeItems.map(item => item.value)
// Pass 3: Filter again
const positiveValues = values.filter(value => value > 0)
// Pass 4: Sum
const total = positiveValues.reduce((sum, val) => sum + val, 0)

// 4 iterations over data!
```

### Good - Single Pass
```tsx
const items = getLargeArray()

const total = items.reduce((sum, item) => {
  if (item.active && item.value > 0) {
    return sum + item.value
  }
  return sum
}, 0)

// 1 iteration!
```

### Multiple Results in One Pass
```tsx
// Bad - separate operations
const activeCount = items.filter(i => i.active).length
const totalValue = items.reduce((sum, i) => sum + i.value, 0)
const categories = [...new Set(items.map(i => i.category))]

// Good - single pass
const { activeCount, totalValue, categories } = items.reduce(
  (acc, item) => {
    if (item.active) acc.activeCount++
    acc.totalValue += item.value
    acc.categories.add(item.category)
    return acc
  },
  { activeCount: 0, totalValue: 0, categories: new Set<string>() }
)
```

### Filter + Map Combined
```tsx
// Bad - two passes
const userNames = users
  .filter(user => user.active)
  .map(user => user.name)

// Good - single pass with flatMap
const userNames = users.flatMap(user =>
  user.active ? [user.name] : []
)

// Good - single pass with reduce
const userNames = users.reduce((names, user) => {
  if (user.active) names.push(user.name)
  return names
}, [] as string[])
```

### React - Combined Render Logic
```tsx
// Bad - multiple derived arrays
function UserList({ users }) {
  const activeUsers = users.filter(u => u.active)
  const sortedUsers = activeUsers.sort((a, b) => a.name.localeCompare(b.name))
  const displayUsers = sortedUsers.slice(0, 10)

  return displayUsers.map(user => <UserCard key={user.id} user={user} />)
}

// Good - combined operation
function UserList({ users }) {
  const displayUsers = useMemo(() => {
    const result = []
    for (const user of users) {
      if (user.active) {
        result.push(user)
        if (result.length >= 10) break  // Early exit!
      }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name))
  }, [users])

  return displayUsers.map(user => <UserCard key={user.id} user={user} />)
}
```

### Group and Count in One Pass
```tsx
// Bad - multiple passes
const byCategory = items.reduce((acc, item) => {
  acc[item.category] = acc[item.category] || []
  acc[item.category].push(item)
  return acc
}, {})

const categoryCounts = Object.entries(byCategory).map(([cat, items]) => ({
  category: cat,
  count: items.length,
  total: items.reduce((sum, i) => sum + i.value, 0),
}))

// Good - single pass
const categoryStats = items.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = { count: 0, total: 0 }
  }
  acc[item.category].count++
  acc[item.category].total += item.value
  return acc
}, {} as Record<string, { count: number; total: number }>)
```

### Early Exit When Possible
```tsx
// Bad - always iterates all items
const hasAdmin = users.filter(u => u.role === 'admin').length > 0

// Good - exits on first match
const hasAdmin = users.some(u => u.role === 'admin')

// Good - find first match
const admin = users.find(u => u.role === 'admin')
```

## When to Optimize

| Data Size | Action |
|-----------|--------|
| < 100 items | Don't worry, readability wins |
| 100-1000 | Consider if called frequently |
| > 1000 | Definitely combine |
| > 10000 | Consider pagination/virtualization |

## Key Points

1. Multiple array methods = multiple iterations
2. `reduce` can combine filter + map + aggregate
3. Use `some`/`find` for early exit
4. Balance readability vs performance
5. Profile before optimizing small arrays
