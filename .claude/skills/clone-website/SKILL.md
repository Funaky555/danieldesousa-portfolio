---
name: clone-website
description: "Clone a website's design. Captures visual style and recreates with Tailwind CSS."
invocable_by: user
tools:
  - Read
  - Write
  - Edit
  - Bash
  - TodoWrite
  - WebFetch
---

# Clone Website Skill

## Overview

This skill enables cloning any website's UI design using Next.js, Tailwind CSS, and shadcn/ui. It uses agent-browser for visual analysis and works best with Ralph Loop for iterative refinement.

## Invocation

Triggered automatically by `/build` when clone intent is detected, or manually:

```
/build clone [website-url]
/build clone stripe.com homepage
/build make it look like linear.app
/build replicate vercel.com landing page
```

## MANDATORY Workflow

**CRITICAL**: Always follow this workflow in order. Do NOT skip steps.

```
┌─────────────────────────────────────────────────────────┐
│  STEP 0: ENSURE SHADCN/UI IS INSTALLED                  │
│                                                         │
│  Check if shadcn is initialized:                        │
│    ls src/components/ui/                                │
│                                                         │
│  If NOT installed or ui/ folder doesn't exist:          │
│    npx shadcn@latest init                               │
│    # Select: New York style, Zinc, CSS variables: yes   │
│                                                         │
│  Install core components:                               │
│    npx shadcn@latest add button card input              │
│                                                         │
│  Verify cn() utility exists:                            │
│    cat src/lib/utils.ts                                 │
│                                                         │
│  NEVER skip this step! All components must use shadcn.  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 1: CHECK AGENT-BROWSER                            │
│                                                         │
│  Run: which agent-browser                               │
│                                                         │
│  If NOT installed:                                      │
│    npm install -g agent-browser                         │
│    agent-browser install                                │
│                                                         │
│  If still fails → Go to FALLBACK workflow               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 2: CAPTURE TARGET VISUALLY                        │
│                                                         │
│  # Open the target URL                                  │
│  agent-browser open [URL]                               │
│                                                         │
│  # Take full page screenshot                            │
│  agent-browser screenshot --full target.png             │
│                                                         │
│  # Get page structure with element refs                 │
│  agent-browser snapshot -c                              │
│                                                         │
│  # READ the screenshot to see actual design             │
│  Use Read tool on target.png                            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 3: EXTRACT DESIGN TOKENS                          │
│                                                         │
│  # Extract colors from page                             │
│  agent-browser eval "                                   │
│    const colors = new Set();                            │
│    document.querySelectorAll('*').forEach(el => {       │
│      const s = getComputedStyle(el);                    │
│      if (s.backgroundColor !== 'rgba(0, 0, 0, 0)')      │
│        colors.add(s.backgroundColor);                   │
│      if (s.color) colors.add(s.color);                  │
│    });                                                  │
│    JSON.stringify([...colors]);                         │
│  "                                                      │
│                                                         │
│  # Extract fonts                                        │
│  agent-browser eval "                                   │
│    const fonts = new Set();                             │
│    document.querySelectorAll('*').forEach(el => {       │
│      const f = getComputedStyle(el).fontFamily;         │
│      fonts.add(f.split(',')[0].replace(/[\"']/g,''));   │
│    });                                                  │
│    JSON.stringify([...fonts]);                          │
│  "                                                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 4: ANALYZE & PLAN                                 │
│                                                         │
│  From screenshot + snapshot, identify:                  │
│  - Navigation structure                                 │
│  - Hero layout and content                              │
│  - All sections in order                                │
│  - Color scheme (primary, background, text)             │
│  - Typography (headings, body)                          │
│  - Special elements (animations, gradients, etc.)       │
│                                                         │
│  Create TodoWrite with section-by-section plan          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 5: BUILD SECTION BY SECTION (WITH SHADCN)         │
│                                                         │
│  For each section:                                      │
│  1. Reference the screenshot for visual accuracy        │
│  2. Use snapshot data for content/structure             │
│  3. Use shadcn components as base (Button, Card, etc.)  │
│  4. Use cn() for all conditional classes                │
│  5. Use semantic colors (bg-background, text-foreground)│
│  6. Extend shadcn variants instead of custom styles     │
│  7. Mark todo as complete                               │
│  8. Move to next section                                │
│                                                         │
│  COMPONENT CHECKLIST:                                   │
│  - [ ] Uses shadcn Button for all buttons               │
│  - [ ] Uses shadcn Card for card-like elements          │
│  - [ ] Uses shadcn Input for form inputs                │
│  - [ ] Uses cn() utility for class composition          │
│  - [ ] No raw Tailwind buttons/cards (use shadcn!)      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 6: VISUAL COMPARISON                              │
│                                                         │
│  # Screenshot local build                               │
│  agent-browser open http://localhost:3000               │
│  agent-browser screenshot --full current.png            │
│                                                         │
│  # Compare target.png vs current.png                    │
│  # Identify differences and fix                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 7: QUALITY GATES                                  │
│                                                         │
│  npm run typecheck                                      │
│  npm run lint                                           │
│  npm run build                                          │
└─────────────────────────────────────────────────────────┘
```

## FALLBACK Workflow (No Browser Automation)

If agent-browser is unavailable or fails:

```
┌─────────────────────────────────────────────────────────┐
│  FALLBACK STEP 1: ASK USER FOR SCREENSHOTS              │
│                                                         │
│  Use AskUserQuestion tool:                              │
│  "I need screenshots of the target website to clone it  │
│   accurately. Can you provide:                          │
│   1. Full page screenshot (desktop)                     │
│   2. Mobile screenshot (optional)                       │
│   3. Any specific sections you want to focus on"        │
│                                                         │
│  DO NOT proceed without visual reference!               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  FALLBACK STEP 2: USE WEBFETCH FOR STRUCTURE            │
│                                                         │
│  WebFetch can provide:                                  │
│  - Text content                                         │
│  - Basic HTML structure                                 │
│  - Link structure                                       │
│                                                         │
│  WARNING: WebFetch does NOT show:                       │
│  - Visual design/layout                                 │
│  - Colors, typography                                   │
│  - Dynamic content (SPAs)                               │
│  - Animations/interactions                              │
│                                                         │
│  NEVER rely on WebFetch alone for visual cloning!       │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  FALLBACK STEP 3: BUILD WITH USER FEEDBACK              │
│                                                         │
│  Build initial version based on screenshots             │
│  Ask user to compare and provide feedback               │
│  Iterate until match                                    │
└─────────────────────────────────────────────────────────┘
```

## Agent-Browser Quick Reference

```bash
# Setup (one-time)
npm install -g agent-browser
agent-browser install

# Capture workflow
agent-browser open https://target.com
agent-browser screenshot --full target.png
agent-browser snapshot -c

# Extract design tokens
agent-browser eval "JSON.stringify({
  colors: [...new Set([...document.querySelectorAll('*')].flatMap(el => {
    const s = getComputedStyle(el);
    return [s.backgroundColor, s.color].filter(c => c !== 'rgba(0, 0, 0, 0)');
  }))],
  fonts: [...new Set([...document.querySelectorAll('*')].map(el =>
    getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/[\"']/g, '')
  ).filter(Boolean))]
})"

# Multi-viewport screenshots
agent-browser set viewport 390 844 && agent-browser screenshot mobile.png
agent-browser set viewport 768 1024 && agent-browser screenshot tablet.png
agent-browser set viewport 1440 900 && agent-browser screenshot desktop.png
```

## Section Breakdown

### Common Website Sections

| Section | Elements to Clone |
|---------|-------------------|
| **Navigation** | Logo, links, CTAs, mobile menu |
| **Hero** | Headline, subheadline, CTAs, imagery |
| **Features** | Grid/list of features with icons |
| **Social Proof** | Logos, testimonials, stats |
| **Product** | Screenshots, demos, showcases |
| **Pricing** | Pricing cards, comparison tables |
| **CTA** | Call-to-action banners |
| **Footer** | Links, newsletter, social, legal |

### Priority Order

1. **Structure First**: Get the layout right
2. **Content Second**: Add text and images
3. **Style Third**: Match colors and typography
4. **Polish Last**: Spacing, animations, details

## Design Extraction Guide

### From Screenshot Analysis

When you READ the screenshot, look for:

1. **Layout**
   - Is it centered or full-width?
   - Grid structure (1, 2, 3, 4 columns?)
   - Section heights and padding

2. **Colors**
   - Background color (usually dark #0a0a0a or light #ffffff)
   - Primary accent color (buttons, links, highlights)
   - Text colors (heading vs body vs muted)

3. **Typography**
   - Heading sizes relative to body
   - Font weights (bold headings, regular body)
   - Line heights and letter spacing

4. **Special Elements**
   - Gradients or glow effects
   - Animations (scrolling tickers, floating elements)
   - Images and illustrations
   - Icons and logos

### From Snapshot Data

The snapshot provides:
- Heading text (`heading "..." [level=1]`)
- Paragraph content
- Link text and URLs
- Button labels
- Form inputs
- Image alt text

### Mapping to Tailwind

```tsx
// Colors from screenshot
--primary: #38ff93      → text-[#38ff93] or bg-[var(--primary)]
--background: #0a0a0a   → bg-[#0a0a0a]
--text-muted: #888      → text-[#888]

// Typography patterns
Huge heading → text-4xl md:text-5xl lg:text-7xl font-bold
Subheading   → text-lg text-[#888]
Body text    → text-sm text-[#888]

// Spacing patterns
Section      → py-20 md:py-32
Container    → max-w-6xl mx-auto px-6
Grid gaps    → gap-6 md:gap-8
```

## Common Patterns

### Dark Theme Setup

```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --primary: #38ff93;
  --muted: #888888;
  --card: #111111;
  --border: rgba(255, 255, 255, 0.1);
}
```

### Floating Elements

```tsx
// Scattered floating tags (like Altcoinist token tickers)
const FLOATING_ITEMS = [
  { text: '$TOKEN', top: '20%', left: '5%' },
  // ... more positions
];

{FLOATING_ITEMS.map((item, i) => (
  <div
    key={i}
    className="absolute px-3 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-sm text-[#888]"
    style={{ top: item.top, left: item.left }}
  >
    {item.text}
  </div>
))}
```

### Scrolling Ticker

```tsx
// Horizontal scrolling animation
<div className="overflow-hidden">
  <div className="flex gap-8 animate-scroll">
    {[...items, ...items].map((item, i) => (
      <div key={i}>{item}</div>
    ))}
  </div>
</div>

// CSS
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll { animation: scroll 20s linear infinite; }
```

### Phone Mockup

```tsx
<div className="w-[300px] h-[600px] rounded-[40px] p-1 bg-gradient-to-br from-[rgba(56,255,147,0.3)] to-[rgba(56,255,147,0.1)]">
  <div className="w-full h-full rounded-[36px] bg-[#0d1a0f] flex flex-col items-center justify-center">
    {/* Content */}
  </div>
</div>
```

## Quality Checklist

Before marking clone complete:

### shadcn/ui Verification (MANDATORY)
- [ ] shadcn initialized (`src/components/ui/` exists)
- [ ] cn() utility exists (`src/lib/utils.ts`)
- [ ] Buttons use shadcn Button component
- [ ] Cards use shadcn Card component
- [ ] Inputs use shadcn Input component
- [ ] No custom button/card/input styling (use shadcn!)

### Visual Verification
- [ ] Screenshot captured with agent-browser
- [ ] All major sections present
- [ ] Colors match target (~90%)
- [ ] Typography feels right
- [ ] Spacing is appropriate
- [ ] Responsive on mobile/tablet/desktop
- [ ] No placeholder content
- [ ] Interactive elements work

### Build Verification
- [ ] Build passes (typecheck, lint, build)
- [ ] Visual comparison done (target vs current)

## Error Recovery

| Issue | Solution |
|-------|----------|
| agent-browser not installed | `npm install -g agent-browser && agent-browser install` |
| Chromium not found | `agent-browser install` |
| Site blocks scraping | Ask user for screenshots |
| Dynamic content missing | Use `agent-browser wait load` before screenshot |
| WebFetch gives wrong data | ALWAYS use agent-browser for visual sites |
| Clone doesn't match | Compare screenshots, identify specific differences |

## Remember

1. **NEVER trust WebFetch alone** for visual cloning - it only gets HTML text, not the rendered design
2. **ALWAYS screenshot first** before building any components
3. **READ the screenshot** to understand the actual visual design
4. **Use snapshot** for content/structure, screenshot for visual design
5. **Compare visually** at the end to verify match
