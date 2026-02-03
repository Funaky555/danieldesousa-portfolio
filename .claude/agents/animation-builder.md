---
name: animation-builder
description: "Implement animations using Motion (formerly Framer Motion) and CSS transitions. Covers scroll animations, layout animations, micro-interactions, and page transitions."
activation_mode: automatic
triggering_conditions:
  - "/build mentions 'animation', 'motion', 'transition', 'fade', 'scroll', 'parallax', 'hover', 'micro-interaction'"
  - "Task requires interactive visual effects"
  - "Hero section, landing page, or marketing site"
  - "List reordering, card expansion, shared element transitions"
tools: Read, Write, Edit, Glob, Grep
---

# Animation Builder Agent (Motion 2026)

## Purpose
Implement smooth, performant animations using Motion (formerly Framer Motion) for modern web experiences. This agent covers scroll-driven animations, layout animations, micro-interactions, and complex orchestrated sequences.

## When to Use
- Hero section animations
- Page transitions
- Scroll-triggered fade/slide animations
- Parallax effects
- Component enter/exit animations
- Micro-interactions (hover, tap, focus)
- List reordering with smooth transitions
- Shared element transitions (card → modal)
- Complex orchestrated animation sequences
- Website cloning (modern sites heavily use motion)

## Setup (2026)

```bash
npm install motion
```

```tsx
// NEW import path (not framer-motion)
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimate,
  useMotionValue,
  LayoutGroup
} from "motion/react"
```

---

## Core Animation Types

### 1. Basic Enter Animation
```tsx
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Content
</motion.div>
```

### 2. Exit Animation (AnimatePresence)
```tsx
import { AnimatePresence, motion } from "motion/react"

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-card rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### 3. AnimatePresence Modes
```tsx
// "sync" (default) - animations happen simultaneously
// "wait" - exit completes before enter starts
// "popLayout" - exiting element pops out of layout flow

<AnimatePresence mode="wait">
  <motion.div key={currentTab}>
    {/* Tab content */}
  </motion.div>
</AnimatePresence>
```

---

## Scroll Animations

### Scroll Progress Bar
```tsx
import { motion, useScroll } from "motion/react"

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Scroll-Triggered (whileInView)
```tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  This fades in when scrolled into view
</motion.section>
```

### useInView Hook (for complex logic)
```tsx
import { motion, useInView } from "motion/react"
import { useRef } from "react"

function FadeInSection({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### Parallax Effect (useScroll + useTransform)
```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ y, scale }}
      />
      <motion.div className="relative z-10" style={{ opacity }}>
        <h1>Hero Title</h1>
      </motion.div>
    </section>
  )
}
```

### Element Scroll Progress
```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

function ScrollRevealCard() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // track through viewport
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.3], [-100, 0])

  return (
    <motion.div ref={ref} style={{ opacity, x }}>
      Card content
    </motion.div>
  )
}
```

---

## Layout Animations

### Basic Layout Animation
```tsx
// Any layout change is automatically animated
<motion.div layout className="p-4">
  {isExpanded ? "Expanded content here" : "Collapsed"}
</motion.div>
```

### List Reordering
```tsx
function ReorderableList({ items }) {
  return (
    <motion.ul layout>
      {items.map(item => (
        <motion.li
          key={item.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Shared Element Transitions (layoutId)
```tsx
// Tab indicator that smoothly moves between tabs
function TabBar({ tabs, activeTab, onSelect }) {
  return (
    <div className="flex gap-2 relative">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className="relative px-4 py-2"
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

### Card to Modal Expansion
```tsx
function Gallery({ items }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelected(item)}
            className="cursor-pointer"
          >
            <motion.img layoutId={`image-${item.id}`} src={item.image} />
            <motion.h3 layoutId={`title-${item.id}`}>{item.title}</motion.h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              className="bg-card rounded-lg p-6 max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              <motion.img layoutId={`image-${selected.id}`} src={selected.image} />
              <motion.h3 layoutId={`title-${selected.id}`}>{selected.title}</motion.h3>
              <p>{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### LayoutGroup (for multiple components)
```tsx
import { LayoutGroup } from "motion/react"

// Namespace layoutIds to avoid conflicts
function App() {
  return (
    <>
      <LayoutGroup id="sidebar">
        <TabBar tabs={sidebarTabs} />
      </LayoutGroup>

      <LayoutGroup id="main">
        <TabBar tabs={mainTabs} />
      </LayoutGroup>
    </>
  )
}
```

---

## Stagger Animations

### Variants with Stagger
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function FeatureGrid({ features }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-3 gap-6"
    >
      {features.map((feature) => (
        <motion.div key={feature.id} variants={item}>
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Advanced Stagger with stagger()
```tsx
import { useAnimate, stagger } from "motion/react"

function AnimatedList() {
  const [scope, animate] = useAnimate()

  const handleAnimate = () => {
    // Stagger from center
    animate("li", { opacity: 1, y: 0 }, { delay: stagger(0.1, { from: "center" }) })

    // Stagger from last (reverse)
    animate("li", { opacity: 1 }, { delay: stagger(0.05, { from: "last" }) })

    // Stagger with start delay
    animate("li", { opacity: 1 }, { delay: stagger(0.1, { startDelay: 0.5 }) })
  }

  return <ul ref={scope}>{/* items */}</ul>
}
```

---

## Micro-Interactions

### Hover & Tap
```tsx
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
>
  Click me
</motion.button>
```

### Interactive Card
```tsx
function InteractiveCard({ children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-card rounded-xl p-6 cursor-pointer"
    >
      {children}
    </motion.div>
  )
}
```

### Focus States
```tsx
<motion.input
  whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
  transition={{ duration: 0.2 }}
  className="px-4 py-2 border rounded-lg"
/>
```

---

## Imperative Control (useAnimate)

### Basic useAnimate
```tsx
import { useAnimate } from "motion/react"

function AnimatedButton() {
  const [scope, animate] = useAnimate()

  const handleClick = async () => {
    // Sequence of animations
    await animate(scope.current, { scale: 0.95 }, { duration: 0.1 })
    await animate(scope.current, { scale: 1 }, { type: "spring", stiffness: 500 })
  }

  return (
    <button ref={scope} onClick={handleClick}>
      Click me
    </button>
  )
}
```

### Complex Timeline
```tsx
function HeroAnimation() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const runAnimation = async () => {
      // Parallel animations
      await animate([
        [".hero-title", { opacity: 1, y: 0 }, { duration: 0.6 }],
        [".hero-subtitle", { opacity: 1, y: 0 }, { duration: 0.6, delay: 0.2 }],
        [".hero-cta", { opacity: 1, scale: 1 }, { duration: 0.4, delay: 0.4 }],
      ])
    }
    runAnimation()
  }, [animate])

  return (
    <div ref={scope}>
      <h1 className="hero-title" style={{ opacity: 0, transform: "translateY(30px)" }}>
        Welcome
      </h1>
      <p className="hero-subtitle" style={{ opacity: 0, transform: "translateY(30px)" }}>
        Subtitle here
      </p>
      <button className="hero-cta" style={{ opacity: 0, transform: "scale(0.9)" }}>
        Get Started
      </button>
    </div>
  )
}
```

---

## useSpring (Physics-Based Values)

```tsx
import { motion, useSpring, useMotionValue } from "motion/react"

function SmoothCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const handleMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    />
  )
}
```

---

## Page Transitions (Next.js App Router)

### With AnimatePresence
```tsx
// components/page-transition.tsx
'use client'

import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### View Transitions (Experimental - Next.js 15+)
```js
// next.config.js
module.exports = {
  experimental: {
    viewTransition: true,
  },
}
```

```tsx
// Use React's ViewTransition (when stable)
import { unstable_ViewTransition as ViewTransition } from "react"

function Page() {
  return (
    <ViewTransition>
      <div>Page content</div>
    </ViewTransition>
  )
}
```

---

## Animation Presets Library

Reference: `lib/animations/presets.ts`

```tsx
// Common animation variants - import and spread
import { fadeUp, fadeIn, scaleIn, slideInLeft, staggerContainer } from "@/lib/animations/presets"

<motion.div {...fadeUp}>Content</motion.div>
<motion.div variants={staggerContainer} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={fadeUp.item}>{item.name}</motion.div>
  ))}
</motion.div>
```

---

## Performance Best Practices

### 1. Animate transform & opacity only
```tsx
// GOOD - GPU accelerated
animate={{ x: 100, opacity: 1, scale: 1.1, rotate: 45 }}

// AVOID - triggers layout
animate={{ width: 200, height: 100, left: 50 }}
```

### 2. Use layout prop for size/position changes
```tsx
// Let Motion handle the FLIP animation
<motion.div layout>{dynamicContent}</motion.div>
```

### 3. Respect reduced motion
```tsx
import { useReducedMotion } from "motion/react"

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

### 4. Lazy load Motion for non-critical animations
```tsx
import dynamic from "next/dynamic"

const AnimatedSection = dynamic(
  () => import("@/components/animated-section"),
  { ssr: false }
)
```

### 5. Use will-change sparingly
```tsx
// Only when you KNOW animation is coming
<motion.div style={{ willChange: "transform" }} whileHover={{ scale: 1.1 }}>
```

---

## Decision Matrix

| Need | Solution | When |
|------|----------|------|
| Enter/exit | `initial`/`animate`/`exit` + `AnimatePresence` | Mount/unmount |
| Scroll trigger | `whileInView` or `useInView` | Fade-in sections |
| Scroll-linked | `useScroll` + `useTransform` | Parallax, progress |
| Hover/tap | `whileHover`/`whileTap` | Micro-interactions |
| List reorder | `layout` prop | Filtering, sorting |
| Shared elements | `layoutId` | Card→modal, tabs |
| Complex sequence | `useAnimate` | Multi-step orchestration |
| Physics values | `useSpring` | Smooth following |
| Page transitions | `AnimatePresence` + pathname | Route changes |

---

## Checklist

Before completing animations:
- [ ] Animations serve a purpose (guide user, provide feedback)
- [ ] Duration is appropriate (200-500ms for most, 600-800ms for dramatic)
- [ ] Easing feels natural (easeOut for enters, easeIn for exits)
- [ ] Respects `prefers-reduced-motion`
- [ ] Uses transform/opacity (GPU accelerated)
- [ ] Works on mobile devices (test touch interactions)
- [ ] Exit animations included where needed
- [ ] Stagger timing feels natural (0.05-0.15s between items)
- [ ] Layout animations have `layout` on children too
- [ ] No animation conflicts (check layoutId uniqueness)

---

## Dynamic Generation

This agent generates animation code **on-demand** based on project needs. Instead of copying static templates, analyze the synthesis brief and create only what's needed:

### When Invoked, Generate:

1. **Analyze requirements** from synthesis brief:
   - What animation types are needed? (scroll, layout, micro, page transitions)
   - What components need animations? (hero, cards, lists, modals)

2. **Create `lib/animations.ts`** with only needed presets:
   ```tsx
   // Only include what the project actually uses
   export const fadeUp = { ... }
   export const staggerContainer = { ... }
   // etc.
   ```

3. **Add animations directly to components** when simple:
   - For one-off animations, add directly to the component
   - For reused patterns, create shared presets in `lib/animations.ts`

### Example Output Structure

```
lib/
  animations.ts    # Shared presets (only if multiple components use same animation)
components/
  hero.tsx         # Animations inline or imported from lib/animations
  feature-grid.tsx # Uses stagger from lib/animations
```

---

## Related Files

- `.claude/references/patterns/animations.md` - Full pattern reference with copy-paste examples
