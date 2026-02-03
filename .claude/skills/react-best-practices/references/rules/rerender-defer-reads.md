# Defer State Reads

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Reading state too early triggers unnecessary re-renders.

## Solution

Defer reading state until the moment it's needed.

## Examples

### Bad - Early State Read
```tsx
'use client'

function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' })

  // Reading formData on every render
  const isValid = formData.name.length > 0 && formData.email.includes('@')

  return (
    <div>
      <input
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <button disabled={!isValid}>Submit</button>
    </div>
  )
}
// Entire component re-renders on every keystroke
```

### Good - Compute During Event
```tsx
'use client'

function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = () => {
    // Validate only when needed
    const isValid = formData.name.length > 0 && formData.email.includes('@')
    if (isValid) {
      submitForm(formData)
    }
  }

  return (
    <div>
      <input
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
```

### Good - useDeferredValue for Expensive Reads
```tsx
'use client'

import { useDeferredValue, useMemo } from 'react'

function SearchResults({ query }) {
  // Defer the expensive read
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => filterItems(items, deferredQuery),
    [deferredQuery]
  )

  return <ResultList results={results} />
}
```

### Good - Split Components to Isolate Reads
```tsx
'use client'

// Parent doesn't read count
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ExpensiveComponent />  {/* Doesn't re-render */}
      <Counter count={count} setCount={setCount} />  {/* Re-renders */}
    </div>
  )
}

// Only this component re-renders when count changes
function Counter({ count, setCount }) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  )
}
```

### Good - useRef for Non-Render Data
```tsx
'use client'

function Form() {
  const formRef = useRef({ name: '', email: '' })
  const [, forceRender] = useState(0)

  const handleChange = (field: string, value: string) => {
    formRef.current[field] = value
    // Only re-render when needed (e.g., validation UI)
  }

  const handleSubmit = () => {
    // Read current values
    const data = formRef.current
    if (data.name && data.email) {
      submitForm(data)
    }
  }

  return (
    <div>
      <input
        defaultValue={formRef.current.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
```

## When to Defer

| Scenario | Solution |
|----------|----------|
| Expensive computation | `useDeferredValue` + `useMemo` |
| Data not needed for render | `useRef` |
| Validation on submit | Compute in handler |
| Separate UI concerns | Split into components |

## Key Points

1. Don't read state until you need the value
2. Use `useDeferredValue` for expensive derived values
3. Split components to isolate state reads
4. `useRef` for data not affecting render
5. Move validation to event handlers when possible
