# Streaming & Suspense Patterns

## Overview

Next.js 15 leverages React Suspense for progressive UI rendering. Stream content to users as it becomes available.

## Basic Streaming with loading.tsx

```
app/
├── dashboard/
│   ├── page.tsx
│   └── loading.tsx    # Shows while page loads
```

```typescript
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
```

## Suspense Boundaries

### Wrap Async Components
```typescript
// app/dashboard/page.tsx
import { Suspense } from "react";
import { UserStats } from "./user-stats";
import { RecentActivity } from "./recent-activity";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each section loads independently */}
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats />
      </Suspense>

      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

// Server Component that fetches data
async function UserStats() {
  const stats = await fetchStats(); // Slow query
  return <StatsCard data={stats} />;
}
```

### Nested Suspense
```typescript
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </Suspense>
    </Suspense>
  );
}
```

## Parallel Data Fetching

### Without Suspense (Waterfall)
```typescript
// BAD: Sequential fetching
async function Page() {
  const user = await fetchUser();     // Wait...
  const posts = await fetchPosts();   // Then wait...
  const comments = await fetchComments(); // Then wait...

  return <Content user={user} posts={posts} comments={comments} />;
}
```

### With Parallel Fetching
```typescript
// GOOD: Parallel fetching
async function Page() {
  // Start all fetches simultaneously
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);

  return <Content user={user} posts={posts} comments={comments} />;
}
```

### With Streaming (Best UX)
```typescript
// BEST: Show content as it arrives
export default function Page() {
  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserSection />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsSection />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsSection />
      </Suspense>
    </div>
  );
}
```

## Streaming with use()

```typescript
import { use } from "react";

// Pass promise to component
async function Page() {
  const userPromise = fetchUser();

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Resolve in component with use()
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

## Error Boundaries

### error.tsx for Route Segments
```typescript
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 border border-destructive rounded">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### ErrorBoundary Component
```typescript
"use client";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

export function SafeComponent({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Skeleton Components

### Basic Skeletons
```typescript
// components/skeletons.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export function ListSkeleton({ items = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Place Suspense at meaningful boundaries**
   - Group related content
   - Avoid too many small boundaries

2. **Show meaningful loading states**
   - Skeletons that match content layout
   - Avoid generic spinners when possible

3. **Use parallel fetching**
   - Start all independent fetches together
   - Use Suspense to stream results

4. **Handle errors gracefully**
   - Error boundaries at appropriate levels
   - Provide retry mechanisms

5. **Avoid layout shift**
   - Skeletons should match final size
   - Reserve space for async content

## Performance Monitoring

```typescript
// Measure streaming performance
async function measureFetch(name: string, fetcher: () => Promise<any>) {
  console.time(name);
  const result = await fetcher();
  console.timeEnd(name);
  return result;
}
```
