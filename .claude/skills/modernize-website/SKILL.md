---
name: modernize-website
description: "Modernize an old/outdated website. Extracts ALL content, researches top competitors in the same sector for best UI/UX patterns, then rebuilds preserving content but using competitor-inspired modern design."
invocable_by: both
context: fork
arguments: "<project-name> --from=<url> [--preserve-colors] [--target-dir=<path>] [--pages=<list>] [--sector=<sector>]"
model: opus

# Orchestration Configuration
orchestration:
  model: opus                    # Main orchestrator
  extraction_model: sonnet       # Content extraction (needs accuracy)
  research_agents_model: haiku   # 2.5x cost reduction for research
  build_model: sonnet            # Building components

# Agent Composition
composition:
  sequential_extraction:
    - content-extractor          # Extract all text/structure
    - asset-cataloger            # Catalog images/media

  parallel_research:             # NEW: Research competitors
    - sector-researcher          # Find + analyze top sites
    - framework-docs-researcher  # Industry standards
    - framework-docs-researcher  # API docs for components

  parallel_build:
    - component-builder
    - styling-enforcer

  parallel_review:
    - code-reviewer
    - accessibility-checker

max_delegation_depth: 3

tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - TaskCreate
  - TaskUpdate
  - TaskList
  - TaskGet
  - AskUserQuestion
  - WebFetch
  - Skill
  - mcp__claude-in-chrome__tabs_context_mcp
  - mcp__claude-in-chrome__tabs_create_mcp
  - mcp__claude-in-chrome__navigate
  - mcp__claude-in-chrome__computer
  - mcp__claude-in-chrome__read_page
  - mcp__claude-in-chrome__javascript_tool
  - mcp__claude-in-chrome__find
  - mcp__claude-in-chrome__get_page_text
---

# /modernize-website - Website Modernization Pipeline

## Overview

Takes an **old/outdated website** (10, 15, 20+ years old) and rebuilds it using **the best patterns from top competitors in the same sector**:

- ✅ **Same content** - ALL text preserved exactly
- ✅ **Competitor-inspired design** - Uses patterns from top sites in the sector
- ✅ **Best-in-class visuals** - Not generic modern, but sector-specific excellence
- ✅ **Responsive** - Mobile-first, all breakpoints
- ✅ **Dark mode** - Modern user preference
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Fast** - Next.js, optimized performance

### Key Difference from Other Skills

| Skill | Content | Design Source |
|-------|---------|---------------|
| `/new-website` | May improve/change | Research competitors, build better |
| `/clone-website` | Preserve | Clone exactly (including old design) |
| **`/modernize-website`** | **Preserve exactly** | **Research competitors, use their best patterns** |

### The Magic Formula
```
OLD SITE CONTENT (preserved exactly)
        +
TOP COMPETITOR DESIGN PATTERNS (researched)
        =
MODERN SITE (same message, world-class presentation)
```

### Use Case
> "This client has a website from 2010. The content is fine, but it looks ancient. Find the best law firm websites today, and rebuild this one using those patterns while keeping all their existing text."

---

## Invocation

```bash
# Basic: modernize a website
/modernize-website acme-refresh --from=https://old-website.com

# Preserve brand colors (if they're still good)
/modernize-website acme-refresh --from=https://old-website.com --preserve-colors

# Specific pages only
/modernize-website acme-refresh --from=https://old-website.com --pages="home,about,contact,services"

# Custom output location
/modernize-website acme-refresh --from=https://old-website.com --target-dir=/projects
```

---

## Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  WEBSITE MODERNIZATION PIPELINE                          │
│            (Content Preserved, Competitor Design Patterns Used)          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: DEEP CONTENT EXTRACTION                                        │
│  ├─ Navigate to every page on the old site                               │
│  ├─ Extract ALL text content (headings, paragraphs, lists)               │
│  ├─ Extract navigation structure                                         │
│  ├─ Extract contact info, addresses, phone numbers                       │
│  ├─ Catalog all images with descriptions                                 │
│  ├─ Map page hierarchy and internal links                                │
│  ├─ Auto-detect sector/industry from content                             │
│  └─ Save to docs/content-inventory.md                                    │
│                                                                          │
│  PHASE 2: SECTOR DETECTION & CONFIRMATION                                │
│  ├─ Analyze content to detect industry (law firm, restaurant, etc.)      │
│  ├─ Identify what makes the old site look dated                          │
│  ├─ Count pages and estimate scope                                       │
│  └─ ⚡ USER CHECKPOINT: Confirm sector + extraction                      │
│                                                                          │
│  PHASE 3: PARALLEL COMPETITOR RESEARCH (~2x faster)                      │
│  ├─ WebSearch for "best {sector} websites 2025"                          │
│  ├─ Select 3-5 top sites in the same sector                              │
│  ├─ ⚡ USER CHECKPOINT: Approve competitor selection                     │
│  ├─ Spawn research agents in parallel:                                   │
│  │   ├─ @sector-researcher (analyze each competitor)                     │
│  │   ├─ @framework-docs-researcher (industry standards)                  │
│  │   └─ @framework-docs-researcher (API patterns)                        │
│  ├─ Browser automation for deep competitor analysis                      │
│  └─ Generate comparison matrix + winning patterns                        │
│                                                                          │
│  PHASE 4: DESIGN SYNTHESIS                                               │
│  ├─ Merge research from parallel agents                                  │
│  ├─ Identify BEST pattern for each element:                              │
│  │   ├─ Hero section → From {competitor_x}                               │
│  │   ├─ Navigation → From {competitor_y}                                 │
│  │   ├─ Services/Features → From {competitor_z}                          │
│  │   └─ Footer → From {competitor_w}                                     │
│  ├─ Generate design tokens (colors, fonts, spacing)                      │
│  ├─ Create synthesis brief                                               │
│  └─ ⚡ USER CHECKPOINT: Approve design direction                         │
│                                                                          │
│  PHASE 5: PROJECT SETUP                                                  │
│  ├─ Create task list (TaskCreate)                                        │
│  ├─ Copy FE-NEXTJS boilerplate                                           │
│  ├─ Apply design tokens from synthesis                                   │
│  └─ Initialize project (git, npm install)                                │
│                                                                          │
│  PHASE 6: BUILD WITH COMPETITOR PATTERNS + OLD CONTENT                   │
│  ├─ Build shared layout using competitor patterns                        │
│  ├─ For each page in content inventory:                                  │
│  │   ├─ Use /frontend-design skill                                       │
│  │   ├─ Apply competitor-derived layout patterns                         │
│  │   ├─ Inject extracted content EXACTLY (no rewrites)                   │
│  │   └─ Same words, world-class presentation                             │
│  ├─ Add responsive breakpoints                                           │
│  └─ Add dark mode support                                                │
│                                                                          │
│  PHASE 7: QUALITY ASSURANCE                                              │
│  ├─ Content verification (diff old vs new text)                          │
│  ├─ Visual comparison with competitors                                   │
│  ├─ Accessibility check                                                  │
│  └─ Build verification (typecheck, lint, build)                          │
│                                                                          │
│  PHASE 8: DOCUMENTATION                                                  │
│  ├─ Generate modernization-report.md (before/after)                      │
│  ├─ Generate competitor-analysis.md (patterns borrowed)                  │
│  ├─ Generate content-mapping.md (old URL → new)                          │
│  └─ Final summary with screenshots                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Deep Content Extraction

**Goal:** Extract EVERY piece of text content from the old website.

### 1.1 Site Discovery

**With browser automation (preferred):**

```markdown
1. Create browser tab:
   mcp__claude-in-chrome__tabs_create_mcp

2. Navigate to homepage:
   mcp__claude-in-chrome__navigate url: "{source_url}"

3. Take screenshot for reference:
   mcp__claude-in-chrome__computer action: "screenshot"
   # Save reference for "before" comparison

4. Extract all internal links:
   mcp__claude-in-chrome__javascript_tool text: "
     const links = new Set();
     document.querySelectorAll('a[href]').forEach(a => {
       const href = a.href;
       const origin = window.location.origin;
       if (href.startsWith(origin) || href.startsWith('/')) {
         links.add(href.replace(origin, ''));
       }
     });
     JSON.stringify([...links].filter(l => l && !l.includes('#')));
   "
```

**Without browser automation:**

```markdown
Use WebFetch for each known page:
WebFetch url: "{source_url}"
prompt: "Extract ALL text content and internal links from this page. Return:
  1. Page title
  2. All headings (h1-h6) with their text
  3. All paragraphs of body text
  4. All list items
  5. Navigation menu items
  6. Footer content
  7. Contact information (phone, email, address)
  8. All internal links to other pages
  Format as structured JSON."
```

### 1.2 Per-Page Content Extraction

For each discovered page, extract:

```markdown
## Page Extraction Template

### URL: {page_url}

### Navigation Path: {breadcrumb}

### Main Heading (H1):
{exact text}

### Subheadings (H2-H6):
- H2: {text}
- H3: {text}
- ...

### Body Content:
{All paragraphs, preserved exactly with line breaks}

### Lists:
- {list item 1}
- {list item 2}
- ...

### Call-to-Action Text:
- Button: "{text}"
- Link: "{text}"

### Images:
| Image | Alt Text | Caption | Location |
|-------|----------|---------|----------|
| {src} | {alt} | {caption if any} | {section} |

### Special Content:
- Testimonials: {quotes}
- Statistics: {numbers/facts}
- Contact info: {phone, email, address}
```

### 1.3 Full Text Extraction (Browser)

**CRITICAL:** Use `get_page_text` to capture ALL readable content:

```markdown
mcp__claude-in-chrome__get_page_text tabId: {tabId}
# Returns article/main content as plain text
# Use this as primary content source
```

### 1.4 JavaScript Content Extraction (Comprehensive)

```javascript
// Run this on each page to extract structured content
mcp__claude-in-chrome__javascript_tool text: `
  const content = {
    url: window.location.pathname,
    title: document.title,
    meta: {
      description: document.querySelector('meta[name="description"]')?.content,
      keywords: document.querySelector('meta[name="keywords"]')?.content,
    },
    headings: [],
    paragraphs: [],
    lists: [],
    links: [],
    images: [],
    contact: {
      phones: [],
      emails: [],
      addresses: []
    }
  };

  // Extract all headings
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
    content.headings.push({
      level: h.tagName,
      text: h.textContent.trim()
    });
  });

  // Extract paragraphs
  document.querySelectorAll('p').forEach(p => {
    const text = p.textContent.trim();
    if (text.length > 10) {
      content.paragraphs.push(text);
    }
  });

  // Extract lists
  document.querySelectorAll('ul, ol').forEach(list => {
    const items = [...list.querySelectorAll('li')].map(li => li.textContent.trim());
    if (items.length > 0) {
      content.lists.push({ type: list.tagName, items });
    }
  });

  // Extract images
  document.querySelectorAll('img').forEach(img => {
    content.images.push({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  });

  // Find contact info with regex
  const pageText = document.body.innerText;

  // Phone numbers
  const phoneRegex = /[\\+]?[(]?[0-9]{1,3}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,4}[-\\s\\.]?[0-9]{1,9}/g;
  content.contact.phones = [...new Set(pageText.match(phoneRegex) || [])];

  // Emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  content.contact.emails = [...new Set(pageText.match(emailRegex) || [])];

  JSON.stringify(content, null, 2);
`
```

### 1.5 Save Content Inventory

Write to `docs/content-inventory.md`:

```markdown
# Content Inventory: {old_site_domain}

## Extraction Date: {date}
## Source URL: {source_url}
## Total Pages: {n}

---

## Site Structure

### Navigation
- Home
- About
  - Team
  - History
- Services
  - Service A
  - Service B
- Contact

---

## Page-by-Page Content

### Page 1: Homepage
**URL:** /
**Title:** {title}

#### Content:

##### Heading (H1):
{exact heading text}

##### Intro Section:
{exact paragraph text}

##### Services Overview:
{exact text}

##### Call to Action:
Button: "{exact button text}"

---

### Page 2: About
**URL:** /about
**Title:** {title}

#### Content:
{...}

---

## Contact Information

- **Phone:** {phone}
- **Email:** {email}
- **Address:** {full address}

---

## Image Inventory

| # | Current URL | Alt Text | Used On | Notes |
|---|-------------|----------|---------|-------|
| 1 | /images/logo.png | {alt} | All pages | Logo |
| 2 | /images/team.jpg | {alt} | About | Team photo |
| ... | | | | |

---

## Content Statistics

- Total words: {n}
- Total pages: {n}
- Total images: {n}
- Forms found: {n}
```

---

## Phase 2: Site Analysis

### 2.1 Identify Dated Elements

Analyze what makes the site look old:

```markdown
## Dated Elements Analysis

### Visual Issues:
- [ ] Table-based layout
- [ ] Fixed-width design (not responsive)
- [ ] Old fonts (Times New Roman, Arial, Comic Sans)
- [ ] Beveled/3D buttons
- [ ] Gradient backgrounds (old-style)
- [ ] Flash-era animations
- [ ] Low-resolution images
- [ ] Cluttered navigation
- [ ] Small text size
- [ ] No mobile support
- [ ] No dark mode
- [ ] Outdated color palette

### Technical Issues:
- [ ] No HTTPS
- [ ] Slow loading
- [ ] No semantic HTML
- [ ] Inline styles
- [ ] No accessibility
- [ ] Old meta tags
```

### 2.2 Elements to Preserve

If `--preserve-colors` flag is set, extract brand colors:

```javascript
mcp__claude-in-chrome__javascript_tool text: `
  const brand = {
    colors: {
      primary: null,
      secondary: null,
      accent: null,
      background: null,
      text: null
    },
    logo: null,
    fonts: []
  };

  // Get logo
  const logo = document.querySelector('img[src*="logo"], .logo img, header img');
  if (logo) brand.logo = logo.src;

  // Get most used colors
  const colorMap = new Map();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    const bg = s.backgroundColor;
    const color = s.color;
    if (bg !== 'rgba(0, 0, 0, 0)') {
      colorMap.set(bg, (colorMap.get(bg) || 0) + 1);
    }
    colorMap.set(color, (colorMap.get(color) || 0) + 1);
  });

  // Sort by frequency
  const sortedColors = [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([color]) => color);

  brand.colors.detected = sortedColors;

  JSON.stringify(brand, null, 2);
`
```

### 2.3 Scope Estimation

```markdown
## Modernization Scope

### Pages to Rebuild: {n}
1. Homepage - {sections}
2. About - {sections}
3. Services - {sections}
4. Contact - {sections}

### Complexity Assessment:
- Simple pages (text only): {n}
- Medium pages (text + images): {n}
- Complex pages (forms, galleries): {n}

### Estimated Components:
- Shared: Header, Footer, Navigation
- Unique sections: {n}
```

### 2.4 User Checkpoint: Confirm Sector

**CRITICAL:** Confirm sector detection before researching competitors:

```markdown
AskUserQuestion:
question: "I've extracted all content and detected this is a {detected_sector}. Should I research top {detected_sector} sites for design inspiration?"
header: "Sector Detected"
options:
  - label: "Yes, research {detected_sector} competitors"
    description: "Find top 3-5 {detected_sector} websites and use their best patterns"
  - label: "Different sector"
    description: "I'll specify the correct sector/industry"
  - label: "Skip research, use generic modern"
    description: "Just apply generic modern design without competitor research"
  - label: "Preserve brand colors"
    description: "Research competitors but keep the existing color scheme"
```

---

## Phase 3: Parallel Competitor Research

**Goal:** Find the BEST websites in the same sector and extract their design patterns.

### 3.1 Discovery Search

Use WebSearch to find top competitors:

```markdown
Search queries:
- "best {sector} website design 2025 2026"
- "award winning {sector} websites"
- "top {sector} companies websites"
- "{sector} website inspiration"
- "awwwards {sector}"

Examples by sector:
- Law firm: "best law firm website design 2025", "award winning attorney websites"
- Restaurant: "best restaurant website design", "top restaurant websites awwwards"
- Dentist: "best dental practice websites", "modern dentist website examples"
- Plumber: "best plumbing company websites", "service business website examples"
- Real estate: "best real estate agent websites", "top realtor website design"
```

### 3.2 Site Selection

Select 3-5 competitor sites based on:
- **Same sector** - Must be in the same industry as the old site
- **Visual quality** - Modern, polished, professional
- **Diversity** - Different design approaches to have options
- **Reputation** - Award-winning or from established companies

```markdown
## Competitor Selection: {sector}

| Site | Why Selected |
|------|--------------|
| {url1} | {reason - e.g., "Clean hero section, excellent services layout"} |
| {url2} | {reason - e.g., "Modern navigation, great mobile experience"} |
| {url3} | {reason - e.g., "Award-winning, unique typography"} |
| {url4} | {reason - e.g., "Strong CTA placement, trust signals"} |
```

### 3.3 User Checkpoint: Approve Competitors

```markdown
AskUserQuestion:
question: "I found these top {sector} sites to use as design templates. Proceed?"
header: "Competitors"
options:
  - label: "Yes, analyze these"
    description: "Research: {site1}, {site2}, {site3}..."
  - label: "Add/remove sites"
    description: "I'll specify which sites to use"
  - label: "I have specific sites"
    description: "I'll provide URLs of competitors I want to emulate"
```

### 3.4 Parallel Agent Research

**CRITICAL:** Launch ALL research agents in a SINGLE response for parallel execution.

**Task 1: Sector Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the sector-researcher agent.
  Read and follow: .claude/agents/sector-researcher.md

  TASK: Analyze these {sector} competitor sites:
  - {site1}
  - {site2}
  - {site3}

  For EACH site, extract:
  1. Hero section pattern (layout, headline style, CTA placement)
  2. Navigation pattern (structure, mobile menu style)
  3. Services/Features section layout
  4. Trust signals (testimonials, logos, certifications)
  5. Contact/CTA patterns
  6. Footer structure
  7. Color palette
  8. Typography choices

  Return:
  - Comparison scoring matrix (1-10 for each element)
  - Winner for each element category
  - CSS design tokens extracted from each
```

**Task 2: Best Practices Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the framework-docs-researcher agent.
  Read and follow: .claude/agents/framework-docs-researcher.md

  TASK: Research best practices for {sector} websites

  Focus on:
  - What content elements are essential for {sector}
  - Trust-building patterns for {sector}
  - Conversion patterns for {sector}
  - Common user journeys
  - Mobile-specific considerations

  Return: Actionable recommendations for {sector} website design
```

**Task 3: Framework Docs Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the framework-docs-researcher agent.
  Read and follow: .claude/agents/framework-docs-researcher.md

  TASK: Research components needed for a {sector} website

  Focus on:
  - shadcn/ui components for {sector} patterns
  - Contact form patterns
  - Map/location components
  - Image gallery patterns
  - Testimonial components

  Return: Component recommendations with usage examples
```

### 3.5 Browser Automation for Deep Analysis

**If browser automation available:**

For each competitor site:

```markdown
1. Navigate to competitor:
   mcp__claude-in-chrome__navigate url: "{competitor_url}"

2. Take full screenshot:
   mcp__claude-in-chrome__computer action: "screenshot"
   # Reference image for design patterns

3. Read page structure:
   mcp__claude-in-chrome__read_page filter: "all"

4. Extract design tokens:
   mcp__claude-in-chrome__javascript_tool text: "
     const design = {
       colors: {
         primary: null,
         secondary: null,
         background: null,
         text: null,
         accent: null
       },
       fonts: [],
       spacing: {},
       sections: []
     };

     // Get colors
     const bgColor = getComputedStyle(document.body).backgroundColor;
     design.colors.background = bgColor;

     // Get fonts
     const fonts = new Set();
     document.querySelectorAll('h1,h2,h3,p,a').forEach(el => {
       fonts.add(getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/[\"']/g, ''));
     });
     design.fonts = [...fonts];

     // Get section structure
     document.querySelectorAll('section, [class*=\"section\"], main > div').forEach((section, i) => {
       design.sections.push({
         index: i,
         hasHeading: !!section.querySelector('h1,h2,h3'),
         hasImage: !!section.querySelector('img'),
         hasCTA: !!section.querySelector('button, a[href]'),
         className: section.className
       });
     });

     JSON.stringify(design, null, 2);
   "
```

### 3.6 Aggregate Research Results

```markdown
## Competitor Research Results

### Site Analysis Summary

| Element | {Competitor 1} | {Competitor 2} | {Competitor 3} | **WINNER** |
|---------|---------------|---------------|---------------|------------|
| Hero | 8/10 | 9/10 | 7/10 | **Competitor 2** |
| Navigation | 9/10 | 7/10 | 8/10 | **Competitor 1** |
| Services | 7/10 | 8/10 | 9/10 | **Competitor 3** |
| Contact CTA | 8/10 | 9/10 | 8/10 | **Competitor 2** |
| Footer | 7/10 | 7/10 | 9/10 | **Competitor 3** |
| Mobile | 9/10 | 8/10 | 8/10 | **Competitor 1** |

### Winning Patterns to Use

| Element | Source | Pattern Description |
|---------|--------|---------------------|
| Hero | {winner} | {description of their hero pattern} |
| Navigation | {winner} | {description of their nav pattern} |
| Services | {winner} | {description of their services layout} |
| Contact | {winner} | {description of their CTA pattern} |
| Footer | {winner} | {description of their footer} |
```

---

## Phase 4: Design Synthesis

**Goal:** Combine the BEST patterns from each competitor into a unified design system.

### 4.1 Create Synthesis Brief

Write to `docs/synthesis-brief.md`:

```markdown
## Design Synthesis: {project_name}

### Source Content
**From:** {old_site_url}
**Pages:** {n}
**Words preserved:** {word_count}

### Design Inspiration
**Sector:** {sector}
**Competitors analyzed:** {competitor_count}

### Best-of-Breed Pattern Selection

#### Hero Section
**Inspired by:** {competitor_url}
**Pattern:** {description}
**Why:** {reason this is best}
**Adaptation:** {how we'll use it with the old site's content}

#### Navigation
**Inspired by:** {competitor_url}
**Pattern:** {description}
**Adaptation:** Using with navigation items: {old_site_nav_items}

#### Services/Features Section
**Inspired by:** {competitor_url}
**Pattern:** {description}
**Adaptation:** {how we'll present the old site's services}

#### Trust Signals
**Inspired by:** {competitor_url}
**Pattern:** {description}

#### Contact/CTA
**Inspired by:** {competitor_url}
**Pattern:** {description}

#### Footer
**Inspired by:** {competitor_url}
**Pattern:** {description}

### Design Tokens (from competitor analysis)

Based on what works best in {sector}:
```

### 4.2 Generate Design Tokens

Write to `src/styles/design-tokens.css`:

```css
:root {
  /* Colors - Synthesized from top {sector} competitors */
  --primary: {from_best_competitor};
  --primary-foreground: {calculated};
  --background: {from_best_competitor};
  --foreground: {from_best_competitor};
  --accent: {from_best_competitor};
  --muted: {derived};
  --card: {from_best_competitor};
  --border: {derived};

  /* Typography - Common in {sector} */
  --font-sans: {from_research};
  --font-heading: {from_research};

  /* Spacing - {sector} patterns */
  --section-padding: {from_research};
  --container-max: {from_research};

  /* Radius - {sector} style */
  --radius-sm: {from_research};
  --radius-md: {from_research};
  --radius-lg: {from_research};
}

.dark {
  /* Dark mode variants */
  --background: {dark_variant};
  --foreground: {dark_variant};
  /* ... */
}
```

### 4.3 User Checkpoint: Approve Design Direction

```markdown
AskUserQuestion:
question: "Here's the design direction based on top {sector} competitors. Approve?"
header: "Design Plan"
options:
  - label: "Approve - build with these patterns"
    description: "Hero from {x}, Nav from {y}, Services from {z}"
  - label: "Adjust patterns"
    description: "I want to change which competitors to draw from"
  - label: "See competitor screenshots"
    description: "Show me visual examples of each pattern"
  - label: "More conservative"
    description: "Use simpler patterns, less bold design"
```

---

## Phase 5: Project Setup

### 5.1 Create Task List

```markdown
Use TaskCreate for each phase:
1. "Set up project from boilerplate" (activeForm: "Setting up project")
2. "Research competitors in {sector}" (activeForm: "Researching competitors")
3. "Create synthesis brief with competitor patterns" (activeForm: "Synthesizing patterns")
4. "Build shared components (header, footer, nav)" (activeForm: "Building layout")
5. "Rebuild page: {page_name}" × n (activeForm: "Building {page_name}")
6. "Verify content accuracy" (activeForm: "Verifying content")
7. "Run quality checks" (activeForm: "Running quality checks")
8. "Generate documentation" (activeForm: "Generating docs")
```

### 5.2 Copy Boilerplate

```bash
TARGET_DIR="${target_dir:-$HOME/Desktop}/$PROJECT_NAME"

rsync -av --exclude='node_modules' --exclude='.git' --exclude='.next' \
  /path/to/FE-NEXTJS/ "$TARGET_DIR/"

cd "$TARGET_DIR"
```

### 5.3 Apply Design Tokens from Synthesis

**Use the design tokens generated in Phase 4 from competitor analysis:**

```css
/* src/styles/design-tokens.css */
/* Tokens derived from best patterns in {sector} competitors */
:root {
  /* Colors - from {winning_competitor} */
  --primary: {from_synthesis};
  --primary-foreground: {from_synthesis};
  --background: {from_synthesis};
  --foreground: {from_synthesis};
  --accent: {from_synthesis};
  --muted: {from_synthesis};
  --card: {from_synthesis};
  --border: {from_synthesis};

  /* Typography - common in {sector} */
  --font-sans: {from_synthesis};
  --font-heading: {from_synthesis};

  /* Spacing - {sector} patterns */
  --section-padding: {from_synthesis};
  --container-max: {from_synthesis};

  /* Radius - {sector} style */
  --radius: {from_synthesis};
}

.dark {
  /* Dark mode - adapted from synthesis */
  --background: {dark_variant};
  --foreground: {dark_variant};
  /* ... */
}
```

**If `--preserve-colors` (keep old brand colors, use competitor layouts):**

```css
:root {
  --primary: {extracted_from_old_site};
  --background: {extracted_from_old_site};
  /* Colors from old site, layouts from competitors */
}
```

### 5.4 Initialize Project

```bash
cd "$TARGET_DIR"
git init
npm install
```

---

## Phase 6: Build with Competitor Patterns + Old Content

### 6.1 Build Shared Layout Using Competitor Patterns

Create header, footer, navigation using:
- **Layout patterns** from competitor analysis
- **Content** from the old site (preserved exactly)

```tsx
// src/components/layout/header.tsx
// LAYOUT: Inspired by {competitor_winner_for_nav}
// CONTENT: Exact navigation items from old site

const navItems = [
  { label: "{exact_text_from_old_site}", href: "{path}" },
  // ... items from content extraction
];

// Navigation PATTERN from {competitor}:
// - Sticky header
// - Logo left, links center, CTA right
// - Mobile hamburger at 768px
```

### 6.2 Rebuild Each Page with Competitor-Inspired Layouts

For each page in content inventory:

```markdown
1. Read the extracted content for this page from docs/content-inventory.md

2. Read the synthesis brief for which competitor pattern to use

3. Invoke /frontend-design skill:
   Skill: "frontend-design"
   Args: "Create a {page_type} page using this layout pattern:

          LAYOUT INSPIRATION:
          - Hero style: {from_competitor_x} - {pattern_description}
          - Services layout: {from_competitor_y} - {pattern_description}
          - CTA style: {from_competitor_z} - {pattern_description}

          EXACT CONTENT TO USE (do not change ANY text):

          Heading: {exact_h1_from_old_site}

          Intro: {exact_intro_paragraph_from_old_site}

          Sections:
          - {section_1_heading}: {section_1_content}
          - {section_2_heading}: {section_2_content}

          CTA Button: '{exact_button_text}'

          REQUIREMENTS:
          - Use competitor-inspired layouts
          - Preserve ALL text exactly as provided
          - Responsive + dark mode required"

4. Verify content matches extraction EXACTLY

5. Mark task complete
```

### 6.3 Content Injection Rules

**CRITICAL:** Content is preserved EXACTLY. Only the visual presentation changes.

```markdown
## Content Injection Rules

✅ DO:
- Use exact headings from extraction
- Use exact paragraph text
- Use exact button/CTA text
- Preserve list items exactly
- Keep phone numbers, emails as extracted
- Apply competitor LAYOUT patterns
- Apply competitor VISUAL styles

❌ DON'T:
- Rewrite any text for "clarity"
- Fix perceived grammar issues
- Change wording of buttons
- Modernize the language
- Add new content not in original
- Remove any content from original
- Use competitor's CONTENT (only their patterns)
```

### 6.4 Image Handling

```markdown
## Image Strategy

For each image in content inventory:

1. If image URL still accessible:
   - Reference directly in new site
   - Add to public/images/ with original filename

2. If image unavailable:
   - Use placeholder with same dimensions
   - Note in migration report for client to provide

3. Always preserve:
   - Alt text exactly as original
   - Caption text exactly as original

4. Apply competitor image patterns:
   - Hero image treatment from {competitor}
   - Gallery layout from {competitor}
   - Team photos layout from {competitor}
```

---

## Phase 7: Quality Assurance

### 7.1 Content Verification

**CRITICAL:** Diff the content to ensure nothing was changed:

```markdown
## Content Verification Checklist

For each page:

### Page: {page_name}

#### Headings Match:
- [ ] H1: "{original}" = "{new}" ✓/✗
- [ ] H2s match: ✓/✗

#### Paragraphs Match:
- [ ] Para 1: First 50 chars match ✓/✗
- [ ] Para 2: First 50 chars match ✓/✗
- [ ] All paragraphs present ✓/✗

#### Contact Info Match:
- [ ] Phone: "{original}" = "{new}" ✓/✗
- [ ] Email: "{original}" = "{new}" ✓/✗
- [ ] Address: "{original}" = "{new}" ✓/✗

#### Special Content:
- [ ] Lists preserved ✓/✗
- [ ] CTAs preserved ✓/✗
```

### 7.2 Visual Verification

**With browser automation:**

```markdown
1. Start dev server:
   Bash: "cd $TARGET_DIR && npm run dev" (background)

2. Screenshot at breakpoints:
   - Desktop (1440px)
   - Tablet (768px)
   - Mobile (375px)

3. Screenshot dark mode

4. Compare "before" (old site) vs "after" (new site) screenshots
```

### 7.3 Accessibility Check

```markdown
Launch accessibility-checker agent:
Task(subagent_type: "general-purpose", model: "haiku", prompt: "
  You are the accessibility-checker agent.

  FILES TO REVIEW:
  - All components in src/components/
  - All pages in src/app/

  VERIFY:
  - Semantic HTML
  - Heading hierarchy
  - Alt text on images
  - Keyboard navigation
  - Color contrast
  - Focus indicators

  Return: Issues with WCAG references
")
```

### 7.4 Build Verification

```bash
npm run typecheck  # Zero errors
npm run lint       # Zero errors
npm run build      # Must succeed
```

---

## Phase 8: Documentation

### 8.1 Modernization Report (with Competitor Attribution)

Write to `docs/modernization-report.md`:

```markdown
# Modernization Report: {project_name}

## Source Site
**URL:** {source_url}
**Extraction Date:** {date}

---

## Before & After

### Screenshots
| Viewport | Before | After |
|----------|--------|-------|
| Desktop | ![Before](screenshots/before-desktop.png) | ![After](screenshots/after-desktop.png) |
| Mobile | ![Before](screenshots/before-mobile.png) | ![After](screenshots/after-mobile.png) |
| Dark Mode | N/A | ![Dark](screenshots/after-dark.png) |

---

## What Changed (Design Only)

### Modernized Elements:
| Element | Before | After |
|---------|--------|-------|
| Layout | {old: table/fixed} | Modern flexbox/grid, responsive |
| Typography | {old fonts} | Inter, modern scale |
| Colors | {old palette} | {new palette or "preserved"} |
| Buttons | {old style} | Modern rounded, hover states |
| Navigation | {old style} | Modern responsive menu |
| Spacing | {cramped/uneven} | Consistent, generous whitespace |
| Images | {old handling} | Optimized, responsive |

### Added Features:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ WCAG 2.1 AA accessibility
- ✅ Modern performance (Next.js)
- ✅ SEO optimizations

---

## What Stayed the Same (Content)

### Preserved Exactly:
- ✅ All page text content
- ✅ All headings and hierarchy
- ✅ All navigation items
- ✅ Contact information
- ✅ Call-to-action text
- ✅ Image alt text

### Content Statistics:
- Words preserved: {n}
- Pages rebuilt: {n}
- Images referenced: {n}

---

## Page Mapping

| Original URL | New Route | Status |
|--------------|-----------|--------|
| / | / | ✅ Complete |
| /about.html | /about | ✅ Complete |
| /services.php | /services | ✅ Complete |
| /contact.htm | /contact | ✅ Complete |

---

## Technical Stack

| Aspect | Before | After |
|--------|--------|-------|
| Framework | {old tech} | Next.js 14 |
| Styling | {old tech} | Tailwind CSS |
| Components | {old tech} | shadcn/ui |
| TypeScript | ❌ | ✅ |
| Responsive | ❌ | ✅ |
| Dark Mode | ❌ | ✅ |
| Accessibility | ❌ | ✅ |

---

## Quality Verification

- [x] Content matches original exactly
- [x] All pages rebuilt
- [x] Responsive at all breakpoints
- [x] Dark mode works
- [x] Accessibility compliant
- [x] Build passes (typecheck, lint, build)

---

## Next Steps

1. **Review** the modernized site
2. **Provide** high-resolution images to replace placeholders
3. **Update** any content that needs refreshing (optional)
4. **Deploy** to production

### Commands
```bash
cd {project_path}
npm run dev      # Development
npm run build    # Production build
npm run start    # Production server
```
```

### 8.2 Content Mapping

Write to `docs/content-mapping.md`:

```markdown
# Content Mapping: {project_name}

## URL Redirects

Set up these redirects from old URLs to new:

| Old URL | New URL | Type |
|---------|---------|------|
| /index.html | / | 301 |
| /about.html | /about | 301 |
| /about-us.html | /about | 301 |
| /services.php | /services | 301 |
| /contact.htm | /contact | 301 |

## Content Source Reference

For each piece of content, here's where it came from:

### Homepage Content
| Content | Source Location |
|---------|-----------------|
| Hero heading | {original_url} - H1 element |
| Hero description | {original_url} - First paragraph |
| Services list | {original_url} - .services section |

### About Page Content
| Content | Source Location |
|---------|-----------------|
| ... | ... |
```

---

## Error Handling

| Issue | Solution |
|-------|----------|
| Site requires login | Ask user for credentials or screenshots |
| JavaScript-heavy site | Use browser automation, not WebFetch |
| Images blocked | Note in report, ask user to provide |
| Content extraction incomplete | Re-run extraction for specific pages |
| Old URL structure complex | Create comprehensive redirect map |
| Forms on original | Note forms need backend implementation |

---

## Tips for Best Results

1. **Use browser automation** - Old sites often have quirky HTML that WebFetch misses
2. **Screenshot everything** - Visual reference helps ensure accurate rebuild
3. **Verify content** - Double-check extracted text matches original
4. **Don't improve content** - Resist urge to fix typos or rewrite text
5. **Document placeholders** - If images unavailable, clearly mark for client
6. **Map all URLs** - Ensure redirects are set up for SEO preservation

---

## Related Files

- `templates/modernization-report.md` - Report template
- `templates/content-inventory.md` - Inventory template
- `templates/content-mapping.md` - Mapping template
