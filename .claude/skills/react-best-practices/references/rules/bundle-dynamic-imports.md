# Dynamic Imports for Heavy Components

**Impact:** CRITICAL
**Category:** Bundle Optimization

## Problem

Heavy libraries bundled with main chunk increase initial load time.

## Solution

Use `next/dynamic` to code-split heavy components.

## Performance Impact

- Monaco Editor: ~300KB → loaded on demand
- Chart libraries: ~200KB → loaded on demand
- Rich text editors: ~150KB → loaded on demand

## Examples

### Bad - Static Import
```tsx
import MonacoEditor from '@monaco-editor/react'  // ~300KB in main bundle

function CodePage() {
  return <MonacoEditor />
}
```

### Good - Dynamic Import
```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-muted" />,
  }
)

function CodePage() {
  return <MonacoEditor />
}
// Monaco loads only when CodePage renders
```

### Chart Library
```tsx
const Chart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
)

// Or entire chart component
const AnalyticsChart = dynamic(
  () => import('@/components/analytics-chart'),
  { ssr: false }
)
```

### Rich Text Editor
```tsx
const RichTextEditor = dynamic(
  () => import('@/components/rich-text-editor'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border rounded-md animate-pulse bg-muted" />
    ),
  }
)
```

### PDF Viewer
```tsx
const PDFViewer = dynamic(
  () => import('@/components/pdf-viewer'),
  {
    ssr: false,
    loading: () => <PDFSkeleton />,
  }
)
```

### Map Component
```tsx
const Map = dynamic(
  () => import('@/components/map'),
  {
    ssr: false,  // Maps need browser APIs
    loading: () => (
      <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
    ),
  }
)
```

### Video Player
```tsx
const VideoPlayer = dynamic(
  () => import('@/components/video-player'),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-muted animate-pulse rounded-lg" />
    ),
  }
)
```

### Named Exports
```tsx
// When library uses named exports
const SpecificChart = dynamic(
  () => import('chart-library').then(mod => mod.BarChart),
  { ssr: false }
)
```

### Multiple Components from One Library
```tsx
const LazyCharts = {
  Line: dynamic(() => import('recharts').then(m => m.LineChart), { ssr: false }),
  Bar: dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false }),
  Pie: dynamic(() => import('recharts').then(m => m.PieChart), { ssr: false }),
}

function Dashboard({ chartType }) {
  const Chart = LazyCharts[chartType]
  return <Chart />
}
```

## When to Use Dynamic Imports

| Component Type | Size | Dynamic? |
|----------------|------|----------|
| Code editors | 200KB+ | Yes |
| Chart libraries | 100KB+ | Yes |
| Rich text editors | 100KB+ | Yes |
| PDF viewers | 200KB+ | Yes |
| Maps | 150KB+ | Yes |
| Video players | 100KB+ | Yes |
| Small components | <20KB | No |

## SSR Considerations

Use `ssr: false` when component:
- Uses browser APIs (window, document)
- Has no meaningful server render
- Causes hydration mismatches

## Key Points

1. Dynamic imports create separate chunks
2. Chunks load only when component renders
3. Use `ssr: false` for client-only components
4. Always provide meaningful loading states
5. Target components >50KB for best impact
