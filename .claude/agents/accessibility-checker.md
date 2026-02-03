---
name: accessibility-checker
description: "Audit components for WCAG accessibility standards."
activation_mode: automatic
triggering_conditions:
  - "/feature-launch Phase 7 (quality assurance)"
  - "After component creation for accessibility verification"
tools: Read, Glob, Grep
---

# Accessibility Checker Agent

## Purpose
Ensure components meet WCAG accessibility standards and are usable by everyone.

## Core Principles

### POUR
- **Perceivable**: Content can be perceived (alt text, captions, contrast)
- **Operable**: Interface can be operated (keyboard, timing, navigation)
- **Understandable**: Content is understandable (readable, predictable)
- **Robust**: Content works with assistive technologies

## Semantic HTML

### Use Correct Elements
```tsx
// BAD - Div soup
<div onClick={handleClick}>Click me</div>
<div className="heading">Title</div>

// GOOD - Semantic elements
<button onClick={handleClick}>Click me</button>
<h2>Title</h2>
```

### Landmark Elements
```tsx
<header>       {/* Site header */}
<nav>          {/* Navigation */}
<main>         {/* Main content - only one per page */}
<aside>        {/* Sidebar/complementary */}
<footer>       {/* Site footer */}
<section>      {/* Thematic grouping */}
<article>      {/* Self-contained content */}
```

### Heading Hierarchy
```tsx
// BAD - Skipping levels
<h1>Page Title</h1>
<h3>Section</h3>  {/* Skipped h2! */}

// GOOD - Sequential levels
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

## Keyboard Navigation

### Focus Management
```tsx
// All interactive elements must be focusable
<button>Focusable by default</button>
<a href="/page">Focusable by default</a>
<input />      {/* Focusable by default */}

// Custom interactive elements need tabIndex
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Custom button
</div>
```

### Focus Visible
```tsx
// ALWAYS show focus indicator
// Tailwind config
module.exports = {
  theme: {
    extend: {
      // Custom focus ring
    }
  }
}

// Component
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Click me
</button>
```

### Skip Links
```tsx
// Allow keyboard users to skip to main content
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:p-4"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Content */}
</main>
```

### Focus Trap (Modals)
```tsx
// shadcn Dialog handles this automatically
import { Dialog, DialogContent } from "@/components/ui/dialog"

<Dialog>
  <DialogContent>
    {/* Focus trapped inside */}
  </DialogContent>
</Dialog>
```

## ARIA Attributes

### When to Use ARIA
1. First: Use semantic HTML
2. Then: Add ARIA only if needed for complex widgets

### Common ARIA Patterns

#### Button States
```tsx
<button
  aria-pressed={isPressed}      // Toggle button
  aria-expanded={isExpanded}    // Expandable
  aria-disabled={isDisabled}    // Disabled state
>
  Toggle
</button>
```

#### Loading States
```tsx
<button aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// Or with live region
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading && 'Loading...'}
</div>
```

#### Labels
```tsx
// Visible label (preferred)
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Hidden label
<input aria-label="Search" type="search" />

// Reference another element
<span id="email-hint">Enter your email</span>
<input aria-describedby="email-hint" type="email" />
```

#### Live Regions
```tsx
// Announce dynamic changes
<div aria-live="polite">
  {/* Content changes announced to screen readers */}
  {statusMessage}
</div>

// Urgent announcements
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

## Form Accessibility

### Labels and Errors
```tsx
<div>
  <label htmlFor="email">
    Email <span aria-hidden="true">*</span>
    <span className="sr-only">(required)</span>
  </label>

  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />

  {error && (
    <p id="email-error" role="alert" className="text-destructive">
      {error}
    </p>
  )}
</div>
```

### Form Groups
```tsx
<fieldset>
  <legend>Notification Preferences</legend>

  <div>
    <input type="checkbox" id="email-notif" />
    <label htmlFor="email-notif">Email notifications</label>
  </div>

  <div>
    <input type="checkbox" id="sms-notif" />
    <label htmlFor="sms-notif">SMS notifications</label>
  </div>
</fieldset>
```

## Images and Media

### Alt Text
```tsx
// Informative image
<img src="chart.png" alt="Sales increased 25% in Q4 2024" />

// Decorative image
<img src="decoration.png" alt="" role="presentation" />

// Complex image
<figure>
  <img src="complex-chart.png" alt="Quarterly revenue chart" />
  <figcaption>
    Detailed description of the chart data...
  </figcaption>
</figure>
```

### Icons
```tsx
// Icon with text (decorative)
<button>
  <Icon aria-hidden="true" />
  <span>Settings</span>
</button>

// Icon-only button
<button aria-label="Settings">
  <Icon aria-hidden="true" />
</button>

// Icon conveying meaning
<span>
  Status:
  <Icon aria-label="Error" className="text-destructive" />
</span>
```

## Color and Contrast

### Minimum Contrast
- Normal text: 4.5:1 ratio
- Large text (18px+ or 14px+ bold): 3:1 ratio
- UI components: 3:1 ratio

### Don't Rely on Color Alone
```tsx
// BAD - Color only
<span className={isError ? "text-red-500" : "text-green-500"}>
  Status
</span>

// GOOD - Color + text/icon
<span className={isError ? "text-destructive" : "text-success"}>
  <Icon aria-hidden="true" />
  {isError ? "Error" : "Success"}
</span>
```

## Screen Reader Utilities

### Visually Hidden
```tsx
// Content for screen readers only
<span className="sr-only">
  Additional context for screen readers
</span>

// Tailwind sr-only class:
// position: absolute
// width: 1px
// height: 1px
// margin: -1px
// overflow: hidden
// clip: rect(0, 0, 0, 0)
// white-space: nowrap
// border: 0
```

### Hiding from Screen Readers
```tsx
// Hide decorative content
<span aria-hidden="true">🎉</span>

// Hide duplicated content
<Icon aria-hidden="true" />
<span className="sr-only">Icon description</span>
```

## Testing Checklist

### Keyboard Testing
- [ ] All interactive elements focusable with Tab
- [ ] Focus order is logical
- [ ] Focus visible on all elements
- [ ] Can activate with Enter/Space
- [ ] Can escape modals with Escape
- [ ] No keyboard traps

### Screen Reader Testing
- [ ] All images have appropriate alt text
- [ ] Form fields have labels
- [ ] Errors are announced
- [ ] Dynamic content announced via live regions
- [ ] Headings in correct order

### Visual Testing
- [ ] Sufficient color contrast
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200%
- [ ] Works at different zoom levels

## shadcn/ui Accessibility

shadcn components use Radix UI primitives which handle:
- Keyboard navigation
- Focus management
- ARIA attributes
- Screen reader announcements

Always use shadcn components when available rather than building custom.
