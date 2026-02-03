# SVG Animation Patterns

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Animating SVG elements directly causes expensive re-renders.

## Solution

Wrap SVG animations to isolate re-renders.

## Examples

### Bad - Animating in Parent
```tsx
'use client'

function Icon() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 1)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <ExpensiveSidebar />  {/* Re-renders every 16ms! */}
      <svg style={{ transform: `rotate(${rotation}deg)` }}>
        <circle cx="50" cy="50" r="40" />
      </svg>
    </div>
  )
}
```

### Good - Isolated Animation Component
```tsx
'use client'

const AnimatedSVG = memo(function AnimatedSVG() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 1)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg style={{ transform: `rotate(${rotation}deg)` }}>
      <circle cx="50" cy="50" r="40" />
    </svg>
  )
})

function Icon() {
  return (
    <div>
      <ExpensiveSidebar />  {/* Doesn't re-render */}
      <AnimatedSVG />  {/* Only this re-renders */}
    </div>
  )
}
```

### Better - CSS Animations
```tsx
// Use CSS for smooth animations without React re-renders
function SpinnerIcon() {
  return (
    <svg className="animate-spin" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

// In Tailwind config or CSS
// .animate-spin { animation: spin 1s linear infinite; }
// @keyframes spin { to { transform: rotate(360deg); } }
```

### Good - requestAnimationFrame with Ref
```tsx
'use client'

function AnimatedSVG() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let rotation = 0
    let animationId: number

    const animate = () => {
      rotation += 1
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${rotation}deg)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // No state = no re-renders
  return (
    <svg ref={svgRef}>
      <circle cx="50" cy="50" r="40" />
    </svg>
  )
}
```

### Complex Path Animation
```tsx
'use client'

function AnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    // Animate with CSS transition
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 2s ease-in-out'
      path.style.strokeDashoffset = '0'
    })
  }, [])

  return (
    <svg viewBox="0 0 100 100">
      <path
        ref={pathRef}
        d="M10,50 Q50,10 90,50 T90,90"
        fill="none"
        stroke="currentColor"
      />
    </svg>
  )
}
```

### Framer Motion for Complex Animations
```tsx
'use client'

import { motion } from 'framer-motion'

function AnimatedLogo() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="50" cy="50" r="40" />
    </motion.svg>
  )
}
```

## Animation Method Comparison

| Method | Re-renders? | Best For |
|--------|-------------|----------|
| CSS animations | No | Simple loops |
| CSS transitions | No | State changes |
| Ref + rAF | No | Complex JS control |
| React state | Yes | Interactive animations |
| Framer Motion | Minimal | Complex sequences |

## Key Points

1. Prefer CSS animations over React state
2. Isolate animated components with memo
3. Use refs for direct DOM manipulation
4. requestAnimationFrame for smooth 60fps
5. Framer Motion handles optimization for you
