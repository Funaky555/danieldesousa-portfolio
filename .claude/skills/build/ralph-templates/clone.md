# Ralph Template: Website Clone

## Usage

```
/ralph-loop "Clone [WEBSITE_URL] homepage" --completion-promise "CLONE COMPLETE" --max-iterations 15
```

## Template Prompt

```markdown
## Task: Clone [TARGET_URL]

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)
- Goal: Pixel-perfect recreation of target site's design

### Clone Workflow

#### Step 1: Capture Target
- Screenshot the target website
- Note the major sections (header, hero, features, etc.)
- Identify colors, typography, spacing

#### Step 2: Build Incrementally
Work section by section:
1. Header/Navigation
2. Hero Section
3. Feature Sections (one at a time)
4. Footer

#### Step 3: Compare & Refine
After each section:
- Compare with target
- Note differences
- Fix issues
- Move to next section

### Current Section: [SECTION_NAME]

### Section Objectives
1. Match layout structure
2. Match colors and typography
3. Match spacing and sizing
4. Match responsive behavior

### Previous Progress
[What has been completed]

### This Iteration
1. Screenshot target section (if browser available)
2. Review current implementation
3. Identify biggest difference
4. Fix that difference
5. Verify improvement

### Visual Comparison Checklist
- [ ] Layout matches
- [ ] Colors match
- [ ] Typography matches (font, size, weight)
- [ ] Spacing matches (padding, margins, gaps)
- [ ] Responsive matches (mobile, tablet, desktop)

### Section Completion Criteria
- [ ] Layout structure correct
- [ ] Colors within tolerance
- [ ] Typography close match
- [ ] Spacing appropriate
- [ ] Looks right at all breakpoints

### When Current Section is Complete
Move to next section. When all sections done, proceed to Design Polish.

### Design Polish Phase (MANDATORY)
Before signaling completion, run `/frontend-design` to:
- Enhance visual quality beyond basic clone
- Ensure distinctive, production-grade aesthetics
- Avoid generic AI-generated look
- Add subtle refinements that elevate the design

After design polish is complete:
<promise>CLONE COMPLETE</promise>

### Guidelines
- Use semantic colors (bg-background, text-foreground)
- Use shadcn components where possible
- Don't obsess over pixel-perfection, aim for 90%+ match
- Focus on structure and feel over exact replication
```

## Example: Stripe Clone

```markdown
## Task: Clone stripe.com homepage

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)

### Sections to Clone
1. Navigation Header
2. Hero Section (gradient background, headline, CTAs, dashboard preview)
3. Features Grid
4. Product Showcase
5. Testimonials/Logos
6. Footer

### Current Section: Hero Section

### Section Objectives
1. Gradient mesh background
2. Large headline with gradient text
3. Two CTA buttons
4. Dashboard mockup image
5. Animated elements (subtle)

### Previous Progress
- Navigation Header COMPLETE: Logo, nav links, sign in/dashboard buttons

### This Iteration
1. Review Stripe's hero section
2. Check current hero implementation
3. Focus on: background gradient
4. Implement mesh gradient effect
5. Verify it matches target feel

### Visual Comparison Notes
Target:
- Purple/blue gradient mesh background
- White headline text, some words gradient
- "Start now" primary button, "Contact sales" secondary
- Dashboard tilted with shadow

Current:
- Solid background (needs gradient)
- Headline in place
- Buttons in place
- Dashboard image missing

### This Iteration Focus
Add gradient mesh background using Tailwind gradients.

### Completion Criteria for Hero
- [ ] Gradient background implemented
- [ ] Headline with gradient text
- [ ] Both buttons styled correctly
- [ ] Dashboard mockup positioned
- [ ] Responsive on all sizes
```

## Iteration Progress Tracking

```markdown
### Clone Progress

| Section | Status | Notes |
|---------|--------|-------|
| Navigation | ✅ Complete | Matches well |
| Hero | 🔄 In Progress | Background done, need dashboard |
| Features | ⏳ Pending | |
| Products | ⏳ Pending | |
| Testimonials | ⏳ Pending | |
| Footer | ⏳ Pending | |

### Current Iteration: 5
### Section: Hero
### Focus: Dashboard mockup positioning
```

## Completion

```markdown
### Clone Complete

All sections implemented:
- Navigation: ✅
- Hero: ✅
- Features: ✅
- Products: ✅
- Testimonials: ✅
- Footer: ✅

Quality Checks:
- TypeScript: ✅
- Lint: ✅
- Build: ✅
- Responsive: ✅

Match Quality: ~90% visual similarity

<promise>CLONE COMPLETE</promise>
```
