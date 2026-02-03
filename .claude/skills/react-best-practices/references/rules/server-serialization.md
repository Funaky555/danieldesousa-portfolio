# Efficient Serialization

**Impact:** HIGH
**Category:** Server-Side Performance

## Problem

Passing large or complex objects from Server to Client Components wastes bandwidth.

## Solution

Serialize only what's needed, transform data before passing.

## Examples

### Bad - Passing Entire Object
```tsx
// Server Component
async function Page() {
  const user = await db.user.findUnique({
    where: { id: '1' },
    include: {
      posts: true,
      comments: true,
      settings: true,
      sessions: true,  // Sensitive!
      passwordHash: true,  // Sensitive!
    }
  })

  return <ClientProfile user={user} />  // Huge payload, sensitive data!
}
```

### Good - Select Only Needed Fields
```tsx
// Server Component
async function Page() {
  const user = await db.user.findUnique({
    where: { id: '1' },
    select: {
      id: true,
      name: true,
      avatar: true,
      bio: true,
    }
  })

  return <ClientProfile user={user} />  // Minimal payload
}
```

### Good - Transform Before Passing
```tsx
// Server Component
async function Page() {
  const user = await db.user.findUnique({
    where: { id: '1' },
    include: { posts: true }
  })

  // Transform to minimal client data
  const profileData = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    postCount: user.posts.length,
    recentPostTitles: user.posts.slice(0, 3).map(p => p.title),
  }

  return <ClientProfile data={profileData} />
}
```

### Bad - Serializing Dates Incorrectly
```tsx
// Server Component
const data = await db.post.findMany()
// Date objects become strings when serialized!
return <ClientComponent posts={data} />

// Client Component
function ClientComponent({ posts }) {
  // posts[0].createdAt is now a string, not Date!
  posts[0].createdAt.toLocaleDateString()  // ERROR!
}
```

### Good - Handle Date Serialization
```tsx
// Server Component
const posts = await db.post.findMany()

const serializedPosts = posts.map(post => ({
  ...post,
  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
}))

return <ClientComponent posts={serializedPosts} />

// Client Component
function ClientComponent({ posts }) {
  const date = new Date(posts[0].createdAt)  // Parse ISO string
  return <span>{date.toLocaleDateString()}</span>
}
```

### Type-Safe Serialization
```tsx
// types.ts
export interface SerializedPost {
  id: string
  title: string
  createdAt: string  // ISO string
}

// lib/serializers.ts
export function serializePost(post: Post): SerializedPost {
  return {
    id: post.id,
    title: post.title,
    createdAt: post.createdAt.toISOString(),
  }
}

// Server Component
const posts = await db.post.findMany()
const serialized = posts.map(serializePost)
return <ClientList posts={serialized} />
```

### Avoid Passing Functions
```tsx
// BAD - Functions can't be serialized
<ClientComponent
  onClick={() => console.log('click')}  // ERROR!
  formatter={(x) => x.toFixed(2)}  // ERROR!
/>

// GOOD - Pass data, define functions in client
<ClientComponent
  actionType="log"
  precision={2}
/>
```

### Large Lists - Paginate or Virtualize
```tsx
// BAD - Sending 10,000 items
const allItems = await db.item.findMany()  // 10,000 items
return <ClientList items={allItems} />  // Huge payload!

// GOOD - Paginate server-side
const items = await db.item.findMany({
  take: 20,
  skip: page * 20,
})
return <ClientList items={items} page={page} />

// GOOD - Send IDs, fetch on client
const itemIds = await db.item.findMany({ select: { id: true } })
return <VirtualizedList itemIds={itemIds.map(i => i.id)} />
```

## Serialization Checklist

- [ ] Only pass needed fields (use `select`)
- [ ] No sensitive data (passwords, tokens, etc.)
- [ ] Dates converted to ISO strings
- [ ] No functions or class instances
- [ ] Large lists paginated
- [ ] Complex objects simplified

## Key Points

1. Select only fields the client needs
2. Never pass sensitive data to client
3. Transform complex objects to simple shapes
4. Handle Date serialization explicitly
5. Functions cannot cross server/client boundary
