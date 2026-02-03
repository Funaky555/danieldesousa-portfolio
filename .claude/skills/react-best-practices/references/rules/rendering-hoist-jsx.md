# Hoist Static JSX

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Static JSX elements created inside components are recreated every render.

## Solution

Hoist static elements outside the component.

## Examples

### Bad - Static Element in Component
```tsx
function Button({ onClick }) {
  // Created every render
  const icon = (
    <svg className="h-4 w-4" viewBox="0 0 20 20">
      <path d="M10 3a1 1 0 011 1v5h5..." />
    </svg>
  )

  return (
    <button onClick={onClick}>
      {icon}
      Click me
    </button>
  )
}
```

### Good - Hoisted Static Element
```tsx
// Created once, reused
const icon = (
  <svg className="h-4 w-4" viewBox="0 0 20 20">
    <path d="M10 3a1 1 0 011 1v5h5..." />
  </svg>
)

function Button({ onClick }) {
  return (
    <button onClick={onClick}>
      {icon}
      Click me
    </button>
  )
}
```

### Complex Static Content
```tsx
// All static - hoist everything
const emptyState = (
  <div className="flex flex-col items-center justify-center p-8">
    <svg className="h-12 w-12 text-muted-foreground">
      <circle cx="12" cy="12" r="10" />
    </svg>
    <h3 className="mt-4 text-lg font-medium">No items found</h3>
    <p className="mt-2 text-sm text-muted-foreground">
      Get started by creating your first item.
    </p>
  </div>
)

function ItemList({ items }) {
  if (items.length === 0) {
    return emptyState  // No recreation
  }

  return <List items={items} />
}
```

### Static Decorative Elements
```tsx
// Decorative SVGs that never change
const backgroundPattern = (
  <svg className="absolute inset-0 -z-10" aria-hidden="true">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40L40 0M-10 10L10 -10M30 50L50 30" stroke="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
)

const gradientOverlay = (
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
)

function Hero({ title }) {
  return (
    <section className="relative">
      {backgroundPattern}
      {gradientOverlay}
      <h1>{title}</h1>  {/* Only dynamic part */}
    </section>
  )
}
```

### Static Table Headers
```tsx
const tableHeaders = (
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
)

function DataTable({ data }) {
  return (
    <table>
      {tableHeaders}  {/* Static, hoisted */}
      <tbody>
        {data.map(row => (  /* Dynamic */
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td><Actions id={row.id} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### What NOT to Hoist

```tsx
// DON'T hoist if it uses props or state
function Card({ title, description }) {
  // Can't hoist - uses props
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

// DON'T hoist if it uses context
function ThemedIcon() {
  const theme = useTheme()
  // Can't hoist - depends on context
  return <Icon color={theme.primary} />
}
```

## Hoisting Checklist

| Element | Hoist? |
|---------|--------|
| Static icons/SVGs | Yes |
| Empty states | Yes |
| Decorative backgrounds | Yes |
| Static headers | Yes |
| Elements with props | No |
| Elements with context | No |
| Elements with state | No |

## Key Points

1. Static JSX can be defined outside components
2. Hoisted elements are created once, reused forever
3. Only hoist truly static content (no props/state/context)
4. Common candidates: icons, empty states, decorations
5. Small optimization but adds up in frequently rendered components
