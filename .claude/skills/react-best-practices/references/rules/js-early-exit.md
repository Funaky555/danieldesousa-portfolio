# Early Exit Patterns

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Processing continues even when result is already determined.

## Solution

Return early when possible to avoid unnecessary work.

## Examples

### Bad - No Early Exit
```tsx
function processUser(user: User | null): string {
  let result = ''

  if (user) {
    if (user.active) {
      if (user.verified) {
        result = `Welcome, ${user.name}!`
      } else {
        result = 'Please verify your email'
      }
    } else {
      result = 'Account inactive'
    }
  } else {
    result = 'User not found'
  }

  return result
}
```

### Good - Guard Clauses
```tsx
function processUser(user: User | null): string {
  if (!user) return 'User not found'
  if (!user.active) return 'Account inactive'
  if (!user.verified) return 'Please verify your email'

  return `Welcome, ${user.name}!`
}
```

### Bad - Full Array Iteration
```tsx
function hasPermission(users: User[], permission: string): boolean {
  let found = false

  users.forEach(user => {
    if (user.permissions.includes(permission)) {
      found = true
      // forEach can't break!
    }
  })

  return found
}
```

### Good - Array.some() for Early Exit
```tsx
function hasPermission(users: User[], permission: string): boolean {
  return users.some(user => user.permissions.includes(permission))
}
```

### Good - for...of with break
```tsx
function findFirstAdmin(users: User[]): User | null {
  for (const user of users) {
    if (user.role === 'admin') {
      return user  // Exit immediately
    }
  }
  return null
}
```

### Validation with Early Exit
```tsx
// Bad - checks all conditions even if first fails
function validateForm(data: FormData): ValidationResult {
  const errors: string[] = []

  if (!data.email) errors.push('Email required')
  if (!data.email.includes('@')) errors.push('Invalid email')
  if (!data.password) errors.push('Password required')
  if (data.password.length < 8) errors.push('Password too short')
  // ... continues checking all

  return { valid: errors.length === 0, errors }
}

// Good - for critical/blocking validation
function validateForm(data: FormData): ValidationResult {
  if (!data.email) {
    return { valid: false, error: 'Email required' }
  }

  if (!data.email.includes('@')) {
    return { valid: false, error: 'Invalid email' }
  }

  if (!data.password) {
    return { valid: false, error: 'Password required' }
  }

  if (data.password.length < 8) {
    return { valid: false, error: 'Password too short' }
  }

  return { valid: true }
}
```

### React - Early Return in Components
```tsx
function UserProfile({ user, loading, error }) {
  // Early returns for edge cases
  if (loading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  if (!user) return <NotFound />

  // Main render only when data is ready
  return (
    <div>
      <Avatar user={user} />
      <UserInfo user={user} />
      <UserActivity user={user} />
    </div>
  )
}
```

### Expensive Operation Guard
```tsx
async function fetchUserData(userId: string | null) {
  // Don't even start if no userId
  if (!userId) return null

  // Don't fetch if we have cache
  const cached = cache.get(userId)
  if (cached) return cached

  // Only now do the expensive operation
  const data = await db.user.findUnique({ where: { id: userId } })
  cache.set(userId, data)
  return data
}
```

### Array Method Selection

| Goal | Best Method |
|------|-------------|
| Find if any match | `some()` (exits on true) |
| Find if all match | `every()` (exits on false) |
| Find first match | `find()` (exits on match) |
| Find first index | `findIndex()` (exits on match) |
| Check all items | `forEach()` (no early exit) |

## Key Points

1. Use guard clauses for edge cases at start
2. `some()`, `find()`, `every()` exit early
3. `forEach()` cannot break - use `for...of` instead
4. Check cheap conditions before expensive ones
5. Early returns make code flatter and more readable
