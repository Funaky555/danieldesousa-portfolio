# Event Listener Management

**Impact:** MEDIUM-HIGH
**Category:** Client-Side Performance

## Problem

Memory leaks from unremoved event listeners, performance issues from too many listeners.

## Solution

Properly manage event listener lifecycle and use delegation.

## Examples

### Bad - Leaking Listeners
```tsx
'use client'

function Component() {
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    // Missing cleanup! Listener persists after unmount
  }, [])

  const handleResize = () => {
    console.log('resized')
  }

  return <div>Content</div>
}
```

### Good - Cleanup in useEffect
```tsx
'use client'

function Component() {
  useEffect(() => {
    const handleResize = () => {
      console.log('resized')
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function removes listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div>Content</div>
}
```

### Good - Stable Handler Reference
```tsx
'use client'

import { useCallback, useEffect } from 'react'

function Component({ onResize }) {
  const handleResize = useCallback(() => {
    onResize(window.innerWidth)
  }, [onResize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return <div>Content</div>
}
```

### Bad - Too Many Listeners
```tsx
'use client'

function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          onClick={() => handleClick(item.id)}  // 1000 listeners!
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

### Good - Event Delegation
```tsx
'use client'

function List({ items }) {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const itemId = target.closest('li')?.dataset.id
    if (itemId) {
      console.log('clicked', itemId)
    }
  }

  return (
    <ul onClick={handleClick}>  {/* Single listener */}
      {items.map(item => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

### Passive Event Listeners
```tsx
'use client'

useEffect(() => {
  const handleScroll = () => {
    // Scroll handling
  }

  // Passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])
```

### Throttle/Debounce Expensive Handlers
```tsx
'use client'

import { useEffect, useMemo } from 'react'
import { throttle } from 'lodash-es'

function Component() {
  const handleScroll = useMemo(
    () => throttle(() => {
      // Expensive operation
      console.log('scroll position:', window.scrollY)
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()  // Cancel pending throttled calls
    }
  }, [handleScroll])

  return <div>Content</div>
}
```

### AbortController for Multiple Listeners
```tsx
'use client'

useEffect(() => {
  const controller = new AbortController()

  window.addEventListener('resize', handleResize, { signal: controller.signal })
  window.addEventListener('scroll', handleScroll, { signal: controller.signal })
  document.addEventListener('keydown', handleKey, { signal: controller.signal })

  // Single abort removes all listeners
  return () => controller.abort()
}, [])
```

## Event Listener Checklist

- [ ] Always return cleanup function from useEffect
- [ ] Use event delegation for lists
- [ ] Use `passive: true` for scroll/touch events
- [ ] Throttle/debounce expensive handlers
- [ ] Use stable function references (useCallback)
- [ ] Consider AbortController for multiple listeners

## Key Points

1. Always clean up listeners in useEffect return
2. Event delegation: one listener instead of many
3. Passive listeners improve scroll performance
4. Throttle/debounce for performance
5. AbortController simplifies cleanup of multiple listeners
