# Activity Monitoring

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Components continue processing even when not visible or active.

## Solution

Monitor activity state and pause unnecessary work.

## Examples

### Pause When Tab Hidden
```tsx
'use client'

import { useState, useEffect } from 'react'

function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

function RealTimeChart() {
  const isVisible = usePageVisibility()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!isVisible) return  // Don't poll when hidden

    const interval = setInterval(() => {
      fetchLatestData().then(setData)
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible])

  return <Chart data={data} />
}
```

### Pause Animations When Hidden
```tsx
'use client'

function AnimatedComponent() {
  const isVisible = usePageVisibility()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let animationId: number
    const animate = () => {
      setFrame(f => f + 1)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isVisible])

  return <div style={{ transform: `rotate(${frame}deg)` }} />
}
```

### Intersection Observer for Viewport
```tsx
'use client'

import { useRef, useState, useEffect } from 'react'

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

function LazyVideo() {
  const { ref, isInView } = useInView({ threshold: 0.5 })

  return (
    <div ref={ref}>
      {isInView ? <Video autoPlay /> : <VideoPoster />}
    </div>
  )
}
```

### Combined Activity Hook
```tsx
'use client'

function useIsActive() {
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [isWindowFocused, setIsWindowFocused] = useState(true)

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === 'visible')
    const handleFocus = () => setIsWindowFocused(true)
    const handleBlur = () => setIsWindowFocused(false)

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return isTabVisible && isWindowFocused
}
```

### Pause SWR Polling
```tsx
'use client'

import useSWR from 'swr'

function Dashboard() {
  const isVisible = usePageVisibility()

  const { data } = useSWR('/api/stats', fetcher, {
    refreshInterval: isVisible ? 5000 : 0,  // Pause when hidden
  })

  return <Stats data={data} />
}
```

## What to Pause

| Feature | Pause When Hidden? |
|---------|-------------------|
| API polling | Yes |
| Animations | Yes |
| Video playback | Yes |
| Timers | Usually |
| WebSocket messages | Maybe (keep connection) |
| Static content | No |

## Key Points

1. Use `visibilitychange` to detect tab visibility
2. Use IntersectionObserver for viewport visibility
3. Pause polling, animations, videos when hidden
4. Reduces CPU/battery usage for background tabs
5. Resume instantly when visible again
