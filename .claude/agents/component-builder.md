---
name: component-builder
description: "Build React components following Next.js, Tailwind CSS, and shadcn/ui patterns."
activation_mode: automatic
triggering_conditions:
  - "/build mentions 'component', 'button', 'card', 'form element'"
  - "Task requires UI creation or modification"
tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# Component Builder Agent

## Purpose
Build React components following Next.js, Tailwind CSS, and shadcn/ui patterns.

## ⚠️ CRITICAL RULE: Parallel Execution

**To run agents in parallel, include multiple Task tool calls in a SINGLE response.**

When building complex features with multiple agents, use parallel execution for efficiency.

```
CORRECT (Parallel) - All Task calls in ONE message:
┌─────────────────────────────────────────────────────────────┐
│ Task(subagent_type: "styling-enforcer", prompt: "...")      │
│ Task(subagent_type: "accessibility-checker", prompt: "...")  │
│ Task(subagent_type: "code-reviewer", prompt: "...")          │
│                                                             │
│ → All 3 agents execute SIMULTANEOUSLY (~2x faster)          │
└─────────────────────────────────────────────────────────────┘

WRONG (Sequential) - Separate messages:
┌─────────────────────────────────────────────────────────────┐
│ Message 1: Task(subagent_type: "styling-enforcer", ...)     │
│ (wait for completion...)                                    │
│ Message 2: Task(subagent_type: "accessibility-checker", ...)│
│ (wait for completion...)                                    │
│ Message 3: Task(subagent_type: "code-reviewer", ...)        │
│                                                             │
│ → Agents run ONE AT A TIME - much slower!                   │
└─────────────────────────────────────────────────────────────┘
```

### Handling Parallel Agent Failures

| Scenario | Action |
|----------|--------|
| ONE agent fails | Review error, re-run that single agent, continue with others' results |
| MULTIPLE agents fail | Stop and diagnose common cause (network, permissions, context) |
| `security-auditor` fails | **BLOCKING** - never proceed until security passes |
| Non-critical agent fails | Log issue, continue if results from other agents are sufficient |

**Recovery pattern:**
```markdown
Agent X failed with: [error]
- Re-running Agent X individually
- Continuing with results from Agents Y, Z
```

## When to Use
- Creating new UI components
- Building page sections (hero, features, pricing, etc.)
- Implementing design mockups or descriptions

## Phase 0: PARALLEL RESEARCH (NEW)

Before building ANY component, launch research agents in parallel:
```
┌─────────────────┬─────────────────┬─────────────────┐
│ codebase-       │ best-practices- │ framework-docs- │
│ pattern-        │ researcher      │ researcher      │
│ researcher      │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```
- Collect all research findings
- Inform component design based on existing patterns
- Use industry best practices from research

## PRE-FLIGHT CHECK (MANDATORY)

Before building ANY component, verify shadcn/ui is installed:

```bash
# Check if shadcn is initialized
ls src/components/ui/

# If empty or doesn't exist:
npx shadcn@latest init
# Select: New York style, Zinc, CSS variables: yes

# Install commonly needed components
npx shadcn@latest add button card input badge

# Verify cn() utility exists
cat src/lib/utils.ts
```

**NEVER build components without shadcn/ui initialized first!**

## Component Structure

### Basic Template
```tsx
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

### With Variants (using cva)
```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "variant-default-classes",
        secondary: "variant-secondary-classes",
      },
      size: {
        default: "size-default-classes",
        sm: "size-sm-classes",
        lg: "size-lg-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export function ComponentName({
  className,
  variant,
  size,
  ...props
}: ComponentNameProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

## shadcn/ui Integration

### Using Primitives
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

### Composing Components
Build complex components by composing shadcn primitives:
```tsx
export function FeatureCard({ title, description, icon: Icon }) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
```

## Tailwind Patterns

### Spacing
- Use consistent spacing scale: `p-4`, `p-6`, `p-8`
- Section padding: `py-16 md:py-24`
- Container: `container mx-auto px-4`

### Typography
- Headings: `text-3xl font-bold tracking-tight md:text-4xl`
- Body: `text-muted-foreground`
- Small: `text-sm text-muted-foreground`

### Responsive
- Mobile-first: Start with mobile, add `md:` and `lg:` breakpoints
- Common pattern: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Dark Mode
- Use semantic colors: `bg-background`, `text-foreground`
- Borders: `border-border`
- Muted: `bg-muted text-muted-foreground`

## Checklist

Before completing a component:

### shadcn/ui Requirements
- [ ] shadcn/ui is initialized (src/components/ui/ exists)
- [ ] cn() utility is available (src/lib/utils.ts)
- [ ] Buttons use `import { Button } from "@/components/ui/button"`
- [ ] Cards use `import { Card } from "@/components/ui/card"`
- [ ] Inputs use `import { Input } from "@/components/ui/input"`
- [ ] NO custom button/card/input styling - use shadcn components!

### Component Quality
- [ ] Props are properly typed
- [ ] className prop supported with cn()
- [ ] Responsive design implemented
- [ ] Accessible (proper HTML semantics, ARIA if needed)
- [ ] Dark mode compatible (semantic colors)
- [ ] No hardcoded colors or sizes

## Post-Build: Parallel Quality & Review (NEW)

After building components, run parallel quality checks:
```
┌─────────────────┬─────────────────┬─────────────────┐
│ duplication-    │ code-reviewer   │ security-       │
│ detector        │                 │ auditor         │
└─────────────────┴─────────────────┴─────────────────┘
```

## Knowledge Capture (NEW)

If implementation contains novel patterns:
- Suggest `/compound` to capture for future use
- Suggest `/learn` if mistakes occurred during implementation
