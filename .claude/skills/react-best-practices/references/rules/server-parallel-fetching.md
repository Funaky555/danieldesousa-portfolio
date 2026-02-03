# Parallel Server Fetching

**Impact:** HIGH
**Category:** Server-Side Performance

## Problem

Sequential data fetching in layouts and pages creates waterfalls.

## Solution

Start fetches in parallel, await when data is needed.

## Examples

### Bad - Layout/Page Waterfall
```tsx
// layout.tsx
export default async function Layout({ children }) {
  const user = await getUser()  // 100ms - blocks page
  return <Nav user={user}>{children}</Nav>
}

// page.tsx (waits for layout to complete)
export default async function Page() {
  const posts = await getPosts()  // 100ms
  return <PostList posts={posts} />
}
// Total: 200ms sequential
```

### Good - Parallel with Preload
```tsx
// lib/data.ts
import { cache } from 'react'

export const getUser = cache(async () => {
  return db.user.findFirst()
})

export const getPosts = cache(async () => {
  return db.post.findMany()
})

// Preload functions
export const preloadUser = () => void getUser()
export const preloadPosts = () => void getPosts()

// layout.tsx
export default async function Layout({ children }) {
  // Start both fetches immediately
  preloadUser()
  preloadPosts()

  const user = await getUser()
  return <Nav user={user}>{children}</Nav>
}

// page.tsx
export default async function Page() {
  const posts = await getPosts()  // Already started by layout!
  return <PostList posts={posts} />
}
// Total: ~100ms (parallel)
```

### Good - Promise.all in Single Component
```tsx
export default async function Dashboard() {
  const [user, posts, stats, notifications] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
    getNotifications(),
  ])

  return (
    <div>
      <Header user={user} notifications={notifications} />
      <Stats data={stats} />
      <PostList posts={posts} />
    </div>
  )
}
```

### Good - Parallel Route Segments
```tsx
// Next.js parallel routes with loading states

// app/@sidebar/page.tsx
export default async function Sidebar() {
  const user = await getUser()
  return <UserSidebar user={user} />
}

// app/@main/page.tsx
export default async function Main() {
  const posts = await getPosts()
  return <PostFeed posts={posts} />
}

// app/layout.tsx
export default function Layout({ sidebar, main }) {
  return (
    <div className="flex">
      <Suspense fallback={<SidebarSkeleton />}>
        {sidebar}
      </Suspense>
      <Suspense fallback={<MainSkeleton />}>
        {main}
      </Suspense>
    </div>
  )
}
```

### Parallel with Different Load Times
```tsx
import { Suspense } from 'react'

async function FastData() {
  const data = await getFastData()  // 50ms
  return <FastComponent data={data} />
}

async function SlowData() {
  const data = await getSlowData()  // 500ms
  return <SlowComponent data={data} />
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<FastSkeleton />}>
        <FastData />
      </Suspense>
      <Suspense fallback={<SlowSkeleton />}>
        <SlowData />
      </Suspense>
    </div>
  )
}
// Fast renders at 50ms, Slow streams in at 500ms
```

### API Route Parallel Fetching
```tsx
// app/api/dashboard/route.ts
export async function GET() {
  const [user, stats, activity, notifications] = await Promise.all([
    db.user.findFirst(),
    db.stats.findFirst(),
    db.activity.findMany({ take: 10 }),
    db.notification.findMany({ take: 5 }),
  ])

  return Response.json({
    user,
    stats,
    activity,
    notifications,
  })
}
```

## Visualization

```
Sequential:
layout: |--getUser--|
page:               |--getPosts--|
                                  |--render--|
Total: ════════════════════════════════════════

Parallel:
layout: |--getUser--|
        |--getPosts--|  (preloaded)
page:   |----render----|
Total: ═══════════════
```

## Key Points

1. Use preload pattern to start fetches early
2. `Promise.all()` for multiple fetches in one component
3. Suspense boundaries allow partial rendering
4. `React.cache()` enables safe preloading
5. Parallel routes for independent page sections
