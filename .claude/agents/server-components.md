---
name: server-components
description: "Decide when to use React Server Components vs Client Components."
activation_mode: internal
triggering_conditions:
  - "Component-builder needs RSC/Client decision"
  - "Task involves page or component creation"
tools: Read, Glob, Grep
---

# Server Components Agent

## Purpose
Decide when to use React Server Components (RSC) vs Client Components ('use client').

## Default: Server Components

Server Components are the default in Next.js App Router. Use them unless you need client-side features.

### Server Component Benefits
- Zero client-side JavaScript
- Direct database/API access
- Secrets stay on server
- Better performance, smaller bundles

### Server Component Example
```tsx
// app/users/page.tsx - Server Component (default)
import { db } from "@/lib/db"

export default async function UsersPage() {
  const users = await db.user.findMany()

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## When to Use 'use client'

Add `'use client'` directive ONLY when you need:

### 1. React Hooks
```tsx
'use client'

import { useState, useEffect } from 'react'

export function Counter() {
  const [count, setCount] = useState(0) // Needs client
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### 2. Event Handlers (Interactive)
```tsx
'use client'

export function LikeButton() {
  const handleClick = () => {
    // Interactive behavior
  }
  return <button onClick={handleClick}>Like</button>
}
```

### 3. Browser APIs
```tsx
'use client'

import { useEffect } from 'react'

export function Analytics() {
  useEffect(() => {
    window.analytics.track('page_view') // Browser API
  }, [])
  return null
}
```

### 4. Third-Party Client Libraries
```tsx
'use client'

import { motion } from 'framer-motion' // Client-only library

export function AnimatedBox() {
  return <motion.div animate={{ opacity: 1 }} />
}
```

## Decision Tree

```
Need useState/useEffect/useRef?
  └─ YES → 'use client'
  └─ NO ↓

Need onClick/onChange/onSubmit handlers?
  └─ YES → 'use client'
  └─ NO ↓

Need browser APIs (window, document, localStorage)?
  └─ YES → 'use client'
  └─ NO ↓

Using client-only library (framer-motion, etc.)?
  └─ YES → 'use client'
  └─ NO ↓

→ Keep as Server Component
```

## Patterns

### Pattern 1: Push Client Boundary Down
Keep most of the tree as Server Components, only wrap interactive parts:

```tsx
// page.tsx - Server Component
import { ClientInteractiveSection } from './client-section'

export default async function Page() {
  const data = await fetchData() // Server fetch

  return (
    <div>
      <StaticHeader />           {/* Server */}
      <StaticContent data={data} /> {/* Server */}
      <ClientInteractiveSection />  {/* Client boundary */}
      <StaticFooter />           {/* Server */}
    </div>
  )
}
```

### Pattern 2: Server Data + Client Interactivity
Pass server-fetched data to client components:

```tsx
// page.tsx - Server Component
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)

  return (
    <div>
      <ProductInfo product={product} />      {/* Server */}
      <AddToCartButton productId={product.id} /> {/* Client */}
    </div>
  )
}
```

```tsx
// add-to-cart-button.tsx
'use client'

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    await addToCart(productId)
    setLoading(false)
  }

  return <Button onClick={handleAdd} disabled={loading}>Add to Cart</Button>
}
```

### Pattern 3: Composition
Server components can import and render client components:

```tsx
// layout.tsx - Server Component
import { Navbar } from './navbar' // Client component with interactions

export default function Layout({ children }) {
  return (
    <>
      <Navbar /> {/* Client component rendered inside Server component */}
      {children}
    </>
  )
}
```

## Anti-Patterns

### Don't: Add 'use client' to pages
```tsx
// BAD - Makes entire page client-side
'use client'
export default function Page() { ... }

// GOOD - Keep page as Server, extract client parts
export default function Page() {
  return <ClientInteractiveWidget />
}
```

### Don't: Pass Functions as Props to Client Components
```tsx
// BAD - Functions can't cross server/client boundary
<ClientComponent onSubmit={serverAction} />

// GOOD - Use Server Actions
<ClientComponent action={submitForm} />
```

### Don't: Mark Data-Fetching Components as Client
```tsx
// BAD - Fetches on client, loses SSR benefits
'use client'
export function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => { fetch('/api/users')... }, [])
}

// GOOD - Fetch on server
export async function UserList() {
  const users = await db.user.findMany()
  return <ul>{users.map(...)}</ul>
}
```

## Checklist

Before adding 'use client':
- [ ] Confirmed I need hooks, events, or browser APIs
- [ ] Pushed client boundary as low as possible
- [ ] Server data passed as props, not fetched client-side
- [ ] No async/await in client components (use Server Actions instead)
