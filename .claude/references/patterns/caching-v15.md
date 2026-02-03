# Next.js 15 Caching Patterns

## Overview

Next.js 15 changed several caching defaults. Understanding these changes is crucial for optimal performance.

## Key Changes in Next.js 15

| Feature | Next.js 14 | Next.js 15 |
|---------|------------|------------|
| `fetch()` default | `cache: 'force-cache'` | `cache: 'no-store'` |
| Route handlers | Cached by default | Dynamic by default |
| Client router cache | 30 seconds | 0 seconds |

## Route Segment Config

### Force Static Generation
```typescript
// app/about/page.tsx
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function AboutPage() {
  return <div>About Us</div>;
}
```

### Force Dynamic Rendering
```typescript
// app/dashboard/page.tsx
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await fetchUserData(); // Always fresh
  return <div>{data}</div>;
}
```

### Available Options
```typescript
// Static options
export const dynamic = "force-static";      // Always static
export const dynamic = "auto";              // Default, heuristic

// Dynamic options
export const dynamic = "force-dynamic";     // Always dynamic
export const dynamic = "error";             // Error if dynamic

// Revalidation
export const revalidate = false;            // Never revalidate (static)
export const revalidate = 0;                // Always revalidate (dynamic)
export const revalidate = 60;               // Revalidate every 60 seconds
```

## Fetch Caching

### No Caching (Default in Next.js 15)
```typescript
// Fetches on every request
const data = await fetch("https://api.example.com/data");
// Equivalent to:
const data = await fetch("https://api.example.com/data", {
  cache: "no-store",
});
```

### Force Caching
```typescript
// Cache indefinitely
const data = await fetch("https://api.example.com/data", {
  cache: "force-cache",
});
```

### Time-Based Revalidation
```typescript
// Revalidate every 60 seconds
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});
```

### Tag-Based Revalidation
```typescript
// Tag the fetch
const data = await fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
});

// Revalidate by tag (in Server Action or Route Handler)
import { revalidateTag } from "next/cache";
revalidateTag("posts");
```

## unstable_cache for Non-Fetch

```typescript
import { unstable_cache } from "next/cache";

// Cache database queries
const getCachedUser = unstable_cache(
  async (id: string) => {
    return db.user.findUnique({ where: { id } });
  },
  ["user"], // Cache key prefix
  {
    revalidate: 60,
    tags: ["users"],
  }
);

// Usage
const user = await getCachedUser("123");
```

## React cache() for Request Deduplication

```typescript
import { cache } from "react";

// Deduplicate within single request
const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

// Multiple calls in same request = single fetch
async function Component() {
  const user = await getUser("123"); // Fetches
  return <Child userId="123" />;
}

async function Child({ userId }) {
  const user = await getUser("123"); // Uses cached result
  return <div>{user.name}</div>;
}
```

## Common Patterns

### Static Pages with Dynamic Data Refresh
```typescript
// Mostly static, refresh daily
export const revalidate = 86400; // 24 hours

export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts", {
    next: { revalidate: 86400 },
  });

  return <PostList posts={posts} />;
}
```

### User-Specific Dynamic Pages
```typescript
// Always dynamic for personalization
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";

export default async function Dashboard() {
  const session = cookies().get("session");
  const userData = await fetchUserData(session);

  return <UserDashboard data={userData} />;
}
```

### Hybrid: Static Shell + Dynamic Content
```typescript
// Page itself is static
export const dynamic = "force-static";

export default function ProductPage({ params }) {
  return (
    <div>
      {/* Static product info */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductInfo id={params.id} />
      </Suspense>

      {/* Dynamic pricing - fetched client-side */}
      <Suspense fallback={<PriceSkeleton />}>
        <DynamicPrice id={params.id} />
      </Suspense>
    </div>
  );
}

// This component forces dynamic
async function DynamicPrice({ id }) {
  const price = await fetch(`/api/price/${id}`, {
    cache: "no-store", // Always fresh
  });
  return <PriceDisplay price={price} />;
}
```

### On-Demand Revalidation
```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json();

  // Verify secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  }

  if (tag) {
    revalidateTag(tag);
    return Response.json({ revalidated: true, tag });
  }

  return Response.json({ error: "No path or tag provided" }, { status: 400 });
}
```

## Debugging Caching

### Check Cache Status
```typescript
const res = await fetch("https://api.example.com/data");
console.log("Cache status:", res.headers.get("x-vercel-cache"));
// HIT, MISS, STALE, etc.
```

### Development vs Production
- Development: Caching is mostly disabled for easier debugging
- Production: Full caching behavior applies

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Stale data | Over-aggressive caching | Reduce revalidate time or use no-store |
| Slow pages | No caching | Add appropriate caching |
| Inconsistent data | Cache key collisions | Use unique tags/keys |

## Best Practices

1. **Default to no-store in Next.js 15** - Add caching intentionally
2. **Use tags for related data** - Easier invalidation
3. **Cache at the right level** - Route, fetch, or component
4. **Set appropriate revalidate times** - Based on data freshness needs
5. **Use ISR for semi-static content** - Best of both worlds
6. **Test caching in production mode** - `next build && next start`
