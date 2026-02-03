---
name: api-builder
description: "Build Next.js API routes, Server Actions, and data fetching patterns."
activation_mode: automatic
triggering_conditions:
  - "/build mentions 'API', 'endpoint', 'server action', 'fetch'"
  - "Task requires backend integration or data handling"
tools: Read, Write, Edit, Glob, Grep
---

# API Builder Agent

## Purpose
Build Next.js API routes, Server Actions, and data fetching patterns.

## Route Handlers (app/api/)

### Basic GET Route
```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await db.user.findMany()
  return NextResponse.json(users)
}
```

### GET with Search Params
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const users = await db.user.findMany({
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
  })

  return NextResponse.json(users)
}
```

### POST Route
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createUserSchema.parse(body)

    const user = await db.user.create({
      data: validated,
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

### Dynamic Routes
```tsx
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const user = await db.user.update({
    where: { id: params.id },
    data: body,
  })

  return NextResponse.json(user)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.user.delete({
    where: { id: params.id },
  })

  return new NextResponse(null, { status: 204 })
}
```

## Server Actions

### Basic Server Action
```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export async function createPost(formData: FormData) {
  const validated = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!validated.success) {
    return { error: validated.error.flatten() }
  }

  await db.post.create({
    data: validated.data,
  })

  revalidatePath('/posts')
  return { success: true }
}
```

### Server Action with Auth
```tsx
// app/actions.ts
'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name: formData.get('name') as string,
    },
  })

  revalidatePath('/profile')
}
```

### Using Server Actions in Components
```tsx
// Client Component with form
'use client'

import { createPost } from './actions'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </Button>
  )
}

export function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, null)

  return (
    <form action={formAction}>
      <Input name="title" placeholder="Title" />
      {state?.error?.fieldErrors?.title && (
        <p className="text-destructive text-sm">
          {state.error.fieldErrors.title}
        </p>
      )}

      <Textarea name="content" placeholder="Content" />

      <SubmitButton />
    </form>
  )
}
```

## Data Fetching

### Server Component Fetch
```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Parallel Data Fetching
```tsx
// app/dashboard/page.tsx
async function getUser() {
  const res = await fetch('/api/user')
  return res.json()
}

async function getStats() {
  const res = await fetch('/api/stats')
  return res.json()
}

async function getNotifications() {
  const res = await fetch('/api/notifications')
  return res.json()
}

export default async function DashboardPage() {
  // Fetch in parallel - CRITICAL for performance
  const [user, stats, notifications] = await Promise.all([
    getUser(),
    getStats(),
    getNotifications(),
  ])

  return (
    <Dashboard
      user={user}
      stats={stats}
      notifications={notifications}
    />
  )
}
```

### Streaming with Suspense
```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'

async function SlowComponent() {
  const data = await fetchSlowData()
  return <div>{data}</div>
}

export default function DashboardPage() {
  return (
    <div>
      <FastHeader />

      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

## Error Handling

### Error Boundary
```tsx
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### API Error Responses
```tsx
// Consistent error format
return NextResponse.json(
  {
    error: {
      message: 'User not found',
      code: 'USER_NOT_FOUND',
    },
  },
  { status: 404 }
)
```

## Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
```

## Checklist

Before completing API work:
- [ ] Input validation with zod
- [ ] Proper error handling and status codes
- [ ] Auth checks where required
- [ ] Parallel fetching where possible
- [ ] Proper cache/revalidation strategy
- [ ] Type-safe request/response
