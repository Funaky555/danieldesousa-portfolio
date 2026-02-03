# Suspense Boundaries for Streaming

**Impact:** CRITICAL
**Category:** Async Operations

## Problem

Entire page waits for all data before rendering anything.

## Solution

Use Suspense boundaries to stream content progressively.

## Examples

### Bad - Full Page Blocking
```tsx
async function Page() {
  const slowData = await fetchSlowData()  // 3 seconds
  const fastData = await fetchFastData()  // 100ms

  return (
    <div>
      <Header />
      <FastSection data={fastData} />
      <SlowSection data={slowData} />
    </div>
  )
}
// User sees nothing for 3+ seconds
```

### Good - Streaming with Suspense
```tsx
import { Suspense } from 'react'

async function SlowSection() {
  const data = await fetchSlowData()  // 3 seconds
  return <div>{data}</div>
}

async function FastSection() {
  const data = await fetchFastData()  // 100ms
  return <div>{data}</div>
}

function Page() {
  return (
    <div>
      <Header />  {/* Immediate */}

      <Suspense fallback={<FastSkeleton />}>
        <FastSection />  {/* ~100ms */}
      </Suspense>

      <Suspense fallback={<SlowSkeleton />}>
        <SlowSection />  {/* Streams in after 3s */}
      </Suspense>
    </div>
  )
}
// User sees Header immediately, Fast after 100ms, Slow after 3s
```

### Good - Nested Suspense for Granular Loading
```tsx
function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Suspense fallback={<CardSkeleton />}>
        <StatsCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ChartCard />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ActivityCard />
      </Suspense>
    </div>
  )
}
// Each card loads independently
```

### Good - Shared Suspense for Related Content
```tsx
function Dashboard() {
  return (
    <div>
      {/* These load together */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardHeader />
        <DashboardStats />
        <DashboardChart />
      </Suspense>

      {/* This loads independently */}
      <Suspense fallback={<ActivitySkeleton />}>
        <ActivityFeed />
      </Suspense>
    </div>
  )
}
```

### Loading UI Patterns

```tsx
// Skeleton component
function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-4 bg-muted rounded w-1/2" />
    </div>
  )
}

// Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
```

### With Error Boundaries
```tsx
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function Page() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  )
}
```

## Suspense Placement Strategy

1. **Wrap slow components** - Identify what takes longest
2. **Group related content** - Things that should appear together
3. **Separate independent sections** - Each can load on its own
4. **Keep fallbacks meaningful** - Skeletons > spinners

## Key Points

1. Suspense enables streaming SSR in Next.js
2. Content streams to client as it becomes ready
3. Place boundaries around slow async components
4. Fallbacks should match the shape of the content
5. Nest boundaries for granular loading states
