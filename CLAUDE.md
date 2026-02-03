# CLAUDE.md - Daniel de Sousa Portfolio Website

## Project Overview
Professional portfolio website for Daniel de Sousa, UEFA B Football Coach with 10+ years experience in Portugal and China.

## Critical Rules (from FE-NEXTJS boilerplate)

- **shadcn/ui required** - Never build custom button/card/input, use shadcn
- **Dark mode always** - Use `bg-background`, `text-foreground`, never `bg-white`
- **Responsive always** - Mobile-first with `md:` and `lg:` breakpoints
- **Server Components default** - Only add `'use client'` when truly needed
- **No any types** - Use proper TypeScript typing

## Hosting & Deployment

**Primary Hosting:** Vercel
**Version Control:** GitHub
**Repository:** danieldesousa-portfolio

All code and websites for this project should be hosted on Vercel + GitHub.

## Verify After Changes

```bash
npm run typecheck && npm run lint && npm run build
```

## Design System

### Color Palette (Vibrant Football/AI Theme)
- **Football Green**: `#00D66C` - Primary actions, CTAs
- **AI Blue**: `#0066FF` - Links, interactive elements
- **Tech Purple**: `#8B5CF6` - Accents, highlights
- **Energy Orange**: `#FF6B35` - Warning, emphasis

### Typography
- **Headings**: Inter/Poppins (bold, modern)
- **Body**: Inter (clean, readable)

### Component Style
- Glass-morphism effects
- Vibrant gradients with hover animations
- Subtle glows (AI theme)
- Smooth scroll animations

## Content Structure

See implementation plan at: `~/.claude/plans/zesty-exploring-dragonfly.md`

Key pages:
- Home (Hero, About Preview, Services Preview)
- About (Timeline, Education, Skills)
- Philosophy (Tactical Systems, Coaching Approach)
- Experience (Career Timeline, China Highlight)
- Services (Offerings, Pricing)
- Contact (Form, Contact Info)

## AI Features

1. **Chatbot Widget** - Formal, professional tone
2. **Interactive Tactical Board** - Formation visualizer (4-3-3, 4-4-2, 4-2-3-1)

## SEO Keywords

**Portuguese**: treino de futebol, exercícios de futebol, exercicios sub 13, sub 15, principios futebol, sistema tatico, analise de jogo

**English**: football coaching drills, scouting, tactical analyst
