# Lazy State Initialization

**Impact:** MEDIUM
**Category:** Re-render Management

## Problem

Expensive initial state computation runs on every render.

## Solution

Pass a function to useState for lazy initialization.

## Examples

### Bad - Eager Initialization
```tsx
'use client'

function Component() {
  // expensiveComputation() runs on EVERY render
  const [data, setData] = useState(expensiveComputation())

  return <div>{data}</div>
}

function expensiveComputation() {
  console.log('Computing...')  // Logs on every render!
  // Heavy calculation
  return Array(1000).fill(0).map((_, i) => i * 2)
}
```

### Good - Lazy Initialization
```tsx
'use client'

function Component() {
  // Function only called on first render
  const [data, setData] = useState(() => expensiveComputation())

  return <div>{data}</div>
}

function expensiveComputation() {
  console.log('Computing...')  // Logs only once!
  return Array(1000).fill(0).map((_, i) => i * 2)
}
```

### Bad - Reading from Storage on Every Render
```tsx
'use client'

function Component() {
  // localStorage.getItem runs on EVERY render
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('theme') || '{}')
  )

  return <div>Theme: {theme.name}</div>
}
```

### Good - Lazy Storage Read
```tsx
'use client'

function Component() {
  // Only reads localStorage on first render
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return {}
    const stored = localStorage.getItem('theme')
    return stored ? JSON.parse(stored) : {}
  })

  return <div>Theme: {theme.name}</div>
}
```

### Good - Complex Initial State
```tsx
'use client'

function DataGrid({ columns }) {
  const [columnState, setColumnState] = useState(() => {
    // Only computed once
    return columns.map(col => ({
      id: col.id,
      width: col.defaultWidth || 100,
      visible: col.defaultVisible ?? true,
      sortOrder: null,
    }))
  })

  return <Grid columns={columnState} />
}
```

### Good - Initial State from Props
```tsx
'use client'

function Editor({ initialContent }) {
  // Parse initial content only once
  const [content, setContent] = useState(() => {
    return parseMarkdown(initialContent)
  })

  return <RichEditor content={content} onChange={setContent} />
}
```

### useReducer with Lazy Init
```tsx
'use client'

function init(initialCount) {
  // Expensive initialization
  return {
    count: initialCount,
    history: [],
    computedValues: calculateValues(initialCount),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}

function Counter({ initialCount }) {
  // Third argument is lazy initializer
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return <div>{state.count}</div>
}
```

### Multiple Lazy States
```tsx
'use client'

function App() {
  const [user, setUser] = useState(() => loadUserFromStorage())
  const [settings, setSettings] = useState(() => loadSettingsFromStorage())
  const [cache, setCache] = useState(() => initializeCache())

  // All three only run on first render
  return <Dashboard user={user} settings={settings} />
}
```

## When to Use Lazy Initialization

| Scenario | Lazy Init? |
|----------|------------|
| Simple primitive | No |
| localStorage/sessionStorage | Yes |
| Complex object creation | Yes |
| Parsing/transforming props | Yes |
| Array operations (map, filter) | Yes |
| Date calculations | Yes |
| Random/UUID generation | Yes |

## Key Points

1. `useState(value)` - value computed every render
2. `useState(() => value)` - function called once
3. Always use lazy init for localStorage/sessionStorage
4. Use for any non-trivial initial state computation
5. Works with useReducer too (third argument)
