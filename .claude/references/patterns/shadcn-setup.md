# shadcn/ui Setup Reference

## Overview

shadcn/ui is **MANDATORY** for this project. All UI components must use shadcn/ui primitives.

## Installation

### Initial Setup

```bash
# Initialize shadcn/ui (interactive)
npx shadcn@latest init

# Recommended answers:
# - Style: New York
# - Base color: Zinc
# - CSS variables: Yes
```

### Install Core Components

```bash
# Must-have components
npx shadcn@latest add button card input badge

# Common additional components
npx shadcn@latest add dialog dropdown-menu tabs avatar separator
```

## Verification

### Check Installation

```bash
# Verify shadcn is initialized
ls src/components/ui/
# Should see: button.tsx, card.tsx, input.tsx, etc.

# Verify cn() utility exists
cat src/lib/utils.ts
# Should contain:
# import { type ClassValue, clsx } from "clsx"
# import { twMerge } from "tailwind-merge"
# export function cn(...inputs: ClassValue[]) {
#   return twMerge(clsx(inputs))
# }
```

### Check Usage in Codebase

```bash
# Find shadcn imports (should have matches)
grep -r "@/components/ui/button" src/
grep -r "@/components/ui/card" src/

# Find violations (should have NO matches)
# Custom button styling without shadcn:
grep -r 'className=".*px-4.*py-2.*bg-' src/ | grep -v "components/ui"
```

## Usage Patterns

### Buttons - ALWAYS use shadcn Button

```tsx
// WRONG - Custom button styling
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// CORRECT - shadcn Button
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Cards - ALWAYS use shadcn Card

```tsx
// WRONG - Custom card styling
<div className="rounded-lg border bg-white p-6 shadow-sm">
  <h3 className="font-semibold">Title</h3>
  <p className="text-gray-600">Description</p>
</div>

// CORRECT - shadcn Card
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Inputs - ALWAYS use shadcn Input

```tsx
// WRONG - Custom input styling
<input
  className="border rounded px-3 py-2 focus:outline-none focus:ring-2"
  placeholder="Enter text..."
/>

// CORRECT - shadcn Input
import { Input } from "@/components/ui/input"

<Input placeholder="Enter text..." />
```

### Badges - ALWAYS use shadcn Badge

```tsx
// WRONG - Custom badge styling
<span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
  New
</span>

// CORRECT - shadcn Badge
import { Badge } from "@/components/ui/badge"

<Badge variant="default">New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="outline">Coming Soon</Badge>
```

## Custom Styling with shadcn

When you need custom styles, extend shadcn components - don't replace them:

```tsx
// Extend Button with custom colors
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

<Button
  className={cn(
    "bg-[var(--primary)] text-[var(--primary-foreground)]",
    "hover:opacity-90 shadow-[0_0_40px_rgba(56,255,147,0.3)]"
  )}
>
  Custom styled button
</Button>
```

## Common Issues

### "Cannot find module '@/components/ui/button'"

shadcn/ui is not installed. Run:
```bash
npx shadcn@latest init
npx shadcn@latest add button
```

### "cn is not defined"

The utility function is missing. Check `src/lib/utils.ts` exists with:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Components look wrong

Ensure CSS variables are set in `globals.css`:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... more variables */
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... more variables */
  }
}
```

## Checklist Before Building

- [ ] `npx shadcn@latest init` completed
- [ ] `src/components/ui/` folder exists with components
- [ ] `src/lib/utils.ts` has cn() function
- [ ] Required components installed (button, card, input, badge)
- [ ] CSS variables configured in globals.css
