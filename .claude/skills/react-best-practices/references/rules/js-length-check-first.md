# Length Check First

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Expensive checks run even when quick checks could short-circuit.

## Solution

Order conditions from cheapest to most expensive.

## Examples

### Bad - Expensive Check First
```tsx
function shouldProcess(item: Item): boolean {
  // complexValidation runs even for empty items!
  return complexValidation(item) && item.data.length > 0
}
```

### Good - Cheap Check First
```tsx
function shouldProcess(item: Item): boolean {
  // Empty check is instant, skips complexValidation
  return item.data.length > 0 && complexValidation(item)
}
```

### Short-Circuit Evaluation
```tsx
// && stops on first false
if (array.length > 0 && expensiveCheck(array)) { }
// If array is empty, expensiveCheck never runs

// || stops on first true
if (quickCheck(item) || expensiveCheck(item)) { }
// If quickCheck returns true, expensiveCheck never runs
```

### Array Operations
```tsx
// Bad - filter even empty arrays
function processItems(items: Item[]) {
  const filtered = items.filter(complexFilter)
  if (filtered.length === 0) return []
  return filtered.map(transform)
}

// Good - early exit
function processItems(items: Item[]) {
  if (items.length === 0) return []

  const filtered = items.filter(complexFilter)
  if (filtered.length === 0) return []

  return filtered.map(transform)
}
```

### Validation Order
```tsx
// Bad - regex runs even for empty string
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 0
}

// Good - length check first
function isValidEmail(email: string): boolean {
  return email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Even better - more specific checks first
function isValidEmail(email: string): boolean {
  return (
    email.length > 0 &&
    email.length < 255 &&
    email.includes('@') &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
}
```

### Database Queries
```tsx
// Bad - hits database even without ID
async function getUser(userId?: string): Promise<User | null> {
  const user = await db.user.findUnique({ where: { id: userId } })
  return user && userId ? user : null
}

// Good - check input first
async function getUser(userId?: string): Promise<User | null> {
  if (!userId) return null
  return db.user.findUnique({ where: { id: userId } })
}
```

### Permission Checks
```tsx
// Bad - fetches permissions even if basic check fails
async function canAccess(user: User, resource: Resource): Promise<boolean> {
  const permissions = await fetchPermissions(user.id)
  return user.active && permissions.includes(resource.requiredPermission)
}

// Good - cheap checks first
async function canAccess(user: User, resource: Resource): Promise<boolean> {
  // Cheap synchronous checks first
  if (!user.active) return false
  if (user.role === 'admin') return true  // Admins bypass permission check

  // Only fetch permissions if needed
  const permissions = await fetchPermissions(user.id)
  return permissions.includes(resource.requiredPermission)
}
```

### React Conditional Rendering
```tsx
function UserList({ users, isAdmin }) {
  // Bad - filter runs even when not admin
  const adminView = isAdmin && users.filter(u => u.role === 'admin')

  // Good - check isAdmin first
  if (!isAdmin) return <BasicUserList users={users} />

  const adminUsers = users.filter(u => u.role === 'admin')
  return <AdminUserList users={adminUsers} />
}
```

## Cost Order (Cheapest to Expensive)

1. Boolean check
2. Number comparison
3. String length check
4. String comparison
5. Array length check
6. Object property access
7. Array includes/some/find
8. Regular expression
9. Network request
10. Database query

## Key Points

1. JavaScript uses short-circuit evaluation
2. Put cheapest checks first in && chains
3. Null/undefined checks are instant
4. Length checks prevent empty processing
5. Profile if unsure about relative costs
