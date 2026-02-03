# Use Set/Map for Lookups

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Array.includes() is O(n), problematic for large arrays or frequent lookups.

## Solution

Use Set for O(1) membership testing, Map for O(1) key-value lookup.

## Examples

### Bad - Array Includes
```tsx
const allowedIds = ['id1', 'id2', 'id3', /* ... 1000 more */]

function isAllowed(id: string): boolean {
  return allowedIds.includes(id)  // O(n) every call
}

// Called for each of 10,000 items
items.filter(item => isAllowed(item.id))  // O(n * m)
```

### Good - Set Has
```tsx
const allowedIds = new Set(['id1', 'id2', 'id3', /* ... 1000 more */])

function isAllowed(id: string): boolean {
  return allowedIds.has(id)  // O(1) every call
}

// Called for each of 10,000 items
items.filter(item => isAllowed(item.id))  // O(m)
```

### Converting Array to Set
```tsx
const array = ['a', 'b', 'c', 'a', 'b']

// Create Set (also removes duplicates)
const set = new Set(array)

// Check membership
set.has('a')  // true
set.has('d')  // false

// Convert back to array
const unique = [...set]  // ['a', 'b', 'c']
```

### Map for Key-Value
```tsx
// Bad - find in array
const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

function getUser(id: string) {
  return users.find(u => u.id === id)  // O(n)
}

// Good - Map lookup
const userMap = new Map(users.map(u => [u.id, u]))

function getUser(id: string) {
  return userMap.get(id)  // O(1)
}
```

### Deduplication
```tsx
// Bad - O(n²)
const unique = array.filter((item, index) =>
  array.indexOf(item) === index
)

// Good - O(n)
const unique = [...new Set(array)]
```

### React - useMemo for Sets
```tsx
'use client'

function FilteredList({ items, selectedIds }) {
  // Convert to Set once
  const selectedSet = useMemo(
    () => new Set(selectedIds),
    [selectedIds]
  )

  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          className={selectedSet.has(item.id) ? 'selected' : ''}  // O(1)
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

### Intersection and Difference
```tsx
const setA = new Set([1, 2, 3, 4])
const setB = new Set([3, 4, 5, 6])

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)))
// Set {3, 4}

// Difference (A - B)
const difference = new Set([...setA].filter(x => !setB.has(x)))
// Set {1, 2}

// Union
const union = new Set([...setA, ...setB])
// Set {1, 2, 3, 4, 5, 6}
```

### Object Keys as Set
```tsx
const config = {
  featureA: true,
  featureB: true,
  featureC: false,
}

// Bad - Object.keys() creates array each time
if (Object.keys(config).includes('featureA')) { }

// Good - check property directly
if ('featureA' in config) { }
// or
if (config.hasOwnProperty('featureA')) { }

// If checking many times, create Set
const configKeys = new Set(Object.keys(config))
if (configKeys.has('featureA')) { }
```

## Complexity Comparison

| Operation | Array | Set/Map |
|-----------|-------|---------|
| Add | O(1) push | O(1) |
| Check existence | O(n) includes | O(1) has |
| Delete | O(n) splice | O(1) delete |
| Get by key | O(n) find | O(1) get |

## Key Points

1. Set for membership testing (has)
2. Map for key-value lookup (get)
3. Both have O(1) operations vs O(n) for arrays
4. Convert array to Set once, reuse many times
5. Use useMemo in React for derived Sets/Maps
