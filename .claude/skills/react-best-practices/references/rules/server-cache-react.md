# React.cache() for Request Deduplication

**Impact:** HIGH
**Category:** Server-Side Performance

## Problem

Same data fetched multiple times within a single request.

## Solution

Use `React.cache()` to deduplicate fetches per-request.

## Examples

### Bad - Multiple Fetches
```tsx
// layout.tsx
async function Layout({ children }) {
  const user = await getUser()  // Fetch #1
  return <Nav user={user}>{children}</Nav>
}

// page.tsx
async function Page() {
  const user = await getUser()  // Fetch #2 (same data!)
  return <Profile user={user} />
}

// component.tsx
async function Sidebar() {
  const user = await getUser()  // Fetch #3 (same data!)
  return <UserCard user={user} />
}
// 3 identical database queries per request!
```

### Good - React.cache()
```tsx
// lib/data.ts
import { cache } from 'react'
import { db } from './db'

export const getUser = cache(async () => {
  return db.user.findUnique({ where: { id: getCurrentUserId() } })
})

// Now all components share the same cached result:
// layout.tsx
const user = await getUser()  // Fetch #1

// page.tsx
const user = await getUser()  // Cache hit!

// component.tsx
const user = await getUser()  // Cache hit!
// Only 1 database query per request
```

### With Parameters
```tsx
// lib/data.ts
import { cache } from 'react'

export const getPost = cache(async (postId: string) => {
  return db.post.findUnique({ where: { id: postId } })
})

export const getUserById = cache(async (userId: string) => {
  return db.user.findUnique({ where: { id: userId } })
})

// Usage - same postId = cache hit
const post1 = await getPost('123')  // Fetch
const post2 = await getPost('123')  // Cache hit!
const post3 = await getPost('456')  // Different ID = new fetch
```

### Preload Pattern
```tsx
// lib/data.ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})

// Preload function - starts fetch without awaiting
export const preloadUser = (id: string) => {
  void getUser(id)
}

// layout.tsx
export default function Layout({ params, children }) {
  // Start fetch early
  preloadUser(params.userId)

  return (
    <div>
      <Sidebar userId={params.userId} />
      {children}
    </div>
  )
}

// page.tsx - fetch already started by layout
async function Page({ params }) {
  const user = await getUser(params.userId)  // Fast - already fetching
  return <Profile user={user} />
}
```

### Multiple Related Queries
```tsx
// lib/data.ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})

export const getUserPosts = cache(async (userId: string) => {
  return db.post.findMany({ where: { authorId: userId } })
})

export const getUserStats = cache(async (userId: string) => {
  return db.stats.findUnique({ where: { userId } })
})

// Preload all user data
export const preloadUserData = (userId: string) => {
  void getUser(userId)
  void getUserPosts(userId)
  void getUserStats(userId)
}
```

### Combining with fetch
```tsx
import { cache } from 'react'

// Cached fetch wrapper
export const fetchAPI = cache(async (endpoint: string) => {
  const res = await fetch(`https://api.example.com${endpoint}`)
  return res.json()
})

// Usage
const data1 = await fetchAPI('/users')  // Fetch
const data2 = await fetchAPI('/users')  // Cache hit!
```

## Important Notes

1. **Request-scoped**: Cache is per-request, cleared after response
2. **Server-only**: Works in Server Components and Route Handlers
3. **Same arguments = cache hit**: Arguments are compared by value
4. **No manual invalidation**: Fresh request = fresh cache

## Key Points

1. Wrap data-fetching functions with `cache()`
2. Same function + same args = deduplicated within request
3. Use preload pattern to start fetches early
4. Cache is automatically cleared per-request
5. Works with any async function, not just fetch
