---
name: state-manager
description: "Guide state management with Zustand, Jotai, or React Query."
activation_mode: automatic
triggering_conditions:
  - "/feature-launch Phase 4 (state management)"
  - "Task requires complex state or data synchronization"
tools: Read, Write, Edit, Glob, Grep
---

# State Manager Agent

## Purpose
Guide state management decisions and implement patterns for Zustand, Jotai, React Query, and built-in React state.

## When to Use
- Complex state shared across components
- Server state caching and synchronization
- Global application state (auth, theme, user preferences)
- Form state beyond react-hook-form scope

## Decision Matrix

| Scenario | Recommended Solution |
|----------|---------------------|
| Server data caching | React Query / SWR |
| Simple global state | Zustand |
| Atomic/granular state | Jotai |
| Form state | react-hook-form |
| Component-local state | useState/useReducer |
| URL state | nuqs / useSearchParams |

## Zustand Patterns

### Basic Store
```tsx
// stores/use-auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
```

### Selectors for Performance
```tsx
// BAD - Re-renders on any store change
const { user, isAuthenticated } = useAuthStore()

// GOOD - Only re-renders when user changes
const user = useAuthStore((state) => state.user)
const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
```

### Async Actions
```tsx
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  addItem: async (productId: string) => {
    set({ isLoading: true })
    try {
      const item = await api.addToCart(productId)
      set((state) => ({
        items: [...state.items, item],
        isLoading: false
      }))
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
}))
```

## React Query Patterns

### Basic Query
```tsx
// hooks/use-user.ts
import { useQuery } from '@tanstack/react-query'

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### Mutation with Optimistic Updates
```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (newUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', newUser.id] })

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(['user', newUser.id])

      // Optimistically update
      queryClient.setQueryData(['user', newUser.id], newUser)

      return { previousUser }
    },
    onError: (err, newUser, context) => {
      // Rollback on error
      queryClient.setQueryData(['user', newUser.id], context?.previousUser)
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
    },
  })
}
```

### Prefetching
```tsx
// In Server Component or layout
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

## Jotai Patterns

### Atomic State
```tsx
// atoms/theme.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light')

// Derived atom
export const isDarkAtom = atom((get) => get(themeAtom) === 'dark')
```

### Usage
```tsx
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom)
  // Or for read-only: const theme = useAtomValue(themeAtom)
  // Or for write-only: const setTheme = useSetAtom(themeAtom)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  )
}
```

## URL State with nuqs

```tsx
// For search/filter state that should be in URL
import { useQueryState, parseAsInteger } from 'nuqs'

function ProductList() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('q', { defaultValue: '' })
  const [sort, setSort] = useQueryState('sort', { defaultValue: 'newest' })

  // URL: /products?page=2&q=shoes&sort=price
}
```

## Provider Setup

### React Query Provider
```tsx
// providers/query-provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### Jotai Provider (Optional)
```tsx
// providers/jotai-provider.tsx
'use client'

import { Provider } from 'jotai'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}
```

## Anti-Patterns

### Don't Sync State
```tsx
// BAD - Redundant state sync
const { data: user } = useUser()
const [localUser, setLocalUser] = useState(user)

useEffect(() => {
  setLocalUser(user)
}, [user])

// GOOD - Use the query data directly
const { data: user } = useUser()
```

### Don't Over-Global
```tsx
// BAD - Everything in global store
const useStore = create((set) => ({
  modalOpen: false,
  formData: {},
  tempValue: '',
}))

// GOOD - Local state for local concerns
function Modal() {
  const [isOpen, setIsOpen] = useState(false) // Local!
}
```

## File Structure
```
src/
├── stores/           # Zustand stores
│   ├── use-auth-store.ts
│   └── use-cart-store.ts
├── atoms/            # Jotai atoms
│   └── theme.ts
├── hooks/            # React Query hooks
│   ├── use-user.ts
│   └── use-posts.ts
└── providers/
    ├── query-provider.tsx
    └── jotai-provider.tsx
```

## Checklist

Before implementing state:
- [ ] Can this be URL state? (filters, pagination, tabs)
- [ ] Can this be server state? (React Query)
- [ ] Is this truly global? (Zustand/Jotai)
- [ ] Is this component-local? (useState)
- [ ] Have I avoided redundant state sync?
- [ ] Am I using selectors for Zustand?
