# Research Clone Workflow

## Overview
Instead of cloning a single website, research top competitors in a sector and synthesize the best UI/UX patterns into a unique, best-in-class design.

## Command
```
/research-clone <sector> [focus-areas]
```

## Examples
```
/research-clone "fintech dashboard"
/research-clone "saas pricing page" --focus="pricing cards, FAQ, testimonials"
/research-clone "developer tools landing" --focus="hero, features, code examples"
/research-clone "e-commerce product page" --focus="gallery, reviews, add-to-cart"
```

## Workflow Phases

### Phase 1: Discovery (Web Search)
```
Search for top websites in {sector}:
- "best {sector} website design 2024 2025"
- "awwwards {sector}"
- "{sector} UI inspiration dribbble behance"
- "top {sector} startups website"

Select 3-5 diverse, high-quality sites.
```

### Phase 2: Deep Dive (Browser Extension)
For each selected site, use Claude browser extension:

```
1. Navigate to the site
2. Take full-page screenshot
3. Analyze with read_page tool:
   - Navigation structure
   - Color usage
   - Typography
   - Component patterns
   - Unique elements

4. Extract design tokens via JavaScript:
   - getComputedStyle for colors
   - Font families in use
   - Spacing patterns
   - Border radius values

5. Record key interactions (gif_creator)
```

### Phase 3: Analysis Matrix
Create comparison scoring:

| Aspect | Site 1 | Site 2 | Site 3 | Best | Notes |
|--------|--------|--------|--------|------|-------|
| Hero section | | | | | |
| Navigation | | | | | |
| Typography | | | | | |
| Color system | | | | | |
| Animations | | | | | |
| Mobile UX | | | | | |
| {focus-area} | | | | | |

### Phase 4: Synthesis Brief
Combine winning patterns into a design specification:

```markdown
## Synthesis: {Sector} - Best-of-Breed Design

### Sources Analyzed
1. {Site} - Strength: {what they do best}
2. {Site} - Strength: {what they do best}
3. {Site} - Strength: {what they do best}

### Adopted Patterns
- Hero: Inspired by {site} - {why}
- Navigation: Inspired by {site} - {why}
- Cards: Inspired by {site} - {why}
- Typography: Inspired by {site} - {why}
- Animations: Inspired by {site} - {why}

### Design Tokens
{Generated CSS variables}

### Unique Differentiator
{Gap identified in market + our approach}
```

### Phase 5: Generation (frontend-design)
Pass synthesis brief to frontend-design skill:

```
Generate components based on synthesis brief:
- Must incorporate winning patterns
- Must include unique differentiator
- Must NOT be a direct copy of any single source
- Must feel cohesive (single design language)
```

### Phase 6: Visual Lock (Playwright)
Create visual regression baselines:

```typescript
// Lock in the synthesized design
test('synthesized design baseline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('synthesis-baseline.png');
});
```

## Output Artifacts

1. **research-report.md** - Full analysis with screenshots
2. **synthesis-brief.md** - Design specification
3. **design-tokens.css** - Extracted/synthesized CSS variables
4. **components/** - Generated React components
5. **visual-baselines/** - Playwright screenshots

## Integration Points

### With Browser Extension
```
tabs_context_mcp → tabs_create_mcp → navigate → read_page → screenshot
                                                         → javascript_tool (extract styles)
                                                         → gif_creator (capture interactions)
```

### With Playwright
```bash
# Install
npm install -D @playwright/test

# Config for visual testing
npx playwright test --update-snapshots  # Create baselines
npx playwright test                      # Compare against baselines
```

### With frontend-design Skill
The synthesis brief becomes the input prompt:
```
Based on this synthesis brief, generate:
1. Hero section (inspired by {winner})
2. Navigation (inspired by {winner})
3. Feature cards (inspired by {winner})
...
```

## Best Practices

1. **Diversity in sources** - Don't pick 5 similar sites
2. **Focus on patterns, not pixels** - Extract concepts, not exact copies
3. **Identify gaps** - What are ALL competitors missing?
4. **Mobile-first analysis** - Test mobile versions too
5. **Accessibility check** - Note which sites have better a11y
6. **Performance awareness** - Heavy animations? Slow loads?

## Example: SaaS Landing Page Research

**Sector:** SaaS Landing Page
**Focus:** Hero, Features, Pricing, Social Proof

**Sites researched:**
1. Linear.app - Minimal, bold typography, smooth animations
2. Vercel.com - Technical credibility, dark mode, gradient accents
3. Notion.so - Playful, illustrations, product screenshots
4. Stripe.com - Professional, detailed, trust signals
5. Raycast.com - Developer-focused, keyboard hints, clean

**Synthesis:**
- Hero: Vercel's gradient + Linear's typography
- Features: Stripe's detailed cards + Raycast's icons
- Pricing: Linear's simplicity + Stripe's comparison table
- Social Proof: Notion's logo wall + Vercel's testimonial cards
- Animations: Linear's scroll reveals + Raycast's hover states
- Differentiator: Interactive demo in hero (gap in market)
