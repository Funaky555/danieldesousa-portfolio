---
name: import-fixer
description: "Fixes import organization and removes unused imports."
type: leaf
activation_mode: manual
triggering_conditions:
  - "/parallel-quality Phase"
  - "Import organization issues detected"
  - "Unused imports in codebase"
tools: Read, Edit, Glob, Grep
---

# Import Fixer Agent

## Purpose

Analyze and fix import statements across the Next.js codebase to ensure consistency, remove unused imports, and organize imports according to project conventions.

## When to Use

- After significant code changes
- When linting shows import issues
- During code review
- As part of `/parallel-quality` workflow

## Import Order Convention

```typescript
// 1. React (always first)
import { useState, useEffect } from "react";

// 2. Next.js
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// 3. External packages
import { z } from "zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

// 4. Internal aliases (@/)
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

// 5. Internal types (separate)
import type { User } from "@/types/user";
import type { Post } from "@/types/post";

// 6. Relative imports (if any - avoid when possible)
import { helper } from "./helper";
```

## Rules

### DO

1. **Use path aliases** - Always `@/` instead of relative paths across boundaries
2. **Separate type imports** - Use `import type` for type-only imports
3. **Group imports** - Follow the order convention above
4. **Remove unused imports** - Clean up after refactoring
5. **Keep React first** - React imports always at the top

### DON'T

1. **Don't mix default and named imports unnecessarily**
2. **Don't import internal modules with relative paths** - Use `@/`
3. **Don't import from barrel files when tree-shaking matters**
4. **Don't import server-only code in client components**

## Common Fixes

### Fix: Unused Imports

```typescript
// Before
import { useState, useEffect, useMemo } from "react"; // useMemo unused
import { Button, Card, Input } from "@/components/ui"; // Card unused

// After
import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
```

### Fix: Wrong Import Order

```typescript
// Before
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";

// After
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
```

### Fix: Type Imports

```typescript
// Before
import { User, UserService } from "@/types/user";

// After (if User is type-only)
import type { User } from "@/types/user";
import { UserService } from "@/services/user";
```

### Fix: Relative Path

```typescript
// Before (in app/dashboard/page.tsx)
import { formatDate } from "../../lib/utils";

// After
import { formatDate } from "@/lib/utils";
```

### Fix: Server/Client Boundary

```typescript
// Before (in client component)
import { db } from "@/lib/db"; // Server-only!

// After - move to server action or API route
// Client component should call server action instead
```

## Next.js Specific Rules

### Server Components
```typescript
// Server components can import server-only modules
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { cookies } from "next/headers";
```

### Client Components
```typescript
"use client";

// Client components - NO server imports
import { useState } from "react";
import { useRouter } from "next/navigation"; // NOT next/router
```

### Metadata
```typescript
// In layout.tsx or page.tsx (server component)
import type { Metadata } from "next";

export const metadata: Metadata = { ... };
```

## Process

1. **Scan** - Find all TypeScript/TSX files
2. **Analyze** - Check each file for:
   - Unused imports
   - Wrong import order
   - Missing type imports
   - Relative path violations
   - Server/client boundary violations
3. **Fix** - Apply corrections
4. **Verify** - Run `npm run lint` to confirm

## Commands

```bash
# Check for import issues
npm run lint

# Auto-fix some import issues
npm run lint -- --fix

# TypeScript check (catches unused imports with strict mode)
npm run typecheck
```

## Output Format

```markdown
## Import Fixer Results

### Files Modified

| File | Issues Fixed |
|------|--------------|
| app/dashboard/page.tsx | Removed 2 unused imports |
| components/header.tsx | Fixed import order |
| hooks/use-auth.ts | Changed to type import |

### Summary
- Files scanned: 85
- Files modified: 8
- Issues fixed: 12
```

## Related

- Next.js App Router conventions
- TypeScript strict mode settings
- ESLint import plugin configuration
