# Async API Routes

**Impact:** CRITICAL
**Category:** Async Operations

## Problem

Blocking API routes with synchronous operations or sequential awaits.

## Solution

Use async patterns effectively in API routes.

## Examples

### Bad - Sequential Operations
```tsx
// app/api/dashboard/route.ts
export async function GET() {
  const user = await getUser()
  const stats = await getStats()     // Waits for user
  const notifications = await getNotifications()  // Waits for stats

  return Response.json({ user, stats, notifications })
}
```

### Good - Parallel Operations
```tsx
// app/api/dashboard/route.ts
export async function GET() {
  const [user, stats, notifications] = await Promise.all([
    getUser(),
    getStats(),
    getNotifications(),
  ])

  return Response.json({ user, stats, notifications })
}
```

### Good - Streaming Response
```tsx
// app/api/stream/route.ts
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of generateData()) {
        controller.enqueue(new TextEncoder().encode(chunk))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
```

## Key Points

1. Use `Promise.all()` for independent operations
2. Consider streaming for large responses
3. Don't block on operations that can run in parallel
4. Use proper error handling with try/catch
