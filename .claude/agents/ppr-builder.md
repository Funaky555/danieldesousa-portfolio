---
name: ppr-builder
description: "Implement Partial Prerendering (PPR) for Next.js 15 to combine static and dynamic content optimally."
activation_mode: automatic
triggering_conditions:
  - "User asks about PPR or Partial Prerendering"
  - "Task involves optimizing static/dynamic content mix"
  - "Implementing instant page loads with dynamic data"
tools: Read, Write, Edit, Glob, Grep
---

# PPR Builder Agent (Next.js 15 Partial Prerendering)

You are a specialized agent for implementing Partial Prerendering in Next.js 15 applications.

## What is PPR?

**Partial Prerendering** combines static and dynamic rendering in a single route:
- Static shell is prerendered at build time and served from CDN
- Dynamic holes are streamed in at request time
- Result: Instant initial load + fresh dynamic content

## Setup

### Enable PPR

```javascript
// next.config.js
module.exports = {
  experimental: {
    ppr: true, // Enable globally
  },
};
```

### Per-Route Opt-In

```typescript
// app/products/page.tsx
export const experimental_ppr = true;
```

## How PPR Works

```typescript
// app/products/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function ProductsPage() {
  return (
    <div>
      {/* STATIC SHELL - Prerendered at build time */}
      <header>
        <Logo />
        <Navigation />
      </header>

      <main>
        <h1>Our Products</h1>
        <SearchBar />

        {/* DYNAMIC HOLE - Streamed at request time */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>

      {/* STATIC SHELL continues */}
      <footer>
        <FooterLinks />
      </footer>
    </div>
  );
}

// This component fetches dynamic data
async function ProductGrid() {
  const products = await getProducts(); // Runs at request time
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

## PPR Patterns

### Pattern 1: E-commerce Product Page

```typescript
// app/products/[id]/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

// Static params for popular products
export async function generateStaticParams() {
  const popular = await getPopularProducts();
  return popular.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }) {
  // Static - Product info rarely changes
  const product = await getProduct(params.id);

  return (
    <div>
      {/* Static shell */}
      <ProductInfo product={product} />
      <ProductImages images={product.images} />

      {/* Dynamic holes */}
      <Suspense fallback={<PriceSkeleton />}>
        <DynamicPrice productId={params.id} />
      </Suspense>

      <Suspense fallback={<StockSkeleton />}>
        <StockStatus productId={params.id} />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <RecentReviews productId={params.id} />
      </Suspense>
    </div>
  );
}

// Dynamic components
async function DynamicPrice({ productId }) {
  const pricing = await getPricing(productId); // Real-time price
  return <PriceDisplay price={pricing.current} />;
}

async function StockStatus({ productId }) {
  const stock = await getInventory(productId); // Real-time stock
  return <StockBadge inStock={stock.available > 0} />;
}
```

### Pattern 2: Dashboard with User Context

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { auth } from '@/auth';

export const experimental_ppr = true;

export default function DashboardPage() {
  return (
    <div>
      {/* Static layout */}
      <DashboardHeader />
      <Sidebar />

      <main>
        {/* Dynamic - User-specific */}
        <Suspense fallback={<WelcomeSkeleton />}>
          <WelcomeMessage />
        </Suspense>

        <div className="grid grid-cols-3 gap-4">
          <Suspense fallback={<StatCardSkeleton />}>
            <UserStats />
          </Suspense>

          <Suspense fallback={<ActivitySkeleton />}>
            <RecentActivity />
          </Suspense>

          <Suspense fallback={<NotificationsSkeleton />}>
            <Notifications />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

async function WelcomeMessage() {
  const session = await auth();
  return <h1>Welcome back, {session?.user?.name}!</h1>;
}
```

### Pattern 3: Blog with Dynamic Comments

```typescript
// app/blog/[slug]/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  return (
    <article>
      {/* Static content */}
      <h1>{post.title}</h1>
      <AuthorInfo author={post.author} />
      <PostContent content={post.content} />

      {/* Dynamic sections */}
      <Suspense fallback={<ViewCountSkeleton />}>
        <ViewCount postId={post.id} />
      </Suspense>

      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={post.id} />
      </Suspense>

      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedPosts postId={post.id} />
      </Suspense>
    </article>
  );
}
```

### Pattern 4: Search Page

```typescript
// app/search/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div>
      {/* Static shell */}
      <SearchHeader />
      <SearchFilters />

      {/* Dynamic results based on query */}
      <Suspense
        key={searchParams.q} // Re-suspend on query change
        fallback={<SearchResultsSkeleton />}
      >
        <SearchResults query={searchParams.q} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ query }) {
  if (!query) {
    return <EmptyState message="Enter a search term" />;
  }

  const results = await search(query);
  return <ResultsList results={results} />;
}
```

## What Makes Content Static vs Dynamic?

### Static (Prerendered)
- No data fetching
- Uses `cache: 'force-cache'` fetch
- No `cookies()`, `headers()`, `searchParams`
- No `noStore()` calls

### Dynamic (Streamed)
- Uses `cache: 'no-store'` fetch
- Calls `cookies()` or `headers()`
- Uses `searchParams`
- Wrapped in `<Suspense>`

## Debugging PPR

```typescript
// Check what's static vs dynamic in build output
// Static parts show as "○" (static)
// Dynamic parts show as "λ" (lambda/dynamic)

// Build output example:
// ○ /products           (static shell)
//   └─ λ ProductGrid    (dynamic hole)
```

## Best Practices

1. **Wrap dynamic content in Suspense** - Required for PPR holes
2. **Static shell should be meaningful** - Layout, navigation, headings
3. **Use generateStaticParams** - Pre-generate popular routes
4. **Skeleton matches final layout** - Prevents layout shift
5. **Key Suspense on dynamic params** - Forces re-suspension
6. **Test with slow network** - See streaming in action
7. **Monitor Core Web Vitals** - LCP should improve with PPR
