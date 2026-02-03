# SWR Request Deduplication

**Impact:** MEDIUM-HIGH
**Category:** Client-Side Performance

## Problem

Multiple components fetching the same data causes duplicate requests.

## Solution

Use SWR for automatic request deduplication and caching.

## Examples

### Bad - Duplicate Fetches
```tsx
'use client'

function ComponentA() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser)
  }, [])

  return <div>{user?.name}</div>
}

function ComponentB() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser)  // Duplicate!
  }, [])

  return <div>{user?.email}</div>
}
// 2 requests to /api/user
```

### Good - SWR Deduplication
```tsx
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

function ComponentA() {
  const { data: user } = useSWR('/api/user', fetcher)
  return <div>{user?.name}</div>
}

function ComponentB() {
  const { data: user } = useSWR('/api/user', fetcher)  // Same key = shared!
  return <div>{user?.email}</div>
}
// Only 1 request to /api/user
```

### SWR Configuration
```tsx
// lib/swr-config.tsx
'use client'

import { SWRConfig } from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        dedupingInterval: 2000,  // Dedupe requests within 2s
      }}
    >
      {children}
    </SWRConfig>
  )
}

// app/layout.tsx
import { SWRProvider } from '@/lib/swr-config'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  )
}
```

### With Loading and Error States
```tsx
'use client'

import useSWR from 'swr'

function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user')

  if (isLoading) return <Skeleton />
  if (error) return <Error message={error.message} />

  return <Profile user={data} />
}
```

### Mutation and Revalidation
```tsx
'use client'

import useSWR, { useSWRConfig } from 'swr'

function UpdateProfile() {
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR('/api/user')

  const handleUpdate = async (newData) => {
    // Optimistic update
    mutate('/api/user', { ...user, ...newData }, false)

    // Actual update
    await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify(newData),
    })

    // Revalidate
    mutate('/api/user')
  }

  return <Form onSubmit={handleUpdate} />
}
```

### Conditional Fetching
```tsx
'use client'

function UserPosts({ userId }) {
  // Only fetch when userId exists
  const { data } = useSWR(userId ? `/api/users/${userId}/posts` : null)

  return <PostList posts={data} />
}
```

### Parallel Requests
```tsx
'use client'

function Dashboard() {
  const { data: user } = useSWR('/api/user')
  const { data: stats } = useSWR('/api/stats')
  const { data: notifications } = useSWR('/api/notifications')

  // All fetched in parallel, each deduplicated independently

  return (
    <div>
      <UserInfo user={user} />
      <StatsCard stats={stats} />
      <NotificationList items={notifications} />
    </div>
  )
}
```

### With Suspense
```tsx
'use client'

import useSWR from 'swr'
import { Suspense } from 'react'

function UserData() {
  const { data } = useSWR('/api/user', fetcher, { suspense: true })
  return <div>{data.name}</div>
}

function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <UserData />
    </Suspense>
  )
}
```

## SWR vs Server Components

| Use Case | Recommendation |
|----------|----------------|
| Initial page load | Server Components |
| Real-time updates | SWR |
| User interactions | SWR |
| Client-side navigation | SWR with fallback |
| Mutations | SWR |

## Key Points

1. Same SWR key = automatically deduplicated
2. Configure dedupingInterval for your needs
3. Use optimistic updates for better UX
4. Conditional fetching with null key
5. Works well with Suspense
