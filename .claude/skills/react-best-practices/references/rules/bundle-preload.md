# Preload Critical Resources

**Impact:** CRITICAL
**Category:** Bundle Optimization

## Problem

Critical resources discovered late cause render delays.

## Solution

Preload resources that will be needed soon.

## Examples

### Preload Fonts
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

// Next.js automatically optimizes Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Preload Critical Images
```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/hero-image.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Preload with next/image
```tsx
import Image from 'next/image'

// Priority prop adds preload hint
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // Preloads this image
/>
```

### Prefetch Next Page
```tsx
import Link from 'next/link'

// Next.js Link prefetches by default in viewport
<Link href="/dashboard">Dashboard</Link>

// Disable prefetch for less important links
<Link href="/settings" prefetch={false}>Settings</Link>
```

### Preload API Data
```tsx
// lib/data.ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})

// Preload function
export const preloadUser = (id: string) => {
  void getUser(id)
}

// layout.tsx
export default function Layout({ params, children }) {
  // Start fetching before rendering children
  preloadUser(params.userId)
  return children
}
```

### Preload Dynamic Imports
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'))

// Preload on hover
function Card() {
  const handleMouseEnter = () => {
    // Trigger dynamic import early
    import('./HeavyComponent')
  }

  return (
    <div onMouseEnter={handleMouseEnter}>
      <button>Open Editor</button>
    </div>
  )
}
```

### Preload on Route Hover
```tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

function NavLink({ href, children }) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onMouseEnter={() => router.prefetch(href)}
    >
      {children}
    </Link>
  )
}
```

### DNS Prefetch for External Resources
```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <head>
        <link rel="dns-prefetch" href="//api.example.com" />
        <link rel="preconnect" href="https://api.example.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Preload Strategy

| Resource Type | Method |
|---------------|--------|
| Fonts | `next/font` (automatic) |
| LCP Image | `priority` prop |
| Above-fold images | `priority` prop |
| Next page | `Link` (automatic) |
| API data | `preload` function |
| Dynamic components | Preload on interaction intent |
| External APIs | `dns-prefetch`, `preconnect` |

## Don't Over-Preload

```tsx
// BAD - Preloading everything
<link rel="preload" href="/image1.jpg" as="image" />
<link rel="preload" href="/image2.jpg" as="image" />
<link rel="preload" href="/image3.jpg" as="image" />
// ... 20 more

// GOOD - Only critical resources
<link rel="preload" href="/hero.jpg" as="image" />  // LCP image only
```

## Key Points

1. Preload only critical, above-the-fold resources
2. Use `priority` prop on LCP images
3. Next.js handles font and link prefetching
4. Preload dynamic imports on interaction intent
5. Don't over-preload - it can hurt performance
