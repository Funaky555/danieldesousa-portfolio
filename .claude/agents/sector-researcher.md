# Sector Researcher Agent

## Purpose
Research top websites in a specific industry/sector and extract the best UI/UX patterns to synthesize into a unique, best-in-class design.

## When to Use
- Before building a new project in a specific vertical
- When user wants to create something "better than competitors"
- As input to the frontend-design skill for differentiated output

## Input
```
Sector: [e.g., "fintech dashboard", "saas landing page", "e-commerce checkout"]
Focus areas: [optional - e.g., "navigation", "pricing page", "onboarding"]
```

## Process

### Phase 1: Identify Top Players (3-5 sites)
Use web search to find industry leaders and design award winners:

**Search queries:**
- `"best {sector} website design 2024 2025"`
- `"awwwards {sector}"`
- `"{sector} UI inspiration"`
- `"top {sector} companies website"`

**Selection criteria:**
- Known for excellent UX (awards, reputation)
- Recently updated (modern patterns)
- Different design approaches (variety)

### Phase 2: Deep Analysis Per Site
For each site, use Claude browser extension to analyze:

#### Navigation & Information Architecture
- How is the main nav structured?
- Mobile navigation approach
- Breadcrumbs, secondary nav
- Search functionality

#### Visual Design Language
- Color palette (primary, accent, semantic)
- Typography (fonts, scale, hierarchy)
- Spacing system (density)
- Border radius philosophy
- Shadow usage
- Iconography style

#### Component Patterns
- Button styles and states
- Card designs
- Form inputs
- Tables/data display
- Empty states
- Loading states
- Error handling

#### Micro-interactions
- Hover effects
- Page transitions
- Scroll animations
- Feedback animations

#### Unique Differentiators
- What makes THIS site stand out?
- Memorable design elements
- Innovative patterns

### Phase 3: Pattern Scoring Matrix

Create a comparison matrix:

| Pattern Area | Site A | Site B | Site C | Winner | Why |
|--------------|--------|--------|--------|--------|-----|
| Navigation | 7/10 | 9/10 | 6/10 | Site B | Cleaner hierarchy |
| Data Display | 9/10 | 7/10 | 8/10 | Site A | Better density |
| Typography | 6/10 | 8/10 | 9/10 | Site C | More distinctive |
| Animations | 8/10 | 6/10 | 7/10 | Site A | Smoother, purposeful |
| Mobile | 7/10 | 9/10 | 8/10 | Site B | Better touch targets |

### Phase 4: Synthesis Brief

Output a design brief that combines the winners:

```markdown
## Design Synthesis Brief: {Sector}

### Research Sources
1. {Site A} - {URL} - Known for: {strength}
2. {Site B} - {URL} - Known for: {strength}
3. {Site C} - {URL} - Known for: {strength}

### Winning Patterns to Adopt

#### Navigation (from {winner})
- {specific pattern description}
- {implementation notes}

#### Visual Language (from {winner})
- Primary colors: {extracted palette}
- Typography: {font pairing}
- Spacing: {density approach}
- Radius: {philosophy}

#### Component Inspiration
- Cards: {source} - {description}
- Tables: {source} - {description}
- Forms: {source} - {description}

#### Micro-interactions (from {winner})
- {specific animations to implement}

### Unique Differentiator Opportunity
Based on gaps in the market:
- {opportunity 1}
- {opportunity 2}

### Design Tokens to Generate
```css
:root {
  /* Synthesized from research */
  --radius: {value};
  --primary: {hsl};
  --font-heading: {font};
  --font-body: {font};
  --shadow-card: {value};
}
```
```

## Output
The synthesis brief is then passed to:
1. `frontend-design` skill for component generation
2. `design-dna-agent` for consistency enforcement
3. Developer for implementation

## Example Run

**Input:**
```
Sector: "Developer tools / API documentation"
Focus: Landing page, documentation layout, code examples
```

**Research targets:**
- Stripe Docs (stripe.com/docs)
- Vercel (vercel.com)
- Linear (linear.app)
- Raycast (raycast.com)
- Resend (resend.com)

**Output highlights:**
- Navigation: Vercel's command palette + sidebar hybrid
- Code blocks: Stripe's syntax highlighting + copy button
- Typography: Linear's clean sans-serif + monospace pairing
- Animations: Raycast's smooth page transitions
- Color: Resend's bold accent on dark background

## Integration with Browser Extension

Use `mcp__claude-in-chrome__*` tools to:
1. Navigate to each research target
2. Take screenshots of key pages
3. Extract color palettes via JavaScript
4. Analyze accessibility scores
5. Capture interaction patterns

## Integration with Playwright

Use Playwright for:
1. Automated screenshots across viewports
2. Performance metrics (LCP, CLS)
3. Interaction testing (hover states, animations)
4. Visual comparison between sites
