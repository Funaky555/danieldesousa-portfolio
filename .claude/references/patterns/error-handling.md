# Error Handling Patterns

## Server Components

### Try/Catch Pattern
```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export default async function PostsPage() {
  try {
    const posts = await getPosts()
    return <PostList posts={posts} />
  } catch (error) {
    return <ErrorMessage message="Could not load posts" />
  }
}
```

### Error Boundary (error.tsx)
```tsx
// app/posts/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        We couldn't load this page. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### Global Error (global-error.tsx)
```tsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2>Something went wrong!</h2>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  )
}
```

## API Routes

### Structured Error Response
```tsx
// lib/api-error.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
  }
}

// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ApiError } from '@/lib/api-error'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = userSchema.parse(body)

    const user = await db.user.create({ data: validated })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
```

## Server Actions

### With Error Return
```tsx
// actions.ts
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function subscribe(formData: FormData) {
  try {
    const validated = schema.parse({
      email: formData.get('email'),
    })

    await db.subscriber.create({ data: validated })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      error: 'Failed to subscribe. Please try again.',
    }
  }
}
```

### In Form
```tsx
'use client'

import { useFormState } from 'react-dom'
import { subscribe } from './actions'

export function SubscribeForm() {
  const [state, formAction] = useFormState(subscribe, null)

  return (
    <form action={formAction}>
      <Input name="email" type="email" />

      {state?.errors?.email && (
        <p className="text-destructive text-sm">{state.errors.email}</p>
      )}

      {state?.error && (
        <p className="text-destructive text-sm">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-green-600 text-sm">Successfully subscribed!</p>
      )}

      <Button type="submit">Subscribe</Button>
    </form>
  )
}
```

## Client-Side Error Handling

### Error Boundary Component
```tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />
    }

    return this.props.children
  }
}
```

### SWR Error Handling
```tsx
'use client'

import useSWR from 'swr'

export function DataComponent() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  if (isLoading) return <Skeleton />

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-destructive">Failed to load data</p>
        <Button onClick={() => mutate('/api/data')}>Retry</Button>
      </div>
    )
  }

  return <Content data={data} />
}
```

## Toast Notifications

```tsx
// Using sonner
import { toast } from 'sonner'

// Success
toast.success('Changes saved!')

// Error
toast.error('Failed to save changes')

// With action
toast.error('Failed to save', {
  action: {
    label: 'Retry',
    onClick: () => handleRetry(),
  },
})

// Promise-based
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save',
})
```

## Not Found

```tsx
// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return <Post post={post} />
}

// app/posts/[id]/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold">Post Not Found</h2>
      <p className="text-muted-foreground mt-2">
        The post you're looking for doesn't exist.
      </p>
      <Link href="/posts" className="mt-4 inline-block">
        <Button>Back to Posts</Button>
      </Link>
    </div>
  )
}
```
