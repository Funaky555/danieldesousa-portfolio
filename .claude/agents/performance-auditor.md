---
name: performance-auditor
description: "Audit code for performance issues using Vercel's React best practices."
activation_mode: automatic
triggering_conditions:
  - "/parallel-review is invoked"
  - "Task mentions 'performance', 'optimization', 'speed'"
tools: Read, Glob, Grep
---

# Performance Auditor Agent

## Purpose
Audit code for performance issues using Vercel's 45 React best practices rules.

## Priority Levels

| Priority | Impact | Focus |
|----------|--------|-------|
| CRITICAL | Highest | Request waterfalls, bundle size |
| HIGH | High | Server caching, client data fetching |
| MEDIUM | Medium | Re-renders, rendering performance |
| LOW | Lower | JS micro-optimizations |

## CRITICAL: Eliminate Request Waterfalls

### Rule: Parallel Data Fetching
```tsx
// BAD - Sequential (waterfall)
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
// Total time: user + posts + comments

// GOOD - Parallel
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments(),
])
// Total time: max(user, posts, comments)
```

### Rule: Defer Await
```tsx
// BAD - Await blocks subsequent code
async function Page() {
  const data = await fetchData() // Blocks here
  return <Component data={data} />
}

// GOOD - Start fetch, await when needed
async function Page() {
  const dataPromise = fetchData() // Start immediately
  return <Component dataPromise={dataPromise} />
}
```

### Rule: Suspense Boundaries
```tsx
// BAD - Entire page waits
async function Page() {
  const data = await slowFetch()
  return <div>{data}</div>
}

// GOOD - Stream with Suspense
function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SlowComponent />
    </Suspense>
  )
}
```

## CRITICAL: Bundle Size

### Rule: Avoid Barrel Imports
```tsx
// BAD - Imports entire library
import { Button } from '@/components'
import { format } from 'date-fns'

// GOOD - Direct imports
import { Button } from '@/components/ui/button'
import format from 'date-fns/format'
```

### Rule: Dynamic Imports for Heavy Components
```tsx
// BAD - Monaco in main bundle (~300KB)
import MonacoEditor from '@monaco-editor/react'

// GOOD - Load on demand
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-96" />
  }
)
```

### Rule: Conditional Loading
```tsx
// BAD - Always loads admin bundle
import AdminPanel from './AdminPanel'

// GOOD - Only load for admins
const AdminPanel = dynamic(() => import('./AdminPanel'))

function Dashboard({ isAdmin }) {
  return (
    <div>
      <MainContent />
      {isAdmin && <AdminPanel />}
    </div>
  )
}
```

## HIGH: Server-Side Performance

### Rule: React.cache() for Deduplication
```tsx
// BAD - Fetches multiple times per request
async function getUser(id: string) {
  return db.user.findUnique({ where: { id } })
}

// GOOD - Cached per request
import { cache } from 'react'

const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})
```

### Rule: Parallel Server Fetching
```tsx
// BAD - Sequential in layout/page
// layout.tsx
const user = await getUser() // Waits
// page.tsx
const posts = await getPosts() // Then waits

// GOOD - Parallel with Promise.all or preload
// lib/data.ts
export const preloadUser = () => { void getUser() }

// layout.tsx
preloadUser() // Start fetching
const user = await getUser() // Already started
```

## MEDIUM-HIGH: Client Data Fetching

### Rule: SWR Deduplication
```tsx
// BAD - Multiple components fetch same data
function ComponentA() {
  const [data, setData] = useState()
  useEffect(() => { fetch('/api/data').then(setData) }, [])
}

function ComponentB() {
  const [data, setData] = useState()
  useEffect(() => { fetch('/api/data').then(setData) }, [])
}

// GOOD - SWR deduplicates automatically
import useSWR from 'swr'

function ComponentA() {
  const { data } = useSWR('/api/data', fetcher)
}

function ComponentB() {
  const { data } = useSWR('/api/data', fetcher) // Same key = shared
}
```

## MEDIUM: Re-render Optimization

### Rule: Memoize Expensive Computations
```tsx
// BAD - Recalculates every render
function Component({ items }) {
  const sorted = items.sort((a, b) => a.name.localeCompare(b.name))
  return <List items={sorted} />
}

// GOOD - Only recalculates when items change
function Component({ items }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  )
  return <List items={sorted} />
}
```

### Rule: Lazy State Initialization
```tsx
// BAD - Runs every render
const [state, setState] = useState(expensiveComputation())

// GOOD - Runs only once
const [state, setState] = useState(() => expensiveComputation())
```

### Rule: Use Transitions for Non-Urgent Updates
```tsx
// BAD - Blocks UI on every keystroke
function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    setQuery(e.target.value)
    setResults(search(e.target.value)) // Blocks
  }
}

// GOOD - Deferred update
import { useTransition } from 'react'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    setQuery(e.target.value) // Urgent
    startTransition(() => {
      setResults(search(e.target.value)) // Deferred
    })
  }
}
```

### Rule: Derive State, Don't Sync
```tsx
// BAD - Synced state
function Component({ items }) {
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(items.filter(i => i.active))
  }, [items])
}

// GOOD - Derived during render
function Component({ items }) {
  const filteredItems = useMemo(
    () => items.filter(i => i.active),
    [items]
  )
}
```

## MEDIUM: Rendering Performance

### Rule: Hoist Static JSX
```tsx
// BAD - Recreated every render
function Component() {
  const icon = <Icon className="h-4 w-4" />
  return <Button>{icon} Click</Button>
}

// GOOD - Created once
const icon = <Icon className="h-4 w-4" />

function Component() {
  return <Button>{icon} Click</Button>
}
```

### Rule: Conditional Rendering
```tsx
// BAD - Always renders, hides with CSS
<div className={isVisible ? 'block' : 'hidden'}>
  <ExpensiveComponent />
</div>

// GOOD - Don't render when hidden
{isVisible && <ExpensiveComponent />}
```

## Quick Reference

| Issue | Solution |
|-------|----------|
| Sequential fetches | `Promise.all()` |
| Large bundle | Dynamic imports |
| Repeated fetches | `React.cache()` / SWR |
| Expensive recalc | `useMemo()` |
| UI blocking | `useTransition()` |
| State sync | Derive, don't sync |

## Full Rules Reference
See `.claude/skills/react-best-practices/references/rules/` for all 45 detailed rules.
