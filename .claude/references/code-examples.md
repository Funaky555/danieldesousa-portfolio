# Code Examples - Next.js Critical Rules

Reference this file when implementing components to see correct patterns.

---

## shadcn/ui Required

NEVER build custom button/card/input - use shadcn components

```tsx
// BAD - Custom button implementation
const MyButton = ({ children, onClick }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
    {children}
  </button>
);

// GOOD - shadcn/ui component
import { Button } from "@/components/ui/button";
<Button variant="default" onClick={onClick}>{children}</Button>
```

---

## Dark Mode Always

Use semantic colors - NEVER hardcode colors

```tsx
// BAD - Hardcoded colors (breaks dark mode)
<div className="bg-white text-black border-gray-200">
<p className="text-gray-600">Content</p>

// GOOD - Semantic colors (works in light/dark)
<div className="bg-background text-foreground border-border">
<p className="text-muted-foreground">Content</p>
```

**Common semantic colors:**
- `bg-background` / `text-foreground` - Main content
- `bg-card` / `text-card-foreground` - Card surfaces
- `bg-muted` / `text-muted-foreground` - Secondary content
- `bg-primary` / `text-primary-foreground` - Primary actions
- `bg-destructive` / `text-destructive-foreground` - Destructive actions
- `border-border` - Borders
- `ring-ring` - Focus rings

---

## Responsive Always

Mobile-first with `md:` and `lg:` breakpoints

```tsx
// BAD - Desktop-first or no responsive
<div className="flex flex-row gap-8">
<div className="w-1/3">

// GOOD - Mobile-first responsive
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
<div className="w-full md:w-1/3">
```

**Breakpoint reference:**
- Base (no prefix): < 768px (mobile)
- `md:`: >= 768px (tablet)
- `lg:`: >= 1024px (desktop)
- `xl:`: >= 1280px (large desktop)

---

## Server Components Default

Only add `'use client'` when needed (useState, useEffect, event handlers)

```tsx
// BAD - Unnecessary 'use client'
'use client';
export default function UserProfile({ user }) {
  return <div>{user.name}</div>; // No client features used!
}

// GOOD - Server component (default)
export default function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

// GOOD - Client component (when needed)
'use client';
export default function Counter() {
  const [count, setCount] = useState(0); // useState requires client
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**When to use 'use client':**
- useState, useReducer, useEffect, useRef
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, document, localStorage)
- Third-party hooks that use client features

---

## TypeScript Typing

Use proper types, never `any`

```tsx
// BAD - any type
const handleSubmit = (data: any) => { ... }
const users: any[] = [];

// GOOD - Proper typing
interface FormData {
  name: string;
  email: string;
}
const handleSubmit = (data: FormData) => { ... }

interface User {
  id: string;
  name: string;
}
const users: User[] = [];
```

---

## Animations with Motion

Use Motion (formerly Framer Motion) for animations. Import from `motion/react`.

```tsx
// BAD - Old import path
import { motion } from "framer-motion";

// GOOD - Current import path (2026)
import { motion, AnimatePresence } from "motion/react";
```

### Basic Enter Animation

```tsx
'use client'
import { motion } from "motion/react"

// GOOD - Fade up on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Scroll-Triggered Animation

```tsx
'use client'
import { motion } from "motion/react"

// GOOD - Fade in when scrolled into view
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  Section content
</motion.section>
```

### Micro-Interactions

```tsx
// GOOD - Button with hover and tap feedback
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
>
  Click me
</motion.button>
```

### Stagger Children

```tsx
'use client'
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// GOOD - Staggered list animation
<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### Exit Animation

```tsx
'use client'
import { motion, AnimatePresence } from "motion/react"

// GOOD - Animate exit when removed from DOM
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### Accessibility - Reduced Motion

```tsx
'use client'
import { motion, useReducedMotion } from "motion/react"

function AnimatedComponent({ children }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

**Animation Rules:**
- Always add `'use client'` for motion components
- Use `whileInView` with `viewport={{ once: true }}` for scroll animations
- Respect `prefers-reduced-motion` with `useReducedMotion`
- Keep durations between 200-600ms for most animations
- Use spring physics for interactive elements (buttons, cards)
- Animate only `transform` and `opacity` for performance

**Reference:** `.claude/references/patterns/animations.md`
