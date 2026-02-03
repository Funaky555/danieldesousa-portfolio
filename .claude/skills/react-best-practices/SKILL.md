---
name: react-best-practices
description: "Apply React best practices. Checks hooks usage, component patterns, and performance."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
---

# React Best Practices Skill

## Overview

This skill contains 45 performance optimization rules from Vercel Engineering, organized by impact level. Use these guidelines when building React and Next.js applications.

## Rule Categories

| Priority | Category | Impact | Rules |
|----------|----------|--------|-------|
| 1 | Async Operations | CRITICAL | 5 rules |
| 2 | Bundle Optimization | CRITICAL | 5 rules |
| 3 | Server-Side Performance | HIGH | 4 rules |
| 4 | Client-Side Performance | MEDIUM-HIGH | 2 rules |
| 5 | Re-render Management | MEDIUM | 6 rules |
| 6 | Rendering Optimization | MEDIUM | 7 rules |
| 7 | JavaScript Optimization | LOW-MEDIUM | 12 rules |
| 8 | Advanced Patterns | LOW | 2 rules |

## When to Apply

Use these rules when:
- Writing new React components or Next.js pages
- Implementing data-fetching strategies
- Performing code reviews targeting performance
- Refactoring existing codebases
- Optimizing bundle size or runtime performance

## Quick Reference

### CRITICAL: Eliminate Waterfalls

```tsx
// BAD - Sequential
const user = await fetchUser()
const posts = await fetchPosts()

// GOOD - Parallel
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
])
```

### CRITICAL: Bundle Size

```tsx
// BAD - Barrel import
import { Button } from '@/components'

// GOOD - Direct import
import { Button } from '@/components/ui/button'

// BAD - Static heavy import
import Monaco from '@monaco-editor/react'

// GOOD - Dynamic import
const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false })
```

### HIGH: Server Caching

```tsx
// GOOD - React.cache for request deduplication
import { cache } from 'react'

const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})
```

### MEDIUM: Re-render Prevention

```tsx
// GOOD - Memoize expensive computations
const sorted = useMemo(() => items.sort(...), [items])

// GOOD - Use transitions for non-urgent updates
startTransition(() => setResults(search(query)))

// GOOD - Lazy state initialization
const [state, setState] = useState(() => expensiveComputation())
```

## Rules by File

### Async Operations (CRITICAL)
- `async-api-routes.md` - Async API route patterns
- `async-defer-await.md` - Defer await until needed
- `async-dependencies.md` - Manage async dependencies
- `async-parallel.md` - Use Promise.all() for parallel operations
- `async-suspense-boundaries.md` - Suspense for streaming

### Bundle Optimization (CRITICAL)
- `bundle-barrel-imports.md` - Avoid barrel file imports
- `bundle-conditional.md` - Conditional component loading
- `bundle-defer-third-party.md` - Defer third-party scripts
- `bundle-dynamic-imports.md` - Dynamic imports for heavy components
- `bundle-preload.md` - Preload critical resources

### Server-Side Performance (HIGH)
- `server-cache-lru.md` - LRU caching strategies
- `server-cache-react.md` - React.cache() usage
- `server-parallel-fetching.md` - Parallel data fetching
- `server-serialization.md` - Efficient serialization

### Client-Side Performance (MEDIUM-HIGH)
- `client-event-listeners.md` - Event listener management
- `client-swr-dedup.md` - SWR deduplication

### Re-render Management (MEDIUM)
- `rerender-defer-reads.md` - Defer state reads
- `rerender-dependencies.md` - Optimize hook dependencies
- `rerender-derived-state.md` - Use derived state
- `rerender-lazy-state-init.md` - Lazy state initialization
- `rerender-memo.md` - Memoization patterns
- `rerender-transitions.md` - Use transitions

### Rendering Optimization (MEDIUM)
- `rendering-activity.md` - Activity monitoring
- `rendering-animate-svg-wrapper.md` - SVG animation patterns
- `rendering-conditional-render.md` - Conditional rendering
- `rendering-content-visibility.md` - Content visibility CSS
- `rendering-hoist-jsx.md` - Hoist static JSX
- `rendering-hydration-no-flicker.md` - Prevent hydration flicker
- `rendering-svg-precision.md` - SVG precision optimization

### JavaScript Optimization (LOW-MEDIUM)
- `js-batch-dom-css.md` - Batch DOM/CSS operations
- `js-cache-function-results.md` - Cache function results
- `js-cache-property-access.md` - Cache property access
- `js-cache-storage.md` - Storage caching
- `js-combine-iterations.md` - Combine iterations
- `js-early-exit.md` - Early exit patterns
- `js-hoist-regexp.md` - Hoist RegExp
- `js-index-maps.md` - Use indexed maps
- `js-length-check-first.md` - Length check first
- `js-min-max-loop.md` - Optimize min/max loops
- `js-set-map-lookups.md` - Use Set/Map for lookups
- `js-tosorted-immutable.md` - Immutable sorting

### Advanced Patterns (LOW)
- `advanced-event-handler-refs.md` - Event handler refs
- `advanced-use-latest.md` - useLatest pattern

## Usage

Reference specific rules:
```
See: .claude/skills/react-best-practices/references/rules/[rule-name].md
```

Or consult the `performance-auditor` agent which has these rules integrated.
