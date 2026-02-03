# Conditional Rendering

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Rendering expensive components that are hidden wastes resources.

## Solution

Don't render what you don't show.

## Examples

### Bad - Hidden with CSS
```tsx
function Modal({ isOpen, children }) {
  return (
    <div className={isOpen ? 'block' : 'hidden'}>
      <ExpensiveComponent />  {/* Always renders! */}
      {children}
    </div>
  )
}
```

### Good - Conditional Rendering
```tsx
function Modal({ isOpen, children }) {
  if (!isOpen) return null  // Nothing renders

  return (
    <div>
      <ExpensiveComponent />  {/* Only renders when open */}
      {children}
    </div>
  )
}
```

### Good - Short-Circuit Evaluation
```tsx
function Dashboard({ showAnalytics }) {
  return (
    <div>
      <Header />
      {showAnalytics && <Analytics />}  {/* Only when true */}
      <Footer />
    </div>
  )
}
```

### Tabs - Don't Render Inactive
```tsx
// Bad - all tabs render
function Tabs({ activeTab }) {
  return (
    <div>
      <div className={activeTab === 'home' ? 'block' : 'hidden'}>
        <HomeTab />
      </div>
      <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
        <SettingsTab />
      </div>
      <div className={activeTab === 'analytics' ? 'block' : 'hidden'}>
        <AnalyticsTab />  {/* Complex charts render even when hidden */}
      </div>
    </div>
  )
}

// Good - only active tab renders
function Tabs({ activeTab }) {
  return (
    <div>
      {activeTab === 'home' && <HomeTab />}
      {activeTab === 'settings' && <SettingsTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
    </div>
  )
}
```

### When to Keep Mounted

Sometimes you want to keep components mounted:

```tsx
// Keep state when hiding
function Tabs({ activeTab }) {
  return (
    <div>
      {/* Form keeps state when switching tabs */}
      <div style={{ display: activeTab === 'form' ? 'block' : 'none' }}>
        <FormWithState />
      </div>

      {/* Analytics can unmount - no important state */}
      {activeTab === 'analytics' && <Analytics />}
    </div>
  )
}
```

### Lazy Loading with Conditional
```tsx
import dynamic from 'next/dynamic'

const HeavyEditor = dynamic(() => import('./HeavyEditor'))

function Page({ showEditor }) {
  return (
    <div>
      <MainContent />
      {showEditor && <HeavyEditor />}  {/* Loaded only when needed */}
    </div>
  )
}
```

### List Item Visibility
```tsx
function VirtualList({ items }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })

  return (
    <div onScroll={handleScroll}>
      {items.map((item, index) => {
        // Only render visible items
        if (index < visibleRange.start || index > visibleRange.end) {
          return <div key={item.id} style={{ height: 50 }} />  // Placeholder
        }
        return <ListItem key={item.id} item={item} />
      })}
    </div>
  )
}
```

## Decision Guide

| Scenario | Approach |
|----------|----------|
| Modals/dialogs | Conditional render |
| Tabs with complex content | Conditional render |
| Tabs with form state | CSS hide (keep mounted) |
| Dropdowns | Conditional render |
| Long lists | Virtualization |
| Tooltips | Conditional render |

## Key Points

1. Don't render what users can't see
2. Use `&&` or ternary for conditional render
3. CSS hiding still runs component code
4. Keep mounted only when preserving state matters
5. Combine with dynamic imports for heavy components
