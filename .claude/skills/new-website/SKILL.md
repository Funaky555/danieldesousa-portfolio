---
name: new-website
description: "Create a complete website from scratch. Describe what you want, we research the sector, synthesize best patterns from top competitors, and build a full Next.js app with modern UI/UX."
invocable_by: both
context: fork
arguments: "<project-name> \"<description>\" [--focus=<areas>] [--target-dir=<path>] [--skip-research]"
model: opus

# Orchestration Configuration
orchestration:
  model: opus                    # Main orchestrator
  research_agents_model: haiku   # 2.5x cost reduction for research
  build_agents_model: sonnet     # Balance of speed/quality for building

# Agent Composition
composition:
  parallel_research:
    - sector-researcher
    - framework-docs-researcher
    - framework-docs-researcher

  sequential_build:
    - component-builder
    - styling-enforcer

  conditional:
    - agent: form-builder
      when: "sector involves forms, inputs, user registration"
    - agent: api-builder
      when: "sector involves API, data fetching, dashboard"
    - agent: state-manager
      when: "sector involves complex state, dashboard, real-time"
    - agent: animation-builder
      when: "sector involves marketing, landing page, portfolio, hero section, scroll effects, parallax, micro-interactions, modern UI, SaaS, product showcase"
    - agent: seo-optimizer
      when: "sector involves marketing, landing page, e-commerce"

  parallel_review:
    - code-reviewer
    - security-auditor
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
  - WebSearch
  - WebFetch
  - Skill
  - mcp__claude-in-chrome__tabs_context_mcp
  - mcp__claude-in-chrome__tabs_create_mcp
  - mcp__claude-in-chrome__navigate
  - mcp__claude-in-chrome__computer
  - mcp__claude-in-chrome__read_page
  - mcp__claude-in-chrome__javascript_tool
  - mcp__claude-in-chrome__find
---

# /new-website - Complete Website Creation Pipeline

## Overview

Creates a complete, production-ready Next.js website from your description. **You describe what you want, we research the best in the sector and build it.**

### Use Case: Build From Vision
Describe what you want → We research top sites in that sector → Extract best patterns → Build a world-class version → Document the approach

### Pipeline:
1. **Understand** your description and detect the sector
2. **Research** top competitors in that sector
3. **Synthesize** the best patterns from each competitor
4. **Build** a best-in-class version based on your vision
5. **Review** with parallel code/security/accessibility agents
6. **Document** design decisions and competitor analysis

## Invocation

### Standard: Describe What You Want
```
/new-website <project-name> "<description>" [--focus="<areas>"]
```

### Quick Build (Skip Research)
For simple sites where you don't need competitor research:
```
/new-website <project-name> "<description>" --skip-research
```

## Examples

```bash
# DESCRIBE WHAT YOU WANT - We research and build
/new-website geoangola "geospatial data platform for African mining companies" --focus="map interface, data visualization"
/new-website fintrack "fintech dashboard for crypto portfolio tracking" --focus="analytics, charts, real-time data"
/new-website devhub "developer tools landing page for an API product" --focus="hero, features, pricing, docs"
/new-website lawfirm "professional law firm website for a small practice" --focus="trust, services, contact"
/new-website foodie "restaurant website with online menu and reservations"

# QUICK BUILD - Skip research for simple sites
/new-website myportfolio "personal developer portfolio" --skip-research
/new-website quicklanding "simple product landing page" --skip-research
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `project-name` | Yes | Lowercase, hyphenated project name |
| `description` | Yes | What you want to build (in quotes) - be specific about sector, purpose, and key features |
| `--focus` | No | Specific areas to prioritize (comma-separated) |
| `--target-dir` | No | Where to create project (default: ~/Desktop) |
| `--skip-research` | No | Skip research phase for simple sites |

---

## Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEW WEBSITE CREATION PIPELINE                         │
│                      (Opus 4.5 Orchestrated)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 0: UNDERSTAND & ASSESS                                            │
│  ├─ Parse user description to extract:                                   │
│  │   ├─ Sector/industry (fintech, law firm, SaaS, etc.)                  │
│  │   ├─ Key features needed                                              │
│  │   └─ Target audience                                                  │
│  ├─ Score complexity (0-100 points)                                      │
│  ├─ Route to appropriate workflow                                        │
│  ├─ Detect conditional agents needed                                     │
│  └─ ⚡ USER CHECKPOINT: Confirm understanding                            │
│                                                                          │
│  PHASE 1: SETUP & TASK CREATION                                          │
│  ├─ Create task list with TaskCreate (8 phases)                          │
│  ├─ Validate project name                                                │
│  ├─ Copy FE-NEXTJS boilerplate to target directory                       │
│  ├─ Update package.json, CLAUDE.md with project name                     │
│  └─ git init && npm install                                              │
│                                                                          │
│  PHASE 2: PARALLEL RESEARCH (~2x faster)                                 │
│  ├─ WebSearch for top sites in detected sector                           │
│  ├─ Select 3-5 best sites based on quality + relevance                   │
│  ├─ ⚡ USER CHECKPOINT: Approve site selection (AskUserQuestion)         │
│  ├─ Spawn research agents in parallel (single response):                 │
│  │   ├─ @sector-researcher (analyze each competitor)                     │
│  │   ├─ @framework-docs-researcher (industry standards)                  │
│  │   └─ @framework-docs-researcher (API docs)                            │
│  ├─ Browser automation for deep analysis (if available)                  │
│  └─ Collect and aggregate results                                        │
│                                                                          │
│  PHASE 3: SYNTHESIS & DESIGN BRIEF                                       │
│  ├─ Merge research from parallel agents                                  │
│  ├─ Create comparison matrix                                             │
│  ├─ Identify winning patterns + market gaps                              │
│  ├─ Generate synthesis brief + design tokens                             │
│  └─ ⚡ USER CHECKPOINT: Approve synthesis (AskUserQuestion)              │
│                                                                          │
│  PHASE 4: BUILD WITH /frontend-design                                    │
│  ├─ Apply design tokens to project                                       │
│  ├─ Invoke conditional agents based on sector:                           │
│  │   ├─ [form-builder] if forms detected                                 │
│  │   ├─ [api-builder] if API/dashboard detected                          │
│  │   ├─ [state-manager] if complex state detected                        │
│  │   ├─ [animation-builder] if marketing page                            │
│  │   └─ [seo-optimizer] if landing/e-commerce                            │
│  ├─ Invoke Skill: frontend-design for each page                          │
│  ├─ Implement dark mode + responsive                                     │
│  └─ Add animations and micro-interactions                                │
│                                                                          │
│  PHASE 5: PARALLEL CODE REVIEW (~3x faster)                              │
│  ├─ Launch 3 review agents in single response:                           │
│  │   ├─ @code-reviewer (quality, patterns)                               │
│  │   ├─ @security-auditor (vulnerabilities)                              │
│  │   └─ @accessibility-checker (WCAG compliance)                         │
│  ├─ Aggregate review results                                             │
│  └─ Fix critical issues before proceeding                                │
│                                                                          │
│  PHASE 6: QUALITY ASSURANCE                                              │
│  ├─ npm run typecheck (zero errors)                                      │
│  ├─ npm run lint (zero errors)                                           │
│  ├─ npm run build (success)                                              │
│  ├─ Visual regression testing (screenshots)                              │
│  ├─ Responsive test: 375px, 768px, 1440px                                │
│  └─ Dark mode verification                                               │
│                                                                          │
│  PHASE 7: DOCUMENTATION & HANDOFF                                        │
│  ├─ Generate docs/research-report.md                                     │
│  ├─ Generate docs/synthesis-brief.md                                     │
│  ├─ Update CLAUDE.md with project context                                │
│  └─ Final summary to user                                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Understand & Assess

### 0.1 Parse User Description

Analyze the user's description to extract:

```markdown
## Description Analysis

**User said:** "{description}"

### Extracted Information:

**Sector/Industry:** {detected_sector}
- Examples: fintech, law firm, SaaS, e-commerce, developer tools, restaurant, etc.

**Site Type:** {site_type}
- Examples: landing page, dashboard, portfolio, blog, marketplace, etc.

**Key Features Needed:**
- [ ] {Feature 1} - {why detected from description}
- [ ] {Feature 2} - {why detected from description}
- [ ] {Feature 3} - {why detected from description}

**Target Audience:** {audience}
- Who will use this site?

**Tone/Style Hints:**
- Professional / Playful / Technical / Friendly / etc.
```

### 0.2 User Checkpoint: Confirm Understanding

**CRITICAL**: Use AskUserQuestion to confirm before proceeding:

```markdown
question: "I understood your request as: {summary}. Should I research top {sector} sites and build this?"
header: "Confirm"
options:
  - label: "Yes, research and build"
    description: "Research top {sector} sites, extract best patterns, build your vision"
  - label: "Adjust understanding"
    description: "I'll clarify what I want"
  - label: "Skip research"
    description: "Just build with general best practices, no competitor research"
```

### 0.3 Complexity Assessment

Score the request to route appropriately.

#### Scoring Criteria (0-100 points)

| Criteria | Points | How to Detect |
|----------|--------|---------------|
| **Pages Requested** | 0-25 | Count pages mentioned |
| | 5 pts | 1-2 pages |
| | 15 pts | 3-5 pages |
| | 25 pts | 6+ pages |
| **Feature Complexity** | 0-25 | Detect complex features |
| | 0 pts | Static content only |
| | 10 pts | Forms, basic interactivity |
| | 20 pts | Dashboard, real-time, auth |
| | 25 pts | Full app with multiple features |
| **Sector Complexity** | 0-25 | Industry requirements |
| | 5 pts | Simple landing, portfolio |
| | 15 pts | E-commerce, SaaS |
| | 25 pts | Fintech, healthcare, enterprise |
| **Customization Level** | 0-25 | Design requirements |
| | 5 pts | Standard template fine |
| | 15 pts | Custom design needed |
| | 25 pts | Highly differentiated, unique |

#### Classification & Routing

| Score | Classification | Approach |
|-------|----------------|----------|
| < 30 | 🟢 SIMPLE | Skip research, use /frontend-design directly |
| 30-60 | 🟡 MEDIUM | Research 2-3 sites, quick synthesis |
| 60+ | 🔴 COMPLEX | Full 5-site research, detailed synthesis |

#### Conditional Agent Detection

Analyze sector/focus for keywords to determine extra agents:

| Keywords | Conditional Agents |
|----------|-------------------|
| dashboard, analytics, data | `state-manager`, `api-builder` |
| form, contact, registration, auth | `form-builder`, `security-auditor` |
| e-commerce, shop, cart, checkout | `form-builder`, `security-auditor`, `seo-optimizer` |
| landing, marketing, portfolio, SaaS | `animation-builder`, `seo-optimizer`, `image-optimizer` |
| hero, scroll, parallax, transitions, modern | `animation-builder` |
| product showcase, interactive, animations | `animation-builder`, `image-optimizer` |
| docs, documentation, developer | `accessibility-checker` |

#### Output Analysis

```markdown
## Complexity Assessment

**Request:** /new-website fintrack "fintech dashboard for crypto portfolio tracking" --focus="analytics, charts"

### Score: 72/100 (🔴 COMPLEX)

| Criteria | Score | Reason |
|----------|-------|--------|
| Pages | 20/25 | Dashboard implies multiple views |
| Features | 20/25 | Charts, analytics, data display |
| Sector | 20/25 | Fintech requires polish |
| Customization | 12/25 | Needs differentiation |

### Routing Decision
- Full research phase (5 sites)
- Detailed synthesis brief

### Conditional Agents Detected
- ✅ state-manager (dashboard state)
- ✅ api-builder (data fetching)
- ✅ animation-builder (charts, transitions)
- ❌ form-builder (no forms mentioned)
- ❌ seo-optimizer (internal dashboard)
```

---

## Phase 1: Project Initialization

### 1.1 Create Task List

```markdown
Use TaskCreate to create 8 tasks:
1. "Initialize project from boilerplate" (activeForm: "Initializing project")
2. "Research competitors in {sector}" (activeForm: "Researching competitors")
3. "Create synthesis brief and design tokens" (activeForm: "Synthesizing patterns")
4. "Build pages with frontend-design" (activeForm: "Building pages")
5. "Run parallel code review" (activeForm: "Running code review")
6. "Run quality assurance checks" (activeForm: "Running quality checks")
7. "Perform visual verification" (activeForm: "Verifying visuals")
8. "Generate documentation" (activeForm: "Generating docs")
```

### 1.2 Validate Input

```bash
# Project name must be:
# - Lowercase
# - No spaces (use hyphens)
# - Valid npm package name

# Validation regex
[[ "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]] || error "Invalid project name"
```

### 1.3 Copy Boilerplate

**Boilerplate source**: This repository's `FE-NEXTJS` folder

```bash
# Default target: ~/Desktop/<project-name>
TARGET_DIR="${target_dir:-$HOME/Desktop}/$PROJECT_NAME"

# Copy boilerplate (excluding node_modules, .git, .next)
rsync -av --exclude='node_modules' --exclude='.git' --exclude='.next' \
  /path/to/FE-NEXTJS/ "$TARGET_DIR/"
```

### 1.4 Update Configuration

Update these files with project name:
- `package.json` → name field
- `CLAUDE.md` → title and description

### 1.5 Initialize

```bash
cd "$TARGET_DIR"
git init
npm install
```

Mark task 1 as completed with TaskUpdate.

---

## Phase 2: Parallel Research

**Skip this phase only if:**
- User used `--skip-research` flag (for very simple sites)

### 2.1 Discovery Search

Use WebSearch to find top sites in the detected sector:
```
"best {sector} website design 2025 2026"
"awwwards {sector}"
"{sector} UI inspiration"
"top {sector} startups website"
"{sector} website examples"
```

### 2.2 Site Selection

From search results, select 3-5 sites based on:
- Visual quality (modern, polished)
- Diversity (different approaches)
- Relevance to the user's described use case
- Innovation (unique elements)

### 2.3 User Checkpoint: Site Approval

**CRITICAL**: Use AskUserQuestion before proceeding:

```markdown
question: "I found these sites to analyze for {sector}. Should I proceed with these?"
header: "Sites"
options:
  - label: "Yes, analyze these"
    description: "Proceed with: {site1}, {site2}, {site3}..."
  - label: "Add/remove sites"
    description: "I'll specify which sites to use"
  - label: "Skip research"
    description: "Use general best practices instead"
```

### 2.4 Parallel Agent Research

**CRITICAL**: Launch ALL research agents in a SINGLE response for parallel execution.

```markdown
I will now launch parallel research. All 3 agents will execute simultaneously.
```

**Task 1: Sector Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the sector-researcher agent.
  Read and follow: .claude/agents/sector-researcher.md

  TASK: Research and analyze these sites for {sector}:
  - {site1}
  - {site2}
  - {site3}

  Focus areas: {focus}

  Return:
  - Comparison scoring matrix
  - Winning patterns per category
  - Design tokens extracted
  - Market gap identified
```

**Task 2: Best Practices Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the framework-docs-researcher agent.
  Read and follow: .claude/agents/framework-docs-researcher.md

  TASK: Research industry best practices for: {sector}

  Focus on:
  - Next.js/React patterns for this type of site
  - Performance considerations for {sector}
  - Accessibility requirements
  - Security considerations

  Return: Actionable recommendations with code examples
```

**Task 3: Framework Docs Researcher (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the framework-docs-researcher agent.
  Read and follow: .claude/agents/framework-docs-researcher.md

  TASK: Research framework APIs for building: {sector}

  Focus on:
  - shadcn/ui components needed
  - Relevant React patterns
  - Animation libraries (if marketing page)
  - Data visualization (if dashboard)

  Return: API references with usage examples
```

### 2.5 Browser Automation for Deep Analysis (Optional)

If Claude browser extension is available, enhance research:

```markdown
## Deep Site Analysis (Browser)

For each approved site:

1. Create browser tab:
   mcp__claude-in-chrome__tabs_create_mcp

2. Navigate to site:
   mcp__claude-in-chrome__navigate url: "{site_url}"

3. Take screenshot:
   mcp__claude-in-chrome__computer action: "screenshot"

4. Read page structure:
   mcp__claude-in-chrome__read_page filter: "all"

5. Extract design tokens via JavaScript:
   mcp__claude-in-chrome__javascript_tool text: "
     const styles = {
       colors: [...new Set([...document.querySelectorAll('*')].flatMap(el => {
         const s = getComputedStyle(el);
         return [s.backgroundColor, s.color].filter(c => c !== 'rgba(0, 0, 0, 0)');
       }))].slice(0, 20),
       fonts: [...new Set([...document.querySelectorAll('*')].map(el =>
         getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/[\"']/g, '')
       ).filter(Boolean))].slice(0, 5),
       radius: getComputedStyle(document.querySelector('button') || document.body).borderRadius
     };
     JSON.stringify(styles, null, 2);
   "

6. Find key interactive elements:
   mcp__claude-in-chrome__find query: "navigation menu, hero section, call to action button"
```

### 2.6 Error Recovery: Parallel Research

| Agent Status | Action |
|--------------|--------|
| All succeed | Proceed to synthesis |
| 1 fails | Retry once with longer timeout |
| 2 fail | Continue with available research, note gaps |
| All fail | Use AskUserQuestion for manual site URLs or skip research |
| WebSearch blocked | Fall back to user-provided URLs |
| Browser unavailable | Continue with WebSearch/WebFetch only |

### 2.7 Aggregate Results

Wait for all parallel agents to complete. Merge their analyses into unified research context:

```markdown
## Aggregated Research Context

### From sector-researcher:
- Site rankings: {matrix}
- Winner patterns: {list}
- Design tokens: {css}

### From framework-docs-researcher:
- Recommended patterns: {list}
- Performance tips: {list}
- Security considerations: {list}

### From framework-docs-researcher:
- Components to use: {list}
- API patterns: {examples}
```

Mark task 2 as completed.

---

## Phase 3: Synthesis & Design Brief

**Goal:** Combine the BEST patterns from top competitors to build something excellent for the user's vision.

### 3.1 Comparison Matrix

Score each researched site (1-10) and identify the WINNER for each aspect:

| Aspect | Site 1 | Site 2 | Site 3 | Site 4 | Winner | Why It's Best |
|--------|--------|--------|--------|--------|--------|---------------|
| Hero | | | | | | |
| Navigation | | | | | | |
| Typography | | | | | | |
| Color system | | | | | | |
| Components | | | | | | |
| Animations | | | | | | |
| {focus-area} | | | | | | |
| **Overall UX** | | | | | | |
| **Mobile** | | | | | | |
| **Performance** | | | | | | |

### 3.2 Identify Patterns & Gaps

**What patterns work best for this sector?**

```markdown
## Pattern Analysis

### Best Patterns (use these):
- {pattern 1} - from {winner} - why it works
- {pattern 2} - from {winner} - why it works

### Common Weaknesses (avoid these):
- {weakness 1} - seen in {n} of {total} sites
- {weakness 2} - seen in {n} of {total} sites

### Market Gaps (opportunity to differentiate):
- {gap 1} - our opportunity
- {gap 2} - our opportunity
```

### 3.3 Generate Synthesis Brief

Write to `docs/synthesis-brief.md` using template from `templates/synthesis-brief.md`:

```markdown
## Synthesis: {Project Name}
**User's Vision:** {description}
**Sector:** {detected_sector}

### Competitors Analyzed
1. {Site 1} - Strengths: {list} | Weaknesses: {list}
2. {Site 2} - Strengths: {list} | Weaknesses: {list}
3. {Site 3} - Strengths: {list} | Weaknesses: {list}

### Best-of-Breed Patterns (Taking the BEST from each)
- **Hero**: From {winner} - {why it's best}
- **Navigation**: From {winner} - {why it's best}
- **Components**: From {winner} - {why it's best}
- **Typography**: From {winner} - {why it's best}
- **Animations**: From {winner} - {why it's best}

### Animation Strategy
Based on competitor analysis, implement these animation patterns:

**Hero Section:**
- Entry animation: {fade-up, scale, split-reveal}
- Background: {static, parallax, animated gradient}
- CTA: {stagger delay from hero text}

**Scroll Animations:**
- Section reveals: {fade-up on scroll, whileInView}
- Parallax elements: {background images, floating elements}
- Progress indicator: {scroll progress bar, section dots}

**Micro-interactions:**
- Buttons: {scale on hover/tap, ripple effect}
- Cards: {lift on hover, shadow increase}
- Navigation: {underline animation, mobile menu stagger}

**Page Transitions:**
- Type: {fade, slide, none}
- Duration: {200-400ms}

**Animation Library:** Motion (motion/react)
- Copy animation presets from: `.claude/templates/lib/animations/`

### Our Differentiators
1. {Differentiator 1} - based on user's specific needs
2. {Differentiator 2} - market gap we're filling
3. {Differentiator 3} - unique to user's vision

### Design Tokens
{CSS variables - synthesized from best of all sites}

### Pages to Build
1. Homepage - {sections}
2. {Page} - {sections}
```

### 3.3 Generate Design Tokens

Write to `src/styles/design-tokens.css`:

```css
:root {
  /* Colors - Synthesized from research */
  --primary: {value};
  --primary-foreground: {value};
  --background: {value};
  --foreground: {value};
  --accent: {value};
  --muted: {value};
  --card: {value};
  --border: {value};

  /* Typography */
  --font-sans: {value};
  --font-heading: {value};
  --font-mono: {value};

  /* Spacing */
  --section-padding: {value};
  --container-max: {value};

  /* Radius */
  --radius-sm: {value};
  --radius-md: {value};
  --radius-lg: {value};
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: {value};
  --shadow-md: {value};
  --shadow-lg: {value};
}

.dark {
  --background: {dark-value};
  --foreground: {dark-value};
  --card: {dark-value};
  --border: {dark-value};
}
```

### 3.5 User Checkpoint: Synthesis Approval

**CRITICAL**: Use AskUserQuestion:

```markdown
question: "Here's the design direction based on top {sector} competitors. Approve?"
header: "Synthesis"
options:
  - label: "Approve - build it"
    description: "Using patterns from: {winners}. Differentiator: {gap_we_fill}"
  - label: "Adjust approach"
    description: "I want to modify the design direction"
  - label: "More unique"
    description: "Push further - make it more differentiated from competitors"
  - label: "More conventional"
    description: "Stay closer to established sector patterns"
```

Mark task 3 as completed.

---

## Phase 4: Build with /frontend-design

### 4.1 Apply Design System

1. Update `tailwind.config.ts` with design tokens
2. Update `src/app/globals.css`
3. Import design-tokens.css

### 4.1b Setup Animations (if animation-builder detected)

If the animation-builder agent was triggered:

```bash
# Install Motion
npm install motion
```

The animation-builder agent will **dynamically generate** only the animations needed based on the synthesis brief:

1. **Analyze Animation Strategy** from synthesis (hero type, scroll effects, micro-interactions)
2. **Generate `lib/animations.ts`** with shared presets (only if multiple components reuse them)
3. **Add animations inline** to components when they're one-off

Reference patterns: `.claude/references/patterns/animations.md`

### 4.2 Invoke Conditional Agents

Based on Phase 0 analysis, invoke relevant agents BEFORE building:

```markdown
## Conditional Agent Invocation

### Detected: state-manager (dashboard sector)
Task(subagent_type: "general-purpose", model: "sonnet", prompt: "
  You are the state-manager agent.
  Read: .claude/agents/state-manager.md
  Task: Set up state management for {sector} dashboard
  Context: {research_context}
")

### Detected: animation-builder (marketing sector)
Task(subagent_type: "general-purpose", model: "sonnet", prompt: "
  You are the animation-builder agent.
  Read: .claude/agents/animation-builder.md
  Task: Plan animations for {sector} landing page
  Context: {research_context}
")
```

### 4.3 Build Each Page

For each page in synthesis brief, invoke the frontend-design skill:

```markdown
Use Skill tool:
- skill: "frontend-design"
- args: "{page description with design context from synthesis}"
```

**Page order**:
1. Layout (header, footer) - shared components
2. Homepage - hero, features, CTA sections
3. Additional pages per synthesis brief

### 4.4 Mandatory Features Checklist

Ensure each page has:
- [ ] Dark mode support (use `dark:` variants)
- [ ] Responsive design (mobile-first)
- [ ] Smooth animations (Motion library or CSS transitions)
- [ ] Accessibility (semantic HTML, ARIA, reduced motion support)
- [ ] shadcn/ui components (Button, Card, Input)
- [ ] Design tokens applied

**Animation Checklist (if animation-builder invoked):**
- [ ] Hero section has entry animations (staggered title, subtitle, CTA)
- [ ] Sections fade in on scroll (using `whileInView` or `FadeInView`)
- [ ] Cards have hover micro-interactions
- [ ] Buttons have tap feedback
- [ ] Reduced motion is respected (`useReducedMotion`)

Mark task 4 as completed.

---

## Phase 5: Parallel Code Review

### 5.1 Launch Parallel Review

**CRITICAL**: Launch ALL 3 review agents in a SINGLE response for parallel execution.

```markdown
I will now launch parallel code review. All 3 agents will execute simultaneously.
```

**Task 1: Code Reviewer (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the code-reviewer agent.
  Read and follow: .claude/agents/code-reviewer.md

  FILES TO REVIEW:
  - All files in src/components/
  - All files in src/app/
  - src/styles/design-tokens.css

  TASK: Review code quality, React patterns, TypeScript usage

  Return: List of issues with severity (critical/warning/info) and file:line references
```

**Task 2: Security Auditor (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the security-auditor agent.
  Read and follow: .claude/agents/security-auditor.md

  FILES TO REVIEW:
  - All API routes in src/app/api/
  - All server actions in src/actions/
  - All form handling code

  TASK: Check for security vulnerabilities (XSS, CSRF, injection)

  Return: Security issues with severity and remediation steps
```

**Task 3: Accessibility Checker (model: haiku)**
```
subagent_type: "general-purpose"
model: haiku
prompt: |
  You are the accessibility-checker agent.
  Read and follow: .claude/agents/accessibility-checker.md

  FILES TO REVIEW:
  - All UI components in src/components/
  - All pages in src/app/

  TASK: Verify WCAG 2.1 AA compliance

  Return: Accessibility issues with WCAG references and fixes
```

### 5.2 Aggregate Review Results

```markdown
## Review Results

### Code Review
- Status: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED
- Issues: {count}
- Critical: {count}

### Security Audit
- Status: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED
- Vulnerabilities: {count}
- Critical: {count}

### Accessibility
- Status: ✅ PASSED / ⚠️ WARNINGS / ❌ FAILED
- Issues: {count}
- WCAG violations: {count}
```

### 5.3 Fix Critical Issues

If any critical issues found:
1. Fix immediately before proceeding
2. Re-run affected reviewer
3. Only continue when all critical issues resolved

**Security failures are BLOCKING** - never skip security fixes.

Mark task 5 as completed.

---

## Phase 6: Quality Assurance

### 6.1 Run Quality Gates

```bash
cd "$TARGET_DIR"
npm run typecheck  # Must pass with 0 errors
npm run lint       # Must pass with 0 errors
npm run build      # Must succeed
```

### 6.2 Fix Any Issues

If quality gates fail:
1. Read the error output
2. Fix the issues
3. Re-run until all pass

### 6.3 Visual Regression Testing

**If browser automation available:**

```markdown
## Visual Verification (Browser)

1. Start dev server:
   Bash: "npm run dev" (run in background)

2. Wait for server ready:
   Bash: "sleep 5"

3. Screenshot desktop (1440px):
   mcp__claude-in-chrome__navigate url: "http://localhost:3000"
   mcp__claude-in-chrome__computer action: "screenshot"
   # Save as visual-baselines/desktop-home.png

4. Screenshot tablet (768px):
   mcp__claude-in-chrome__resize_window width: 768, height: 1024
   mcp__claude-in-chrome__computer action: "screenshot"
   # Save as visual-baselines/tablet-home.png

5. Screenshot mobile (375px):
   mcp__claude-in-chrome__resize_window width: 375, height: 812
   mcp__claude-in-chrome__computer action: "screenshot"
   # Save as visual-baselines/mobile-home.png

6. Test dark mode:
   mcp__claude-in-chrome__javascript_tool text: "
     document.documentElement.classList.add('dark');
   "
   mcp__claude-in-chrome__computer action: "screenshot"
   # Save as visual-baselines/desktop-home-dark.png

7. Compare against synthesis brief expectations
```

**If browser automation NOT available:**

```markdown
## Visual Verification (Manual)

Ask user to verify:
1. Start `npm run dev`
2. Check responsive at 375px, 768px, 1440px
3. Verify dark mode toggle works
4. Confirm design matches synthesis brief
5. Report any issues
```

Mark task 6 as completed.

---

## Phase 7: Documentation

### 7.1 Generate Project Report

Write to `docs/project-report.md`:

```markdown
# {Project Name} - Build Report

## Project Overview
**Vision:** {user_description}
**Sector:** {sector}
**Built with patterns from:** {competitor_list}

## Competitor Research Summary

### Sites Analyzed
| Site | Key Patterns Used | Why Selected |
|------|-------------------|--------------|
| {site 1} | {patterns} | {reason} |
| {site 2} | {patterns} | {reason} |
| {site 3} | {patterns} | {reason} |

### Best Patterns Applied
1. **{Pattern}** - from {source} - {how we used it}
2. **{Pattern}** - from {source} - {how we used it}
3. **{Pattern}** - from {source} - {how we used it}

## What We Built

### Pages Created
| Page | Sections | Pattern Sources |
|------|----------|-----------------|
| Homepage | {sections} | Hero from {x}, Features from {y} |
| {Page 2} | {sections} | {sources} |

### Screenshots
- Desktop: `docs/screenshots/desktop-{page}.png`
- Mobile: `docs/screenshots/mobile-{page}.png`
- Dark mode: `docs/screenshots/dark-{page}.png`

### Technical Stack
- Framework: Next.js 14
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Accessibility: WCAG 2.1 AA compliant
- Responsive: Mobile-first
- Dark mode: Supported

## Quality Verification
- [x] TypeScript: No errors
- [x] Lint: No errors
- [x] Build: Successful
- [x] Code Review: Passed
- [x] Security Audit: Passed
- [x] Accessibility: Compliant
```

### 7.2 Generate Research Report

Write to `docs/research-report.md` using template:
- Full competitive analysis
- All sites analyzed with key takeaways
- Detailed pattern extraction
- Screenshots referenced (if captured)

### 7.2 Update CLAUDE.md

Add project-specific context:
- What the project does
- Key design decisions
- Tech stack specifics
- Design tokens location

### 7.4 Final Summary

Report to user:

```markdown
## Build Complete: {project-name}

### What We Built
**Your vision:** {description}
**Sector:** {sector}
**Inspired by:** {competitor_list}

### Key Patterns Applied
1. {Pattern 1} - from {source}
2. {Pattern 2} - from {source}
3. {Pattern 3} - from {source}

### Built
- {n} pages created
- Modern stack (Next.js 14, TypeScript, Tailwind)
- Dark mode + fully responsive
- WCAG 2.1 AA accessible

### Code Review
- Code Quality: ✅
- Security: ✅
- Accessibility: ✅

### Quality Gates
- TypeScript: ✅
- Lint: ✅
- Build: ✅

### Documentation
- `docs/project-report.md` - Full build report
- `docs/synthesis-brief.md` - Design decisions and rationale
- `docs/research-report.md` - Competitive analysis
- `docs/screenshots/` - Visual references

### Next Steps
1. Review the site: `npm run dev`
2. Add your content (text, images, etc.)
3. Deploy: `vercel deploy`

### Commands
cd {target-dir}/{project-name}
npm run dev      # Development
npm run build    # Production build
```

Mark task 7 as completed.

---

## Error Handling

| Issue | Solution |
|-------|----------|
| Project name exists | Ask user to confirm overwrite or use different name |
| No good sites found | Ask user for specific sites to analyze |
| WebSearch fails | Fall back to user-provided URLs |
| Browser unavailable | Continue with WebSearch/WebFetch only |
| Research agent fails | Retry once, continue with available data |
| Security review fails | BLOCKING - fix before proceeding |
| Build fails | Fix errors iteratively, re-run quality gates |
| Design doesn't match | Adjust and rebuild specific components |

---

## Tips for Best Results

1. **Be specific in your description** - "fintech dashboard for crypto portfolio tracking" > "finance website"
2. **Include target audience** - "for small business owners" helps us research the right competitors
3. **Use focus areas** - `--focus="analytics, charts"` helps prioritize which patterns matter most
4. **Mention key features** - If you need auth, forms, dashboards, say so in the description
5. **Review checkpoints** - Take time at approval points to guide direction
6. **Iterate after** - Use `/build` or Ralph Loop for refinements
7. **Skip research for simple sites** - Use `--skip-research` for basic landing pages

---

## Related Files

- `templates/synthesis-brief.md` - Template for synthesis output
- `templates/design-tokens.css` - Template for CSS variables
- `templates/research-report.md` - Template for documentation
- `examples/fintech-dashboard.md` - Example research + synthesis
- `examples/saas-landing.md` - Example research + synthesis
- `quality-gates.md` - Detailed quality checks
