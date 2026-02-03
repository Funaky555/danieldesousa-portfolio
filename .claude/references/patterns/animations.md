# Animation Patterns Reference (Motion 2026)

Comprehensive animation patterns using Motion (formerly Framer Motion) for Next.js applications.

## Quick Reference

| Animation Type | Method | Use Case |
|----------------|--------|----------|
| Enter/Exit | `initial`/`animate`/`exit` | Components mounting/unmounting |
| Scroll Trigger | `whileInView` | Sections fading in on scroll |
| Scroll-Linked | `useScroll` + `useTransform` | Parallax, progress bars |
| Layout Change | `layout` prop | List reordering, expanding |
| Shared Element | `layoutId` | Card→Modal, tab indicators |
| Hover/Tap | `whileHover`/`whileTap` | Micro-interactions |
| Stagger | Variants + `staggerChildren` | Sequential list animations |
| Imperative | `useAnimate` | Complex sequences, timelines |
| Physics | `useSpring` | Smooth cursor following |

---

## Installation & Setup

```bash
npm install motion
```

```tsx
// Import from motion/react (NOT framer-motion)
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  LayoutGroup,
  stagger
} from "motion/react"
```

---

## 1. Scroll-Driven Animations

### Progress Bar (Page Scroll)
```tsx
'use client'
import { motion, useScroll } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Section Fade-In (whileInView)
```tsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content appears on scroll
</motion.section>
```

### Parallax Hero
```tsx
'use client'
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function ParallaxHero({ children, backgroundImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y: backgroundY
        }}
      />

      {/* Content fades and moves up */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full"
        style={{ y: textY, opacity }}
      >
        {children}
      </motion.div>
    </section>
  )
}
```

### Horizontal Scroll Progress per Section
```tsx
'use client'
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function ScrollRevealCard({ children, direction = "left" }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-100, 0] : [100, 0]
  )
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <motion.div ref={ref} style={{ x, opacity }}>
      {children}
    </motion.div>
  )
}
```

---

## 2. Layout Animations

### Smooth Expand/Collapse
```tsx
'use client'
import { motion } from "motion/react"
import { useState } from "react"

export function ExpandableCard({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="bg-card rounded-lg p-4 cursor-pointer overflow-hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.h3 layout="position">{title}</motion.h3>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
```

### Animated List with Filtering
```tsx
'use client'
import { motion, AnimatePresence } from "motion/react"

export function FilterableList({ items, filter }) {
  const filteredItems = items.filter(item =>
    filter === "all" || item.category === filter
  )

  return (
    <motion.ul layout className="grid grid-cols-3 gap-4">
      <AnimatePresence>
        {filteredItems.map(item => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {item.name}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
```

### Tab Indicator (layoutId)
```tsx
'use client'
import { motion } from "motion/react"

export function AnimatedTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="relative px-4 py-2 text-sm font-medium transition-colors"
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-background rounded-md shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
```

### Card to Modal (Shared Element)
```tsx
'use client'
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

export function CardGallery({ items }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {/* Grid of cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <motion.article
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelected(item)}
            className="bg-card rounded-xl overflow-hidden cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <motion.img
              layoutId={`image-${item.id}`}
              src={item.image}
              alt={item.title}
              className="w-full aspect-video object-cover"
            />
            <motion.div layoutId={`content-${item.id}`} className="p-4">
              <motion.h3 layoutId={`title-${item.id}`} className="font-semibold">
                {item.title}
              </motion.h3>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.article
                layoutId={`card-${selected.id}`}
                className="bg-card rounded-xl overflow-hidden max-w-2xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <motion.img
                  layoutId={`image-${selected.id}`}
                  src={selected.image}
                  alt={selected.title}
                  className="w-full aspect-video object-cover"
                />
                <motion.div layoutId={`content-${selected.id}`} className="p-6">
                  <motion.h3 layoutId={`title-${selected.id}`} className="text-2xl font-bold">
                    {selected.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-muted-foreground"
                  >
                    {selected.description}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setSelected(null)}
                    className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.article>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## 3. Micro-Interactions

### Button Press Effect
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
>
  Click Me
</motion.button>
```

### Card Hover with Shadow
```tsx
<motion.div
  whileHover={{
    y: -8,
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-card rounded-xl p-6"
>
  Hoverable card
</motion.div>
```

### Icon Button Rotation
```tsx
<motion.button
  whileHover={{ rotate: 90 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <PlusIcon />
</motion.button>
```

### Link Underline Animation
```tsx
function AnimatedLink({ href, children }) {
  return (
    <a href={href} className="relative inline-block group">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </a>
  )
}
```

---

## 4. Stagger Patterns

### Feature Grid Stagger
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export function FeatureGrid({ features }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {features.map(feature => (
        <motion.div
          key={feature.id}
          variants={itemVariants}
          className="bg-card rounded-xl p-6"
        >
          <feature.icon className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-muted-foreground mt-2">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Navigation Menu Stagger
```tsx
const menuVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
}

const menuItemVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 }
}

export function MobileMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 bg-background z-50 p-8"
        >
          {items.map(item => (
            <motion.a
              key={item.href}
              href={item.href}
              variants={menuItemVariants}
              className="block py-4 text-2xl font-medium"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

---

## 5. Hero Section Patterns

### Fade Up Hero
```tsx
export function FadeUpHero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Build Something Amazing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-xl text-muted-foreground"
        >
          The modern way to create beautiful web experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </motion.div>
      </div>
    </section>
  )
}
```

### Split Hero with Image
```tsx
export function SplitHero({ image }) {
  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-8 items-center px-4">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Your Headline Here
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Supporting description text
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button size="lg">Get Started</Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img src={image} alt="" className="rounded-2xl shadow-2xl" />
      </motion.div>
    </section>
  )
}
```

---

## 6. Page Transitions

### Basic Page Transition
```tsx
// components/page-transition.tsx
'use client'
import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
```

### Slide Page Transition
```tsx
const pageVariants = {
  initial: { opacity: 0, x: "-100%" },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100%" }
}

export function SlidePageTransition({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## 7. Utility Animations

### Animated Counter
```tsx
'use client'
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect } from "react"

export function AnimatedCounter({ value, duration = 2 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [value, duration, count])

  return <motion.span>{rounded}</motion.span>
}

// Usage: <AnimatedCounter value={1000} />
```

### Animated Background Gradient
```tsx
export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/2 -right-1/2 w-full h-full
          bg-gradient-to-br from-primary/20 to-secondary/20
          rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-1/2 -left-1/2 w-full h-full
          bg-gradient-to-tr from-accent/20 to-primary/20
          rounded-full blur-3xl"
      />
    </div>
  )
}
```

### Smooth Cursor Follower
```tsx
'use client'
import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect } from "react"

export function CursorFollower() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 28 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed w-6 h-6 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%"
      }}
    />
  )
}
```

---

## 8. Accessibility

### Respect Reduced Motion
```tsx
import { useReducedMotion } from "motion/react"

export function AccessibleAnimation({ children }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Accessible Animation Wrapper
```tsx
'use client'
import { motion, useReducedMotion } from "motion/react"

export function A11yMotion({
  children,
  initial,
  animate,
  transition,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

---

## Performance Tips

1. **Animate only transform & opacity** - GPU accelerated
2. **Use `layout` for size/position** - Motion handles FLIP
3. **Add `layout` to children** - Prevents distortion
4. **Lazy load animations** - Use `dynamic()` for non-critical
5. **Use `once: true`** - For scroll animations that shouldn't repeat
6. **Avoid will-change abuse** - Only when animation is imminent
7. **Test on mobile** - Touch interactions differ from hover

---

## Related Files

- `lib/animations/presets.ts` - Reusable animation variants
- `.claude/agents/animation-builder.md` - Full agent documentation
