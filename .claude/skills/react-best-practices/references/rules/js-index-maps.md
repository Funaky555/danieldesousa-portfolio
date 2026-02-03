# Use Indexed Maps

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Searching arrays repeatedly is O(n) per lookup.

## Solution

Create indexed maps for O(1) lookups.

## Examples

### Bad - Array Search
```tsx
function getUserName(users: User[], userId: string): string {
  const user = users.find(u => u.id === userId)  // O(n)
  return user?.name ?? 'Unknown'
}

// Called 1000 times = O(n * 1000) = O(n²)
orderItems.forEach(item => {
  const userName = getUserName(users, item.userId)
  console.log(`${userName} ordered ${item.product}`)
})
```

### Good - Indexed Map
```tsx
// Create index once: O(n)
const userIndex = new Map(users.map(u => [u.id, u]))

function getUserName(userId: string): string {
  return userIndex.get(userId)?.name ?? 'Unknown'  // O(1)
}

// Called 1000 times = O(1 * 1000) = O(n)
orderItems.forEach(item => {
  const userName = getUserName(item.userId)
  console.log(`${userName} ordered ${item.product}`)
})
```

### Create Index Helper
```tsx
function indexBy<T, K extends keyof T>(
  array: T[],
  key: K
): Map<T[K], T> {
  return new Map(array.map(item => [item[key], item]))
}

// Usage
const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

const userById = indexBy(users, 'id')
userById.get('1')  // { id: '1', name: 'Alice' }
```

### Multiple Indexes
```tsx
interface Product {
  id: string
  sku: string
  category: string
  name: string
}

class ProductIndex {
  private byId: Map<string, Product>
  private bySku: Map<string, Product>
  private byCategory: Map<string, Product[]>

  constructor(products: Product[]) {
    this.byId = new Map(products.map(p => [p.id, p]))
    this.bySku = new Map(products.map(p => [p.sku, p]))
    this.byCategory = products.reduce((acc, p) => {
      const list = acc.get(p.category) || []
      list.push(p)
      acc.set(p.category, list)
      return acc
    }, new Map())
  }

  getById(id: string) { return this.byId.get(id) }
  getBySku(sku: string) { return this.bySku.get(sku) }
  getByCategory(category: string) { return this.byCategory.get(category) || [] }
}
```

### React - useMemo for Index
```tsx
'use client'

function UserOrders({ users, orders }) {
  // Create index once, update when users change
  const userIndex = useMemo(
    () => new Map(users.map(u => [u.id, u])),
    [users]
  )

  return (
    <ul>
      {orders.map(order => {
        const user = userIndex.get(order.userId)  // O(1)
        return (
          <li key={order.id}>
            {user?.name ?? 'Unknown'}: {order.product}
          </li>
        )
      })}
    </ul>
  )
}
```

### Group By Index
```tsx
function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Map<K, T[]> {
  return array.reduce((acc, item) => {
    const key = keyFn(item)
    const group = acc.get(key) || []
    group.push(item)
    acc.set(key, group)
    return acc
  }, new Map<K, T[]>())
}

// Usage
const ordersByUser = groupBy(orders, o => o.userId)
const ordersForUser1 = ordersByUser.get('user1') || []  // O(1)
```

### When to Create Index

| Scenario | Create Index? |
|----------|---------------|
| Single lookup | No - find() is fine |
| Few lookups (< 5) | Probably not |
| Many lookups (> 10) | Yes |
| Data changes frequently | Consider overhead |
| Large dataset (> 100) | Definitely yes |

## Key Points

1. Array.find() is O(n), Map.get() is O(1)
2. Create index once, use many times
3. useMemo in React to cache index
4. Consider memory vs speed tradeoff
5. Multiple indexes for different access patterns
