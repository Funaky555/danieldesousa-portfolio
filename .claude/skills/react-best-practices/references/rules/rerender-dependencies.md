# Optimize Hook Dependencies

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Unstable dependencies cause hooks to re-run unnecessarily.

## Solution

Stabilize dependencies with useCallback, useMemo, or restructuring.

## Examples

### Bad - Unstable Object Dependency
```tsx
'use client'

function Component({ userId }) {
  const options = { userId, limit: 10 }  // New object every render!

  useEffect(() => {
    fetchData(options)
  }, [options])  // Runs every render!

  return <div>...</div>
}
```

### Good - Primitive Dependencies
```tsx
'use client'

function Component({ userId }) {
  useEffect(() => {
    const options = { userId, limit: 10 }
    fetchData(options)
  }, [userId])  // Stable primitive

  return <div>...</div>
}
```

### Bad - Unstable Function Dependency
```tsx
'use client'

function Component({ onUpdate }) {
  const handleClick = () => {
    // Do something
    onUpdate()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])  // handleClick is new every render!
}
```

### Good - useCallback for Stable Function
```tsx
'use client'

function Component({ onUpdate }) {
  const handleClick = useCallback(() => {
    // Do something
    onUpdate()
  }, [onUpdate])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])  // Now stable
}
```

### Bad - Inline Array/Object in Dependency
```tsx
'use client'

function Component({ items }) {
  const processedItems = useMemo(() => {
    return items.filter(i => i.active)
  }, [items, { threshold: 10 }])  // Object literal = new every render!
}
```

### Good - Extract Constants
```tsx
'use client'

const OPTIONS = { threshold: 10 }  // Stable reference

function Component({ items }) {
  const processedItems = useMemo(() => {
    return items.filter(i => i.active && i.value > OPTIONS.threshold)
  }, [items])  // Only items in deps
}
```

### Good - useMemo for Complex Objects
```tsx
'use client'

function Component({ config }) {
  const stableConfig = useMemo(() => ({
    ...config,
    processedAt: Date.now(),
  }), [config.id, config.type])  // Only relevant primitives

  useEffect(() => {
    initializeWithConfig(stableConfig)
  }, [stableConfig])
}
```

### Dependency Analysis Pattern
```tsx
'use client'

function Component({ user, settings, onSave }) {
  // Analyze what actually changes
  const userId = user.id  // Primitive - stable
  const settingsJson = JSON.stringify(settings)  // Stable string

  const handleSave = useCallback(() => {
    onSave(user, settings)
  }, [userId, settingsJson, onSave])  // Controlled deps

  useEffect(() => {
    // Setup
  }, [userId])  // Only re-run when user changes
}
```

### useRef for Latest Value
```tsx
'use client'

function Component({ callback }) {
  // Keep latest callback without adding to deps
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const handler = () => callbackRef.current()

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])  // Empty deps - handler uses ref
}
```

## Dependency Checklist

| Type | Stable? | Solution |
|------|---------|----------|
| Primitives (string, number) | Yes | Use directly |
| Objects | No | useMemo or extract primitives |
| Arrays | No | useMemo or extract length/ids |
| Functions | No | useCallback or useRef |
| Constants | Yes | Define outside component |

## Key Points

1. Primitives are stable, objects/arrays/functions are not
2. Extract primitive values from complex objects
3. Use useCallback for function dependencies
4. useMemo for object/array dependencies
5. Define constants outside components
