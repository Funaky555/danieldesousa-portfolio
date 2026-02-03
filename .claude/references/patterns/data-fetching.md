# Data Fetching Patterns

## Server Component Fetching (Default)

### Basic Fetch
```tsx
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users')
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### With Caching
```tsx
// Cache and revalidate every 60 seconds
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  })
  return res.json()
}

// Cache indefinitely (default)
async function getStaticData() {
  const res = await fetch('https://api.example.com/static', {
    cache: 'force-cache'
  })
  return res.json()
}

// No cache - always fresh
async function getDynamicData() {
  const res = await fetch('https://api.example.com/dynamic', {
    cache: 'no-store'
  })
  return res.json()
}
```

### React.cache() for Deduplication
```tsx
// lib/data.ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  const res = await fetch(`https://api.example.com/users/${id}`)
  return res.json()
})

// Call getUser(id) anywhere - only fetches once per request
```

### Parallel Fetching
```tsx
export default async function DashboardPage() {
  // Start all fetches simultaneously
  const [user, posts, stats] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
  ])

  return (
    <Dashboard user={user} posts={posts} stats={stats} />
  )
}
```

## Streaming with Suspense

### Basic Streaming
```tsx
import { Suspense } from 'react'

async function SlowComponent() {
  const data = await getSlowData()
  return <div>{data}</div>
}

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

### Multiple Suspense Boundaries
```tsx
export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Suspense fallback={<CardSkeleton />}>
        <StatsCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <RevenueCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ActivityCard />
      </Suspense>
    </div>
  )
}
```

## Client-Side Fetching

### SWR
```tsx
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function UserProfile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (isLoading) return <Skeleton />
  if (error) return <Error />

  return <Profile user={data} />
}
```

### SWR with Mutation
```tsx
'use client'

import useSWR, { useSWRConfig } from 'swr'

export function UpdateProfile() {
  const { data: user } = useSWR('/api/user')
  const { mutate } = useSWRConfig()

  const handleUpdate = async (newData) => {
    // Optimistic update
    mutate('/api/user', { ...user, ...newData }, false)

    // Send update
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

## Server Actions

### Basic Action
```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({ data: { title, content } })

  revalidatePath('/posts')
}
```

### In Form
```tsx
// app/posts/new/page.tsx
import { createPost } from '@/app/actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

### With useFormState
```tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createPost } from '@/app/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Creating...' : 'Create'}</button>
}

export function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, null)

  return (
    <form action={formAction}>
      <input name="title" />
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
```

## Database Queries (Prisma Example)

### In Server Components
```tsx
import { db } from '@/lib/db'

export default async function UsersPage() {
  const users = await db.user.findMany({
    include: { posts: true },
    orderBy: { createdAt: 'desc' },
  })

  return <UserList users={users} />
}
```

### In Server Actions
```tsx
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } })
  revalidatePath('/users')
}
```

## Error Handling

### In Server Components
```tsx
export default async function Page() {
  try {
    const data = await fetchData()
    return <Content data={data} />
  } catch (error) {
    return <ErrorMessage />
  }
}
```

### Error Boundary
```tsx
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Failed to load posts</h2>
      <button onClick={reset}>Retry</button>
    </div>
  )
}
```

## Loading States

### loading.tsx
```tsx
// app/posts/loading.tsx
export default function Loading() {
  return <PostsSkeleton />
}
```

### Skeleton Components
```tsx
export function PostsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  )
}
```
