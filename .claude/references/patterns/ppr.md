# Partial Prerendering (PPR) Patterns

## Overview

Partial Prerendering (PPR) combines static and dynamic rendering in a single page. The static shell loads instantly while dynamic content streams in.

## Enabling PPR

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
};

module.exports = nextConfig;
```

## How PPR Works

```
User Request
     ↓
[Static Shell] ← Served instantly from edge cache
     ↓
[Dynamic Holes] ← Streamed from server
     ↓
[Complete Page]
```

## Basic PPR Pattern

```typescript
// app/dashboard/page.tsx
import { Suspense } from "react";
import { Header } from "./header";        // Static
import { Sidebar } from "./sidebar";      // Static
import { UserInfo } from "./user-info";   // Dynamic
import { Feed } from "./feed";            // Dynamic

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      {/* Static shell - prerendered */}
      <Sidebar />

      <main>
        <Header />

        {/* Dynamic holes - streamed */}
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo />
        </Suspense>

        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </main>
    </div>
  );
}
```

## Static vs Dynamic Components

### Static Components (Prerendered)
- No cookies, headers, searchParams access
- No data fetching with `cache: 'no-store'`
- Renders at build time

```typescript
// Static - safe for PPR shell
function Header() {
  return (
    <header className="border-b p-4">
      <h1>Dashboard</h1>
      <nav>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}
```

### Dynamic Components (Streamed)
- Access cookies, headers, searchParams
- Fetch with `cache: 'no-store'`
- Renders at request time

```typescript
// Dynamic - becomes a "hole" in PPR
import { cookies } from "next/headers";

async function UserInfo() {
  const session = cookies().get("session");
  const user = await fetchUser(session);

  return (
    <div>
      <p>Welcome, {user.name}</p>
    </div>
  );
}
```

## Suspense Boundary Placement

### Wrap Only Dynamic Parts
```typescript
// GOOD: Minimal dynamic boundaries
export default function Page() {
  return (
    <div>
      <StaticHeader />
      <StaticNav />

      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>

      <StaticFooter />
    </div>
  );
}
```

### Avoid Wrapping Static Content
```typescript
// BAD: Unnecessary Suspense around static
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <StaticHeader /> {/* This is static! */}
      <DynamicContent />
    </Suspense>
  );
}
```

## Common PPR Patterns

### Dashboard Pattern
```typescript
export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Static shell */}
      <Header />
      <Sidebar />

      {/* Dynamic content grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <Suspense fallback={<CardSkeleton />}>
          <StatsCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <RevenueCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <UsersCard />
        </Suspense>
      </div>

      {/* Dynamic table */}
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}
```

### E-commerce Product Page
```typescript
export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Static layout */}
      <Breadcrumb />

      <div className="grid grid-cols-2">
        {/* Semi-static: product changes rarely */}
        <Suspense fallback={<ImageSkeleton />}>
          <ProductImages id={params.id} />
        </Suspense>

        <div>
          <Suspense fallback={<TitleSkeleton />}>
            <ProductInfo id={params.id} />
          </Suspense>

          {/* Dynamic: changes per user/time */}
          <Suspense fallback={<PriceSkeleton />}>
            <DynamicPricing id={params.id} />
          </Suspense>

          <Suspense fallback={<StockSkeleton />}>
            <StockInfo id={params.id} />
          </Suspense>
        </div>
      </div>

      {/* Static footer */}
      <RelatedProducts category={category} />
    </div>
  );
}
```

### Blog Post Pattern
```typescript
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      {/* Static header */}
      <SiteHeader />

      {/* Static content - ISR with revalidation */}
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent slug={params.slug} />
      </Suspense>

      {/* Dynamic: user-specific */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments slug={params.slug} />
      </Suspense>

      {/* Dynamic: personalized */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations />
      </Suspense>

      {/* Static footer */}
      <SiteFooter />
    </article>
  );
}
```

## Debugging PPR

### Check What's Static vs Dynamic

```typescript
// Add to page during development
export const dynamic = 'force-dynamic'; // Forces all dynamic
export const dynamic = 'force-static';  // Forces all static (will error if impossible)
```

### PPR Indicators
In development, Next.js shows which parts are static vs dynamic in the build output:

```
Route (app)                    Size     First Load JS
├ ○ /                         5.2 kB        89 kB
├ ◐ /dashboard                12 kB         96 kB  <- PPR enabled
│   └ /dashboard/[id]
├ ● /blog/[slug]              8.1 kB        92 kB
└ λ /api/users                0 B           0 B

○ Static
◐ Partial Prerendering
● SSG
λ Server
```

## Caveats

1. **Experimental feature** - API may change
2. **Requires Suspense** - Dynamic content must be wrapped
3. **Edge runtime recommended** - For best performance
4. **Cache invalidation** - Static shell caches at edge

## Best Practices

1. **Maximize static shell** - Keep as much static as possible
2. **Strategic Suspense placement** - Group related dynamic content
3. **Meaningful fallbacks** - Skeletons that match final layout
4. **Avoid layout shift** - Reserve space for dynamic content
5. **Test without PPR** - Ensure app works with `ppr: false`
