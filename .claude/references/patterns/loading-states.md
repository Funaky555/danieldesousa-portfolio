# Loading States Patterns

## Overview

Proper loading states improve perceived performance and user experience. This guide covers patterns for implementing loading states with shadcn/ui and Tailwind.

## Skeleton Components

### Basic Skeletons

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Text skeleton
<Skeleton className="h-4 w-[250px]" />

// Multiple lines
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-[80%]" />
  <Skeleton className="h-4 w-[60%]" />
</div>

// Avatar
<Skeleton className="h-12 w-12 rounded-full" />

// Image placeholder
<Skeleton className="h-48 w-full rounded-lg" />

// Button
<Skeleton className="h-10 w-24 rounded-md" />
```

### Card Skeleton

```tsx
function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  )
}
```

### Table Skeleton

```tsx
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      {/* Header */}
      <div className="border-b bg-muted/50 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 border-b p-4 last:border-0">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      ))}
    </div>
  )
}
```

### Dashboard Skeleton

```tsx
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-8 w-[120px]" />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <Skeleton className="h-4 w-[150px] mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="rounded-lg border bg-card p-6">
          <Skeleton className="h-4 w-[150px] mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>

      {/* Table */}
      <TableSkeleton rows={5} />
    </div>
  )
}
```

### List Skeleton

```tsx
function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-3 w-[40%]" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}
```

## Shimmer Effect

```tsx
// Custom shimmer skeleton
function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        'relative overflow-hidden',
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        'before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
    />
  )
}

// Add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
}
```

## Spinner Components

### Basic Spinner

```tsx
import { Loader2 } from 'lucide-react'

function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />
}

// Usage
<Spinner />
<Spinner className="h-6 w-6" />
```

### Spinner Button

```tsx
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean
}

function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

// Usage
<LoadingButton loading={isSubmitting}>
  Submit
</LoadingButton>
```

### Full Page Spinner

```tsx
function PageSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
```

## Suspense Loading

### Loading File (App Router)

```tsx
// app/dashboard/loading.tsx
import { DashboardSkeleton } from '@/components/skeletons'

export default function Loading() {
  return <DashboardSkeleton />
}
```

### Suspense Boundaries

```tsx
import { Suspense } from 'react'

function Page() {
  return (
    <div className="space-y-6">
      {/* Fast content loads immediately */}
      <h1>Dashboard</h1>

      {/* Slow content shows skeleton while loading */}
      <Suspense fallback={<CardSkeleton />}>
        <SlowDataComponent />
      </Suspense>

      {/* Multiple suspense boundaries */}
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <UsersChart />
        </Suspense>
      </div>
    </div>
  )
}
```

## Progressive Loading

### Image Loading

```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      />
    </div>
  )
}
```

### Content Loading with Transition

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

function DataDisplay({ data, isLoading }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DataCard data={data} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

## Optimistic UI

```tsx
'use client'

import { useOptimistic, useTransition } from 'react'

function TodoList({ todos, addTodo }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  )

  async function handleAdd(formData: FormData) {
    const title = formData.get('title') as string

    // Immediately show optimistic UI
    addOptimisticTodo({ id: Date.now(), title, completed: false })

    // Then perform actual action
    startTransition(async () => {
      await addTodo(formData)
    })
  }

  return (
    <div>
      <form action={handleAdd}>
        <input name="title" placeholder="New todo" />
        <button type="submit" disabled={isPending}>
          Add
        </button>
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={cn(todo.pending && 'opacity-50')}
          >
            {todo.title}
            {todo.pending && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Inline Loading States

### Input Loading

```tsx
import { Input } from '@/components/ui/input'
import { Loader2, Check, X } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

function ValidatingInput({ status }: { status: Status }) {
  return (
    <div className="relative">
      <Input className="pr-10" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {status === 'loading' && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
        {status === 'success' && (
          <Check className="h-4 w-4 text-green-500" />
        )}
        {status === 'error' && (
          <X className="h-4 w-4 text-destructive" />
        )}
      </div>
    </div>
  )
}
```

### Select Loading

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

function LoadingSelect({ options, isLoading }) {
  return (
    <Select disabled={isLoading}>
      <SelectTrigger>
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <SelectValue placeholder="Select option" />
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

## Checklist

When implementing loading states:

- [ ] Skeleton matches content layout
- [ ] Loading state is visible quickly (not delayed)
- [ ] Animation is subtle (not distracting)
- [ ] Spinners have aria-label for accessibility
- [ ] Buttons show loading state and are disabled
- [ ] Forms prevent double submission
- [ ] Error states are handled after loading
- [ ] Content doesn't jump when loading completes
