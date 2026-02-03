# Manage Async Dependencies

**Impact:** CRITICAL
**Category:** Async Operations

## Problem

Creating unnecessary waterfalls by awaiting operations that aren't actually dependent.

## Solution

Identify true dependencies and parallelize independent operations.

## Examples

### Bad - False Dependencies
```tsx
async function Page({ userId }) {
  // These look dependent but aren't
  const user = await getUser(userId)
  const globalSettings = await getSettings()  // Doesn't need user!
  const notifications = await getNotifications()  // Doesn't need user!

  return <Dashboard user={user} settings={globalSettings} />
}
```

### Good - Identify Independence
```tsx
async function Page({ userId }) {
  // Run independent operations in parallel
  const [user, globalSettings, notifications] = await Promise.all([
    getUser(userId),
    getSettings(),  // Independent
    getNotifications(),  // Independent
  ])

  return <Dashboard user={user} settings={globalSettings} />
}
```

### Mixed Dependencies
```tsx
async function Page({ userId }) {
  // First: Get user (other things depend on this)
  const user = await getUser(userId)

  // Then: Parallel operations that depend on user
  const [posts, followers, settings] = await Promise.all([
    getPosts(user.id),
    getFollowers(user.id),
    getUserSettings(user.id),
  ])

  return <Profile user={user} posts={posts} followers={followers} />
}
```

### Optimal - Minimize Dependencies
```tsx
async function Page({ userId }) {
  // Start user-independent fetches immediately
  const globalDataPromise = Promise.all([
    getSettings(),
    getAnnouncements(),
  ])

  // Fetch user
  const user = await getUser(userId)

  // Parallel: user-dependent + awaiting global
  const [userPosts, [settings, announcements]] = await Promise.all([
    getPosts(user.id),
    globalDataPromise,  // Already started!
  ])

  return <Page user={user} posts={userPosts} settings={settings} />
}
```

## Dependency Analysis

Ask yourself:
1. Does operation B actually need the result of operation A?
2. Can B start before A completes?
3. Can multiple operations share a dependency?

## Key Points

1. Not all sequential code has sequential dependencies
2. Analyze what each operation truly needs
3. Start independent operations as early as possible
4. Group dependent operations after their dependency resolves
