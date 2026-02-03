# LRU Caching Strategies

**Impact:** HIGH
**Category:** Server-Side Performance

## Problem

Repeatedly computing or fetching the same data wastes server resources.

## Solution

Implement LRU (Least Recently Used) caching for expensive operations.

## Examples

### Basic LRU Cache
```tsx
// lib/cache.ts
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, any>({
  max: 500,  // Maximum items
  ttl: 1000 * 60 * 5,  // 5 minutes
})

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key)
  if (cached) return cached as T

  const data = await fetcher()
  cache.set(key, data)
  return data
}
```

### Usage
```tsx
// api/users/[id]/route.ts
import { getCachedData } from '@/lib/cache'

export async function GET(req, { params }) {
  const user = await getCachedData(
    `user:${params.id}`,
    () => db.user.findUnique({ where: { id: params.id } })
  )

  return Response.json(user)
}
```

### With Stale-While-Revalidate
```tsx
const cache = new LRUCache<string, { data: any; timestamp: number }>({
  max: 500,
})

const STALE_TIME = 1000 * 60  // 1 minute
const MAX_AGE = 1000 * 60 * 5  // 5 minutes

export async function getSWRCached<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key)
  const now = Date.now()

  // Fresh cache hit
  if (cached && now - cached.timestamp < STALE_TIME) {
    return cached.data
  }

  // Stale but usable - return stale, revalidate in background
  if (cached && now - cached.timestamp < MAX_AGE) {
    // Revalidate in background
    fetcher().then(data => {
      cache.set(key, { data, timestamp: Date.now() })
    })
    return cached.data
  }

  // Cache miss or expired
  const data = await fetcher()
  cache.set(key, { data, timestamp: now })
  return data
}
```

### Function Memoization
```tsx
import { LRUCache } from 'lru-cache'

function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options?: { max?: number; ttl?: number }
): T {
  const cache = new LRUCache<string, ReturnType<T>>({
    max: options?.max ?? 100,
    ttl: options?.ttl ?? 1000 * 60,
  })

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    const cached = cache.get(key)
    if (cached !== undefined) return cached

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Usage
const expensiveCalculation = memoize((x: number, y: number) => {
  // Complex calculation
  return x * y
})
```

### API Response Caching
```tsx
// middleware.ts or route handler
import { LRUCache } from 'lru-cache'

const responseCache = new LRUCache<string, { body: string; headers: Headers }>({
  max: 100,
  ttl: 1000 * 60 * 5,
})

export async function GET(request: Request) {
  const cacheKey = request.url

  const cached = responseCache.get(cacheKey)
  if (cached) {
    return new Response(cached.body, { headers: cached.headers })
  }

  const data = await fetchExpensiveData()
  const body = JSON.stringify(data)
  const headers = new Headers({ 'Content-Type': 'application/json' })

  responseCache.set(cacheKey, { body, headers })

  return new Response(body, { headers })
}
```

## Cache Invalidation

```tsx
// Invalidate specific key
cache.delete(`user:${userId}`)

// Invalidate by pattern
function invalidatePattern(pattern: RegExp) {
  for (const key of cache.keys()) {
    if (pattern.test(key)) {
      cache.delete(key)
    }
  }
}

// Clear all
cache.clear()
```

## Key Points

1. LRU caches evict least recently used items when full
2. Set appropriate max size and TTL for your use case
3. Consider stale-while-revalidate for better UX
4. Invalidate cache when underlying data changes
5. Use for expensive computations and DB queries
