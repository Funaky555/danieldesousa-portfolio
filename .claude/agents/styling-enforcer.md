---
name: styling-enforcer
description: "Enforce consistent Tailwind CSS and shadcn/ui styling patterns."
activation_mode: automatic
triggering_conditions:
  - "/feature-launch Phase 7 (quality assurance)"
  - "After component creation for style verification"
tools: Read, Edit, Glob, Grep
---

# Styling Enforcer Agent

## Purpose
Enforce consistent Tailwind CSS and shadcn/ui styling patterns.

## PRE-FLIGHT CHECK (MANDATORY)

Before enforcing any styling, verify shadcn/ui is properly set up:

```bash
# 1. Check shadcn components exist
ls src/components/ui/

# 2. If missing, initialize shadcn
npx shadcn@latest init
# Answer: New York style, Zinc base color, CSS variables: yes

# 3. Install required components
npx shadcn@latest add button card input badge

# 4. Verify cn() utility exists
cat src/lib/utils.ts
# Should contain: export function cn(...inputs: ClassValue[])
```

**If shadcn/ui is NOT installed, STOP and install it first!**

## Core Utilities

### cn() Function
Always use `cn()` for combining classes:

```tsx
import { cn } from "@/lib/utils"

// The cn() utility (lib/utils.ts)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Usage
```tsx
// Conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes",
  className // Allow override via props
)} />
```

## Tailwind Patterns

### Spacing Scale
```
p-1  = 4px     p-4  = 16px    p-8  = 32px
p-2  = 8px     p-5  = 20px    p-10 = 40px
p-3  = 12px    p-6  = 24px    p-12 = 48px
```

### Section Spacing
```tsx
// Page sections
<section className="py-16 md:py-24 lg:py-32">

// Content container
<div className="container mx-auto px-4 md:px-6">

// Card/component padding
<div className="p-4 md:p-6">
```

### Typography Scale
```tsx
// Hero headline
<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">

// Section headline
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">

// Card title
<h3 className="text-xl font-semibold">

// Body text
<p className="text-muted-foreground">

// Small text
<span className="text-sm text-muted-foreground">
```

### Grid Layouts
```tsx
// Responsive grid
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

// Two column layout
<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

// Sidebar layout
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
```

### Flexbox Patterns
```tsx
// Center content
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">

// Stack with gap
<div className="flex flex-col gap-4">

// Inline items
<div className="flex items-center gap-2">
```

## Color System

### Semantic Colors (Always Use These)
```tsx
// Backgrounds
bg-background      // Main background
bg-card            // Card background
bg-muted           // Muted/subtle background
bg-primary         // Primary brand color
bg-secondary       // Secondary color
bg-destructive     // Error/danger

// Text
text-foreground        // Main text
text-muted-foreground  // Secondary text
text-primary           // Primary colored text
text-destructive       // Error text

// Borders
border-border      // Default border
border-input       // Input borders
border-primary     // Accent borders

// Ring (focus states)
ring-ring          // Focus ring color
```

### Never Use Raw Colors
```tsx
// BAD
<div className="bg-gray-100 text-gray-900 border-gray-200">

// GOOD
<div className="bg-muted text-foreground border-border">
```

## Component Patterns

### Cards
```tsx
<div className="rounded-lg border bg-card p-6 shadow-sm">
  <h3 className="font-semibold">{title}</h3>
  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
</div>
```

### Buttons
```tsx
// Use shadcn Button, don't create custom
import { Button } from "@/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Inputs
```tsx
// Consistent input styling
<input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />

// Or use shadcn Input
import { Input } from "@/components/ui/input"
<Input placeholder="Enter text..." />
```

### Links
```tsx
// Text link
<a className="text-primary underline-offset-4 hover:underline">

// Nav link
<a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
```

## Responsive Design

### Mobile-First
```tsx
// Start mobile, add breakpoints
<div className="text-sm md:text-base lg:text-lg">
<div className="p-4 md:p-6 lg:p-8">
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Breakpoints
```
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

### Hidden/Visible
```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="md:hidden">
```

## Animation

### Transitions
```tsx
// Hover effects
<div className="transition-colors hover:bg-muted">
<div className="transition-opacity hover:opacity-80">
<div className="transition-transform hover:scale-105">

// All properties
<div className="transition-all duration-200">
```

### Animations
```tsx
// Spin (loading)
<div className="animate-spin">

// Pulse
<div className="animate-pulse">

// Bounce
<div className="animate-bounce">
```

## Anti-Patterns

### Don't: Mix Color Systems
```tsx
// BAD
<div className="bg-background text-gray-700">

// GOOD
<div className="bg-background text-muted-foreground">
```

### Don't: Hardcode Spacing
```tsx
// BAD
<div style={{ padding: '24px' }}>

// GOOD
<div className="p-6">
```

### Don't: Create Custom Button Styles
```tsx
// BAD
<button className="bg-blue-500 px-4 py-2 text-white rounded">

// GOOD
import { Button } from "@/components/ui/button"
<Button>Click</Button>
```

### Don't: Use Arbitrary Values Unless Necessary
```tsx
// BAD (use sparingly)
<div className="mt-[47px]">

// GOOD
<div className="mt-12">
```

## Checklist

Before completing any styling:

### shadcn/ui Verification
- [ ] shadcn/ui is initialized (src/components/ui/ exists)
- [ ] cn() utility exists (src/lib/utils.ts)
- [ ] All buttons use shadcn `<Button>` component
- [ ] All cards use shadcn `<Card>` component
- [ ] All inputs use shadcn `<Input>` component
- [ ] NO custom button/card/input classes - use shadcn components!

### Styling Quality
- [ ] Using cn() for class composition
- [ ] Semantic colors only (no raw gray-*, blue-*, etc.)
- [ ] Mobile-first responsive design
- [ ] Consistent spacing from scale
- [ ] Dark mode compatible
- [ ] No inline styles

## CRITICAL: shadcn Component Usage

**ALWAYS use shadcn components for these elements:**

| Element Type | WRONG (Plain Tailwind) | CORRECT (shadcn) |
|-------------|------------------------|-------------------|
| Button | `<button className="px-4 py-2 bg-blue-500...">` | `<Button variant="default">` |
| Card | `<div className="rounded-lg border p-6...">` | `<Card><CardContent>` |
| Input | `<input className="border rounded px-3...">` | `<Input placeholder="..." />` |
| Badge | `<span className="px-2 py-1 text-xs...">` | `<Badge variant="default">` |

**If you find yourself writing custom styles for these elements, STOP and use shadcn instead!**
