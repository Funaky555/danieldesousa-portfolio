# Project Conventions

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Pages | lowercase | `page.tsx`, `layout.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Types | PascalCase | `UserTypes.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |

## Directory Structure

### Components
```
components/
├── ui/                   # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── forms/                # Form-specific components
│   ├── login-form.tsx
│   └── contact-form.tsx
├── layout/               # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
└── [feature]/            # Feature-specific
    ├── feature-card.tsx
    └── feature-list.tsx
```

### App Router
```
app/
├── (marketing)/          # Route group - shared layout, no URL impact
│   ├── page.tsx          # /
│   ├── about/page.tsx    # /about
│   └── layout.tsx        # Shared marketing layout
├── (dashboard)/          # Route group
│   ├── dashboard/page.tsx  # /dashboard
│   └── layout.tsx        # Shared dashboard layout
├── api/                  # API routes
│   └── users/route.ts    # /api/users
├── layout.tsx            # Root layout
└── globals.css
```

## Component Patterns

### Basic Component
```tsx
import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
  children: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

### Server Component (Default)
```tsx
// No 'use client' directive needed
// Can use async/await directly
// Cannot use hooks or event handlers

export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### Client Component
```tsx
'use client'

import { useState } from 'react'

export function InteractiveComponent() {
  const [state, setState] = useState('')
  return <input value={state} onChange={e => setState(e.target.value)} />
}
```

## Import Order

```tsx
// 1. React/Next
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// 2. Third-party libraries
import { z } from 'zod'
import { useForm } from 'react-hook-form'

// 3. Internal utilities
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'

// 4. Internal components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 5. Types
import type { User } from '@/types'

// 6. Styles (if any)
import styles from './Component.module.css'
```

## TypeScript

### Type vs Interface
```tsx
// Use interface for objects that may be extended
interface User {
  id: string
  name: string
}

interface AdminUser extends User {
  permissions: string[]
}

// Use type for unions, intersections, primitives
type Status = 'idle' | 'loading' | 'success' | 'error'
type ButtonVariant = 'default' | 'outline' | 'ghost'
```

### Props Types
```tsx
// Props interface named [Component]Props
interface ButtonProps {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

// Extend HTML attributes when needed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}
```

## State Management

### Local State
Use `useState` for component-local state:
```tsx
const [isOpen, setIsOpen] = useState(false)
```

### Form State
Use react-hook-form:
```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
})
```

### Server State
Use Server Components for initial data:
```tsx
// Server Component
export default async function Page() {
  const data = await db.query()
  return <ClientComponent initialData={data} />
}
```

Use SWR/React Query for client-side updates:
```tsx
const { data, mutate } = useSWR('/api/data')
```

## Error Handling

### API Routes
```tsx
export async function GET() {
  try {
    const data = await fetchData()
    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

### Error Boundaries
```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Comments

### When to Comment
- Complex business logic
- Non-obvious workarounds
- API contracts
- TODO items

### JSDoc for Public APIs
```tsx
/**
 * Formats a date for display
 * @param date - The date to format
 * @param format - Output format (default: 'long')
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: 'short' | 'long' = 'long'): string {
  // ...
}
```

## Git Commits

### Conventional Commits
```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: extract validation logic
test: add unit tests for auth
chore: update dependencies
```

### Commit Message Format
```
<type>: <short description>

[optional body]

[optional footer]
```
