# Immutable Sorting

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Array.sort() mutates the original array, causing unexpected bugs.

## Solution

Use toSorted() or spread before sort() for immutable operations.

## Examples

### Bad - Mutating Sort
```tsx
function SortedList({ items }) {
  // BUG: This mutates the prop!
  const sorted = items.sort((a, b) => a.name.localeCompare(b.name))

  return <List items={sorted} />
}
// Parent's items array is now mutated!
```

### Good - toSorted() (ES2023+)
```tsx
function SortedList({ items }) {
  // Returns new array, original unchanged
  const sorted = items.toSorted((a, b) => a.name.localeCompare(b.name))

  return <List items={sorted} />
}
```

### Good - Spread Before Sort
```tsx
function SortedList({ items }) {
  // Create copy first
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name))

  return <List items={sorted} />
}
```

### Other Immutable Array Methods (ES2023+)

```tsx
const original = [3, 1, 4, 1, 5]

// toSorted() - sort without mutating
const sorted = original.toSorted()
// original: [3, 1, 4, 1, 5]
// sorted: [1, 1, 3, 4, 5]

// toReversed() - reverse without mutating
const reversed = original.toReversed()
// original: [3, 1, 4, 1, 5]
// reversed: [5, 1, 4, 1, 3]

// toSpliced() - splice without mutating
const spliced = original.toSpliced(2, 1, 99)
// original: [3, 1, 4, 1, 5]
// spliced: [3, 1, 99, 1, 5]

// with() - set index without mutating
const updated = original.with(2, 99)
// original: [3, 1, 4, 1, 5]
// updated: [3, 1, 99, 1, 5]
```

### React State Updates
```tsx
'use client'

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build app', done: false },
  ])

  // Bad - mutates state directly
  const sortTodos = () => {
    todos.sort((a, b) => a.text.localeCompare(b.text))
    setTodos(todos)  // React won't detect change!
  }

  // Good - immutable update
  const sortTodos = () => {
    setTodos(prev => prev.toSorted((a, b) => a.text.localeCompare(b.text)))
  }

  // Toggle done - immutable
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  // Or with .with()
  const toggleTodo = (id: number) => {
    const index = todos.findIndex(t => t.id === id)
    if (index !== -1) {
      setTodos(prev => prev.with(index, {
        ...prev[index],
        done: !prev[index].done,
      }))
    }
  }
}
```

### Sorting in useMemo
```tsx
'use client'

function ProductList({ products, sortBy, sortOrder }) {
  const sortedProducts = useMemo(() => {
    return products.toSorted((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder === 'asc' ? cmp : -cmp
    })
  }, [products, sortBy, sortOrder])

  return <Grid items={sortedProducts} />
}
```

### Polyfill for Older Environments
```tsx
// If toSorted not available
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) {
    return [...this].sort(compareFn)
  }
}
```

## Mutating vs Immutable Methods

| Mutating | Immutable Alternative |
|----------|----------------------|
| sort() | toSorted() or [...arr].sort() |
| reverse() | toReversed() or [...arr].reverse() |
| splice() | toSpliced() or filter/slice |
| arr[i] = x | with(i, x) or map |
| push() | [...arr, item] |
| pop() | arr.slice(0, -1) |

## Key Points

1. Never mutate props or state directly
2. Use toSorted() for modern environments
3. Use [...arr].sort() for compatibility
4. Immutable operations help React detect changes
5. Consider performance with very large arrays
