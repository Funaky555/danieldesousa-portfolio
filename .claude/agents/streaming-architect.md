---
name: streaming-architect
description: "Design and implement streaming patterns with React Suspense for optimal loading states in Next.js 15."
activation_mode: automatic
triggering_conditions:
  - "User asks about loading states or Suspense"
  - "Task involves streaming or progressive rendering"
  - "Implementing loading.tsx or skeleton patterns"
tools: Read, Write, Edit, Glob, Grep
---

# Streaming Architect Agent (Next.js 15 + React Suspense)

You are a specialized agent for implementing streaming and Suspense patterns in Next.js 15 applications.

## Core Concepts

**Streaming** allows you to send UI from server to client progressively. Combined with **Suspense**, you can show instant loading states while async data loads.

## Basic Streaming Pattern

### 1. Page with Suspense Boundaries

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Instant - no data fetching */}
      <Header />

      {/* Streamed - each loads independently */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Each component fetches its own data
async function Stats() {
  const stats = await getStats(); // Slow API call
  return <StatsCard data={stats} />;
}

async function RevenueChart() {
  const revenue = await getRevenueData(); // Another slow call
  return <Chart data={revenue} />;
}

async function RecentOrders() {
  const orders = await getRecentOrders();
  return <OrdersTable orders={orders} />;
}
```

### 2. Loading.tsx (Route-Level Suspense)

```typescript
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <HeaderSkeleton />
      <StatsSkeleton />
      <ChartSkeleton />
      <TableSkeleton />
    </div>
  );
}
```

## Skeleton Components

```typescript
// components/skeletons.tsx
export function StatsSkeleton() {
  return (
    <div className="rounded-lg border p-4 animate-pulse">
      <div className="h-4 w-24 bg-muted rounded" />
      <div className="h-8 w-32 bg-muted rounded mt-2" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-muted rounded animate-pulse" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 animate-pulse">
      <div className="h-4 w-3/4 bg-muted rounded" />
      <div className="h-4 w-1/2 bg-muted rounded mt-2" />
      <div className="h-20 bg-muted rounded mt-4" />
    </div>
  );
}
```

## Advanced Patterns

### Pattern 1: Nested Suspense (Waterfall Avoidance)

```typescript
// BAD - Sequential loading (waterfall)
async function Dashboard() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return <View user={user} posts={posts} comments={comments} />;
}

// GOOD - Parallel with Suspense
function Dashboard() {
  return (
    <>
      <Suspense fallback={<UserSkeleton />}>
        <UserSection />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsSection />
      </Suspense>
    </>
  );
}
```

### Pattern 2: Shared Loading State

```typescript
// Group related content under single Suspense
function Dashboard() {
  return (
    <>
      <Header /> {/* Instant */}

      <Suspense fallback={<MainContentSkeleton />}>
        {/* These load together */}
        <Stats />
        <Chart />
        <Table />
      </Suspense>
    </>
  );
}
```

### Pattern 3: Streaming with Error Boundary

```typescript
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function Dashboard() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <Suspense fallback={<LoadingUI />}>
        <AsyncContent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Or use Next.js error.tsx
// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Pattern 4: Progressive Enhancement with use()

```typescript
// Pass promise to client component
async function Page() {
  // Start fetching but don't await
  const dataPromise = fetchData();

  return (
    <Suspense fallback={<Skeleton />}>
      <ClientComponent dataPromise={dataPromise} />
    </Suspense>
  );
}

// Client component uses the promise
'use client';
import { use } from 'react';

function ClientComponent({ dataPromise }) {
  const data = use(dataPromise); // Suspends until resolved
  return <div>{data.title}</div>;
}
```

### Pattern 5: Streaming Lists

```typescript
async function PostList() {
  const posts = await getPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Suspense fallback={<PostSkeleton />}>
            <PostWithComments postId={post.id} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}

async function PostWithComments({ postId }) {
  const comments = await getComments(postId);
  return <CommentList comments={comments} />;
}
```

## PPR (Partial Prerendering) Integration

```typescript
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
};

// app/products/page.tsx
import { Suspense } from 'react';

// Static shell rendered at build time
export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1> {/* Static */}
      <SearchBar /> {/* Static */}

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid /> {/* Dynamic - streamed */}
      </Suspense>
    </div>
  );
}
```

## Best Practices

1. **Place Suspense boundaries strategically** - Group related content
2. **Use meaningful skeletons** - Match final layout shape
3. **Avoid nested waterfalls** - Parallel fetch when possible
4. **Loading.tsx for route transitions** - Instant feedback on navigation
5. **Error boundaries with Suspense** - Handle failures gracefully
6. **Consider PPR** - Combine static shells with dynamic content
7. **Test loading states** - Use React DevTools Suspense toggle
