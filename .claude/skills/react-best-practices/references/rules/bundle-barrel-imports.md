# Avoid Barrel File Imports

**Impact:** CRITICAL
**Category:** Bundle Optimization

## Problem

Barrel files (index.ts that re-exports) can include entire modules in your bundle even when importing one item.

## Solution

Import directly from the source file, not from barrel exports.

## Examples

### Bad - Barrel Import
```tsx
// components/index.ts (barrel file)
export * from './Button'
export * from './Card'
export * from './Modal'
export * from './Table'
// ... 50 more components

// page.tsx
import { Button } from '@/components'
// Might include ALL components in bundle!
```

### Good - Direct Import
```tsx
// page.tsx
import { Button } from '@/components/ui/button'
// Only includes Button
```

### Bad - Library Barrel
```tsx
import { format } from 'date-fns'
// Can include entire date-fns library
```

### Good - Direct Library Import
```tsx
import format from 'date-fns/format'
// Only includes format function
```

### Bad - Icon Library Barrel
```tsx
import { Home, User, Settings } from 'lucide-react'
// May include all icons depending on bundler
```

### Good - Direct Icon Import
```tsx
import Home from 'lucide-react/dist/esm/icons/home'
import User from 'lucide-react/dist/esm/icons/user'
import Settings from 'lucide-react/dist/esm/icons/settings'

// Or use the optimized import (lucide-react handles this well)
import { Home, User, Settings } from 'lucide-react'
// lucide-react is tree-shakeable, but verify with bundle analyzer
```

## When Barrels Are OK

Modern bundlers (webpack 5, turbopack) with proper tree-shaking config can handle some barrel files. But:

1. **Internal barrels**: Often OK with proper sideEffects config
2. **Library barrels**: Varies by library - test with bundle analyzer
3. **When in doubt**: Direct import is always safer

## Verification

Use bundle analyzer to check:

```bash
# Next.js
ANALYZE=true npm run build

# Or
npx @next/bundle-analyzer
```

## shadcn/ui Pattern

shadcn/ui uses direct imports by design:

```tsx
// Correct - direct import
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Not this
import { Button, Card, Input } from "@/components/ui"
```

## Key Points

1. Barrel files can break tree-shaking
2. Direct imports guarantee minimal bundle
3. Library barrels vary - verify with analyzer
4. shadcn/ui pattern is the right approach
