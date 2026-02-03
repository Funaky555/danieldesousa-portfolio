# Error Recovery Patterns

## Overview

This guide provides strategies for handling errors during development, ensuring robust recovery from common failure scenarios.

## Build Failures

### TypeScript Errors

```bash
# Run typecheck to identify all errors
npm run typecheck
```

**Common Issues & Fixes:**

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module '@/...'` | Path alias not configured | Check tsconfig.json paths |
| `Type 'X' is not assignable to 'Y'` | Type mismatch | Fix type or add proper typing |
| `Property 'X' does not exist` | Missing property | Add property or check spelling |
| `'X' is declared but never used` | Unused import/variable | Remove or use the declaration |
| `Parameter 'X' implicitly has 'any' type` | Missing type annotation | Add explicit type |

**Recovery Steps:**
```typescript
// 1. Check tsconfig.json has proper paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// 2. For missing types, create type declaration
// types/missing-module.d.ts
declare module 'some-untyped-package' {
  export function someFunction(): void
}

// 3. For complex type errors, use type assertion as last resort
const data = response as ExpectedType
```

### ESLint Errors

```bash
# Auto-fix what can be fixed
npm run lint -- --fix
```

**Common Issues:**

| Error | Solution |
|-------|----------|
| `'X' is defined but never used` | Remove unused import or prefix with `_` |
| `Unexpected console statement` | Remove console.log or add eslint-disable |
| `Missing return type` | Add explicit return type |
| `React Hook useEffect has missing dependencies` | Add dependencies or disable with comment |

**Recovery Steps:**
```typescript
// For legitimate console usage (dev only)
// eslint-disable-next-line no-console
console.log('Debug:', data)

// For hooks with intentionally missing deps
useEffect(() => {
  // Effect that should only run once
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

### Build Errors

```bash
# Attempt build
npm run build
```

**Common Issues:**

| Error | Cause | Solution |
|-------|-------|----------|
| `Module not found` | Missing dependency | `npm install <package>` |
| `Image optimization failed` | Invalid image | Check image path and format |
| `Export X doesn't exist` | Wrong export name | Check export names |
| `Page data for X is 256 kB` | Page too large | Split code, use dynamic imports |

**Recovery Steps:**
```bash
# 1. Clear cache and rebuild
rm -rf .next
npm run build

# 2. If module not found, reinstall
rm -rf node_modules package-lock.json
npm install

# 3. For large page data, use dynamic imports
```

## Runtime Errors

### Client-Side Errors

**Error Boundary Implementation:**
```tsx
// components/error-boundary.tsx
'use client'

import { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Next.js Error Pages:**
```tsx
// app/error.tsx
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
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
```

```tsx
// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
```

### Server-Side Errors

**API Route Error Handling:**
```typescript
// app/api/example/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

**Server Action Error Handling:**
```typescript
// lib/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createItem(formData: FormData) {
  try {
    const data = Object.fromEntries(formData)

    // Validate
    if (!data.name) {
      return { error: 'Name is required' }
    }

    // Create
    await db.item.create({ data })

    revalidatePath('/items')
    return { success: true }
  } catch (error) {
    console.error('Action Error:', error)
    return { error: 'Failed to create item' }
  }
}
```

## Data Fetching Errors

### React Query Error Handling
```tsx
import { useQuery } from '@tanstack/react-query'

function Component() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  if (isLoading) return <Skeleton />

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-destructive mb-4">Failed to load data</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  return <DataDisplay data={data} />
}
```

### SWR Error Handling
```tsx
import useSWR from 'swr'

function Component() {
  const { data, error, isLoading, mutate } = useSWR('/api/data', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 3) return
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })

  if (error) return <ErrorDisplay onRetry={() => mutate()} />
  if (isLoading) return <Skeleton />
  return <DataDisplay data={data} />
}
```

## Form Errors

### Validation Errors
```tsx
// Using react-hook-form + zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (error) {
      // Set server-side error
      form.setError('root', {
        message: error.message || 'Login failed',
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {form.formState.errors.root && (
        <div className="text-destructive text-sm mb-4">
          {form.formState.errors.root.message}
        </div>
      )}
      {/* Form fields */}
    </form>
  )
}
```

## Network Errors

### Fetch with Retry
```typescript
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
    }
  }
  throw new Error('Max retries exceeded')
}
```

### Offline Detection
```tsx
'use client'

import { useEffect, useState } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// Usage
function App() {
  const isOnline = useOnlineStatus()

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-4 bg-destructive text-white px-4 py-2 rounded">
        You're offline. Some features may be unavailable.
      </div>
    )
  }

  return <MainApp />
}
```

## Recovery Checklist

When encountering errors:

1. **Read the error message carefully**
2. **Check the stack trace for location**
3. **Clear caches if behavior is unexpected:**
   ```bash
   rm -rf .next node_modules/.cache
   ```
4. **Reinstall dependencies if package issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
5. **Check for environment variable issues**
6. **Verify API endpoints are accessible**
7. **Test in incognito to rule out browser extensions**
8. **Check console for additional context**
