# Batch DOM/CSS Operations

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Multiple DOM reads/writes cause layout thrashing.

## Solution

Batch reads together, then batch writes together.

## Examples

### Bad - Interleaved Read/Write
```tsx
// Each read triggers layout recalculation
elements.forEach(el => {
  const height = el.offsetHeight  // Read - triggers layout
  el.style.height = `${height * 2}px`  // Write - invalidates layout
  // Next iteration: read triggers recalculation again
})
```

### Good - Batched Operations
```tsx
// Read all first
const heights = elements.map(el => el.offsetHeight)

// Write all after
elements.forEach((el, i) => {
  el.style.height = `${heights[i] * 2}px`
})
```

### Good - requestAnimationFrame for Writes
```tsx
'use client'

function resizeElements(elements: HTMLElement[]) {
  // Read phase
  const measurements = elements.map(el => ({
    width: el.offsetWidth,
    height: el.offsetHeight,
  }))

  // Write phase - batched in next frame
  requestAnimationFrame(() => {
    elements.forEach((el, i) => {
      el.style.width = `${measurements[i].width * 1.5}px`
      el.style.height = `${measurements[i].height * 1.5}px`
    })
  })
}
```

### CSS Class Toggle (Better)
```tsx
// Bad - multiple style changes
element.style.width = '100px'
element.style.height = '100px'
element.style.backgroundColor = 'red'
element.style.border = '1px solid black'

// Good - single class toggle
element.classList.add('active-state')

// CSS
// .active-state { width: 100px; height: 100px; background: red; border: 1px solid black; }
```

### DocumentFragment for Multiple Inserts
```tsx
// Bad - multiple DOM insertions
items.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item.name
  list.appendChild(li)  // Triggers reflow each time
})

// Good - batch with fragment
const fragment = document.createDocumentFragment()
items.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item.name
  fragment.appendChild(li)  // No reflow
})
list.appendChild(fragment)  // Single reflow
```

### React Approach - Minimize Direct DOM
```tsx
'use client'

// In React, prefer state-driven updates
function List({ items }) {
  // React batches DOM updates automatically
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

### When Direct DOM is Needed
```tsx
'use client'

function MeasureAndPosition() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]

    // Read phase
    const widths = children.map(child => child.offsetWidth)
    const totalWidth = widths.reduce((a, b) => a + b, 0)

    // Write phase
    container.style.width = `${totalWidth}px`
    let offset = 0
    children.forEach((child, i) => {
      child.style.left = `${offset}px`
      offset += widths[i]
    })
  }, [])

  return <div ref={containerRef}>...</div>
}
```

## Layout-Triggering Properties

Reading these forces layout:

| Property | Type |
|----------|------|
| offsetTop/Left/Width/Height | Read |
| clientTop/Left/Width/Height | Read |
| scrollTop/Left/Width/Height | Read |
| getComputedStyle() | Read |
| getBoundingClientRect() | Read |

## Key Points

1. Batch reads, then batch writes
2. Use CSS classes instead of inline styles
3. Use DocumentFragment for multiple inserts
4. Let React handle DOM updates when possible
5. Use `useLayoutEffect` for measure-then-position patterns
