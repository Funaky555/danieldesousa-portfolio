# Event Handler Refs

**Impact:** LOW
**Category:** Advanced Patterns

## Problem

Event handlers in useEffect dependencies cause unnecessary re-subscriptions.

## Solution

Use refs to always access the latest handler without re-running effects.

## Examples

### Bad - Handler in Dependencies
```tsx
'use client'

function Chat({ onMessage }) {
  useEffect(() => {
    const ws = new WebSocket('wss://chat.example.com')

    ws.onmessage = (event) => {
      onMessage(event.data)  // Uses handler
    }

    return () => ws.close()
  }, [onMessage])  // Re-connects when onMessage changes!
}

// Parent re-renders → new onMessage → WebSocket reconnects!
function Parent() {
  return (
    <Chat
      onMessage={(msg) => console.log(msg)}  // New function each render
    />
  )
}
```

### Good - Ref for Latest Handler
```tsx
'use client'

function Chat({ onMessage }) {
  // Keep latest handler in ref
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage  // Update on every render

  useEffect(() => {
    const ws = new WebSocket('wss://chat.example.com')

    ws.onmessage = (event) => {
      onMessageRef.current(event.data)  // Always calls latest
    }

    return () => ws.close()
  }, [])  // No dependency on handler - never re-runs!
}
```

### Custom Hook: useLatestCallback
```tsx
'use client'

function useLatestCallback<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef(callback)
  ref.current = callback

  return useCallback(
    ((...args) => ref.current(...args)) as T,
    []
  )
}

// Usage
function Chat({ onMessage }) {
  const stableOnMessage = useLatestCallback(onMessage)

  useEffect(() => {
    const ws = new WebSocket('wss://chat.example.com')
    ws.onmessage = (e) => stableOnMessage(e.data)
    return () => ws.close()
  }, [stableOnMessage])  // stableOnMessage never changes
}
```

### Event Listener Pattern
```tsx
'use client'

function useWindowEvent(event: string, handler: (e: Event) => void) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const listener = (e: Event) => handlerRef.current(e)

    window.addEventListener(event, listener)
    return () => window.removeEventListener(event, listener)
  }, [event])  // Only re-subscribe if event type changes
}

// Usage - handler can change freely
function Component({ onScroll }) {
  useWindowEvent('scroll', onScroll)
  // Never re-subscribes even if parent re-renders
}
```

### Interval/Timer Pattern
```tsx
'use client'

function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => callbackRef.current(), delay)
    return () => clearInterval(id)
  }, [delay])  // Only restart if delay changes
}

// Usage
function Counter() {
  const [count, setCount] = useState(0)

  // callback changes every render, but interval doesn't restart
  useInterval(() => {
    setCount(c => c + 1)
    console.log('Current count:', count)  // Always has latest count
  }, 1000)

  return <div>{count}</div>
}
```

### When to Use This Pattern

| Scenario | Use Ref? |
|----------|----------|
| WebSocket/EventSource handlers | Yes |
| setInterval callbacks | Yes |
| Event listener callbacks | Yes |
| Simple onClick handlers | No - just use callback |
| One-time effect | No |

## Key Points

1. Refs let you access latest value without triggering effects
2. Update ref on every render: `ref.current = callback`
3. Effect uses `ref.current` to always get latest
4. Useful for subscriptions, intervals, event listeners
5. Prevents unnecessary re-subscriptions from parent re-renders
