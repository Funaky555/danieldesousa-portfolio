# Promise.all() for Parallel Operations

**Impact:** CRITICAL
**Category:** Async Operations

## Problem

Sequential awaits cause request waterfalls, dramatically increasing total wait time.

## Solution

Use `Promise.all()` to run independent async operations in parallel.

## Performance Impact

**2-10x improvement** depending on number of operations.

```
Sequential: |--user--|--posts--|--comments--|  = 300ms total
Parallel:   |--user--|
            |--posts--|                        = 100ms total
            |--comments--|
```

## Examples

### Bad - Sequential (Waterfall)
```tsx
async function Dashboard() {
  const user = await fetchUser()        // 100ms
  const posts = await fetchPosts()      // 100ms
  const comments = await fetchComments() // 100ms
  // Total: 300ms

  return <View user={user} posts={posts} comments={comments} />
}
```

### Good - Parallel
```tsx
async function Dashboard() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),      // 100ms
    fetchPosts(),     // 100ms (concurrent)
    fetchComments(),  // 100ms (concurrent)
  ])
  // Total: ~100ms (max of all three)

  return <View user={user} posts={posts} comments={comments} />
}
```

### Good - With Error Handling
```tsx
async function Dashboard() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments(),
    ])
    return <View user={user} posts={posts} comments={comments} />
  } catch (error) {
    // Any failure rejects the whole Promise.all
    return <Error error={error} />
  }
}
```

### Good - With Promise.allSettled for Partial Failures
```tsx
async function Dashboard() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ])

  const user = results[0].status === 'fulfilled' ? results[0].value : null
  const posts = results[1].status === 'fulfilled' ? results[1].value : []
  const comments = results[2].status === 'fulfilled' ? results[2].value : []

  return <View user={user} posts={posts} comments={comments} />
}
```

### Real-World: API Route
```tsx
// app/api/dashboard/route.ts
export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [user, stats, notifications, recentActivity] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id } }),
    db.stats.findFirst({ where: { userId: session.user.id } }),
    db.notification.findMany({ where: { userId: session.user.id }, take: 5 }),
    db.activity.findMany({ where: { userId: session.user.id }, take: 10 }),
  ])

  return Response.json({ user, stats, notifications, recentActivity })
}
```

## When NOT to Use

Don't parallelize when operations are dependent:

```tsx
// These ARE dependent - must be sequential
const user = await getUser(userId)
const permissions = await getPermissions(user.roleId)  // Needs user.roleId
```

## Key Points

1. `Promise.all()` runs all promises concurrently
2. Total time = slowest operation (not sum of all)
3. One rejection rejects the entire `Promise.all()`
4. Use `Promise.allSettled()` for partial failure tolerance
5. Only parallelize truly independent operations
