# Content Visibility CSS

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Browser renders all content even if off-screen, slowing initial paint.

## Solution

Use CSS `content-visibility` to skip rendering off-screen content.

## Examples

### Basic Usage
```tsx
function LongPage() {
  return (
    <div>
      <HeroSection />

      {/* Off-screen sections skip rendering until scrolled into view */}
      <section className="content-visibility-auto">
        <FeatureSection />
      </section>

      <section className="content-visibility-auto">
        <TestimonialsSection />
      </section>

      <section className="content-visibility-auto">
        <PricingSection />
      </section>
    </div>
  )
}
```

### Tailwind Plugin or Custom CSS
```css
/* Add to your global CSS */
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px; /* Estimated height */
}
```

### With Estimated Height
```tsx
function Section({ children, estimatedHeight = 500 }) {
  return (
    <section
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `auto ${estimatedHeight}px`,
      }}
    >
      {children}
    </section>
  )
}

function Page() {
  return (
    <div>
      <Section estimatedHeight={400}>
        <FeatureGrid />
      </Section>

      <Section estimatedHeight={800}>
        <TestimonialCarousel />
      </Section>

      <Section estimatedHeight={600}>
        <PricingTable />
      </Section>
    </div>
  )
}
```

### List Items
```tsx
function LongList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: 'auto 80px',
          }}
        >
          <ListItem item={item} />
        </li>
      ))}
    </ul>
  )
}
```

### With contain Property
```tsx
function Card() {
  return (
    <div
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '300px 200px',
        contain: 'layout style paint',  // Additional containment
      }}
    >
      <CardContent />
    </div>
  )
}
```

### Combining with Intersection Observer
```tsx
'use client'

function LazySection({ children }) {
  const { ref, isInView } = useInView({ rootMargin: '200px' })

  return (
    <section
      ref={ref}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 400px',
      }}
    >
      {/* Content visibility handles rendering, IntersectionObserver handles data loading */}
      {isInView && children}
    </section>
  )
}
```

## Browser Support

```tsx
// Feature detection
const supportsContentVisibility = CSS.supports('content-visibility', 'auto')

function Section({ children }) {
  return (
    <section
      style={supportsContentVisibility ? {
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 500px',
      } : undefined}
    >
      {children}
    </section>
  )
}
```

## content-visibility Values

| Value | Effect |
|-------|--------|
| `visible` | Normal rendering (default) |
| `hidden` | Never renders (like display:none but keeps space) |
| `auto` | Renders when near viewport |

## Key Points

1. `content-visibility: auto` skips off-screen rendering
2. `contain-intrinsic-size` provides placeholder dimensions
3. Dramatically improves initial render time for long pages
4. Browser handles rendering as user scrolls
5. No JavaScript needed - pure CSS optimization
