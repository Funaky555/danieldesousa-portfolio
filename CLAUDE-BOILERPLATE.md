# CLAUDE.md - Next.js Frontend (App Router + Tailwind + shadcn/ui)

## Critical Rules

- **shadcn/ui required** - Never build custom button/card/input, use shadcn
- **Dark mode always** - Use `bg-background`, `text-foreground`, never `bg-white`
- **Responsive always** - Mobile-first with `md:` and `lg:` breakpoints
- **Server Components default** - Only add `'use client'` when truly needed
- **No any types** - Use proper TypeScript typing
- **Tests required** - Write tests for all new code

## Verify After Changes

```bash
npm run typecheck && npm run lint && npm run build && npm run test
```

## When You Need More Info

| Topic | Read |
|-------|------|
| Code examples | `.claude/references/code-examples.md` |
| All agents | `.claude/AGENTS-INDEX.md` |
| Form patterns | `.claude/references/patterns/forms.md` |
| Data fetching | `.claude/references/patterns/data-fetching.md` |
| **Animation patterns** | `.claude/references/patterns/animations.md` |
| Design differentiation | `.claude/references/design-differentiation.md` |

## Available Commands

- `/build <task>` - Smart router with complexity assessment
- `/new-website <name> "<description>"` - Research sector + build from scratch
- `/modernize-website <name> --from=<url>` - Preserve content, modernize design
- `/clone-website <url>` - Clone single website design
- `/parallel-review` - Run 3 review agents in parallel
- `/parallel-quality` - Run 3 quality agents in parallel
