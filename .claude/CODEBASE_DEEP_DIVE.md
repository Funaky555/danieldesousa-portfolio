# Codebase Deep Dive

Comprehensive architecture documentation for this Next.js frontend application.

> **Note**: This is a template. Fill in the sections as your project evolves.

---

## Architecture Overview

### High-Level Architecture

<!-- TODO: Replace with your actual architecture diagram -->

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js App Router                          │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐   │
│  │ Middleware│ │ Layouts   │ │ Pages     │ │ API Routes    │   │
│  └───────────┘ └───────────┘ └───────────┘ └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Component Layer                             │
│  Server Components │ Client Components │ UI Components (shadcn) │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
│    State     │      │   Data       │      │  External APIs   │
│   (Zustand)  │      │  (SWR/RQ)    │      │                  │
└──────────────┘      └──────────────┘      └──────────────────┘
```

### Request Flow

```
User Request
    │
    ▼
┌──────────────────────────────────────────┐
│ Next.js Middleware                        │
│                                          │
│  1. Authentication check                 │
│  2. Redirect logic                       │
│  3. Headers/cookies                      │
└──────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────┐
│ Route Matching                           │
│                                          │
│  1. Layout(s) render first               │
│  2. Page component renders               │
│  3. Suspense boundaries for loading      │
└──────────────────────────────────────────┘
    │
    ▼
Server Component or Client Component
```

---

## Rendering Patterns

### Server Components (Default)

<!-- TODO: Document your server component patterns -->

- Used for: Static content, data fetching, SEO content
- Location: Any component without `'use client'`
- Data fetching: Direct async/await in component

```typescript
// Example pattern
async function ProductList() {
  const products = await fetchProducts();
  return <div>{/* render products */}</div>;
}
```

### Client Components

<!-- TODO: Document your client component patterns -->

- Used for: Interactivity, hooks, event handlers
- Location: Components with `'use client'` directive
- State: useState, useEffect, third-party hooks

```typescript
'use client';

function SearchInput() {
  const [query, setQuery] = useState('');
  // ...
}
```

---

## Data Flow

### Server-Side Data Fetching

<!-- TODO: Document your data fetching patterns -->

```
Server Component
    │
    ├─► fetch() with cache
    │
    ├─► Server Actions (mutations)
    │
    └─► Streaming with Suspense
```

### Client-Side Data Fetching

<!-- TODO: Document your client data patterns -->

```
Client Component
    │
    ├─► SWR for GET requests
    │   └─► Automatic revalidation
    │
    └─► Server Actions for mutations
        └─► revalidatePath/revalidateTag
```

---

## Module Breakdown

### Feature Module Structure

<!-- TODO: Document your actual folder structure -->

```
src/
├── app/
│   ├── (marketing)/          # Marketing pages group
│   │   ├── page.tsx          # Landing page
│   │   └── about/
│   │       └── page.tsx
│   ├── (dashboard)/          # Dashboard pages group
│   │   ├── layout.tsx        # Dashboard layout
│   │   └── dashboard/
│   │       └── page.tsx
│   └── api/                  # API routes
│       └── [feature]/
│           └── route.ts
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── [feature]/            # Feature-specific components
├── lib/                      # Utilities
├── hooks/                    # Custom hooks
├── stores/                   # Zustand stores
└── types/                    # TypeScript types
```

### Key Components

<!-- TODO: Fill in as you build -->

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navbar` | `components/layout/` | Main navigation |
| `Footer` | `components/layout/` | Site footer |
| ... | ... | ... |

---

## State Management

### Global State (Zustand)

<!-- TODO: Document your stores -->

```
stores/
├── use-auth-store.ts         # Authentication state
├── use-theme-store.ts        # Theme preferences
└── use-[feature]-store.ts    # Feature-specific state
```

### Server State (SWR/React Query)

<!-- TODO: Document your data fetching patterns -->

- Used for API data that needs caching
- Automatic revalidation on focus
- Optimistic updates for mutations

---

## Common Patterns

### How to Add a New Page

1. Create route folder in `app/`
2. Add `page.tsx` (Server Component by default)
3. Add `loading.tsx` for loading state
4. Add `error.tsx` for error boundary
5. Update navigation if needed

### How to Add a New Component

1. Determine if Server or Client Component
2. Create in `components/[feature]/`
3. Add props interface
4. Write tests
5. Document in Storybook (if applicable)

### How to Add an API Route

1. Create folder in `app/api/`
2. Add `route.ts` with HTTP methods
3. Add input validation
4. Add error handling
5. Add authentication if needed

---

## Edge Cases & Gotchas

<!-- TODO: Fill in as you encounter issues -->

### Known Issues

| Issue | Workaround | Status |
|-------|------------|--------|
| _None yet_ | | |

### Performance Considerations

- [ ] Image optimization with `next/image`
- [ ] Font optimization with `next/font`
- [ ] Dynamic imports for large components
- [ ] Proper Suspense boundaries

---

## Environment & Configuration

### Environment Variables

<!-- TODO: Document your env vars (without secrets!) -->

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_URL` | API base URL | Yes |
| ... | ... | ... |

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `components.json` | shadcn/ui configuration |

---

## Testing Strategy

### Unit Tests

- Location: Colocated with components (`*.test.tsx`)
- Framework: Vitest + Testing Library
- Run: `npm run test`

### Integration Tests

<!-- TODO: Document your integration test strategy -->

### Visual Tests

- Tool: agent-browser for screenshots
- Run: `agent-browser screenshot http://localhost:3000 --output screenshot.png`

---

## Deployment

### Build Process

```bash
npm run build    # Creates optimized production build
npm run start    # Starts production server
```

### Environment-Specific

<!-- TODO: Document your deployment setup -->

| Environment | URL | Branch |
|-------------|-----|--------|
| Development | localhost:3000 | feature/* |
| Staging | staging.example.com | develop |
| Production | example.com | main |
