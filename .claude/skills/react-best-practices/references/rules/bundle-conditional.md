# Conditional Component Loading

**Impact:** CRITICAL
**Category:** Bundle Optimization

## Problem

Loading heavy components that may not be needed for all users.

## Solution

Dynamically import components based on conditions.

## Examples

### Bad - Always Loaded
```tsx
import AdminPanel from './AdminPanel'  // 200KB
import UserDashboard from './UserDashboard'  // 50KB

function Dashboard({ user }) {
  return user.isAdmin ? <AdminPanel /> : <UserDashboard />
}
// AdminPanel loaded for ALL users, even non-admins
```

### Good - Conditional Loading
```tsx
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('./AdminPanel'))
const UserDashboard = dynamic(() => import('./UserDashboard'))

function Dashboard({ user }) {
  return user.isAdmin ? <AdminPanel /> : <UserDashboard />
}
// Each panel loaded only when needed
```

### Good - With Loading States
```tsx
const AdminPanel = dynamic(
  () => import('./AdminPanel'),
  {
    loading: () => <DashboardSkeleton />,
  }
)
```

### Feature Flag Based Loading
```tsx
const ExperimentalFeature = dynamic(
  () => import('./ExperimentalFeature'),
  { ssr: false }
)

function App({ flags }) {
  return (
    <div>
      <MainContent />
      {flags.experimentalEnabled && <ExperimentalFeature />}
    </div>
  )
}
```

### Role-Based Loading
```tsx
const components = {
  admin: dynamic(() => import('./AdminView')),
  editor: dynamic(() => import('./EditorView')),
  viewer: dynamic(() => import('./ViewerView')),
}

function Dashboard({ userRole }) {
  const Component = components[userRole] || components.viewer
  return <Component />
}
```

### Route-Based Code Splitting
```tsx
// Next.js App Router does this automatically per-route
// Each page is its own chunk

// app/admin/page.tsx - only loaded when visiting /admin
// app/dashboard/page.tsx - only loaded when visiting /dashboard
```

### Modal/Dialog Loading
```tsx
import { useState } from 'react'
import dynamic from 'next/dynamic'

const HeavyModal = dynamic(() => import('./HeavyModal'))

function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <HeavyModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
// Modal code only loads when user clicks button
```

## SSR Considerations

```tsx
// Client-only component (uses browser APIs)
const ClientOnlyChart = dynamic(
  () => import('./Chart'),
  { ssr: false }
)

// SSR-compatible with loading state
const SSRComponent = dynamic(
  () => import('./Component'),
  {
    loading: () => <Skeleton />,
    ssr: true,  // default
  }
)
```

## Key Points

1. Don't load what users won't see
2. Use dynamic imports for conditional features
3. Consider user roles, feature flags, routes
4. Modals/dialogs are great candidates
5. Use `ssr: false` for client-only components
