# Build Routing Logic

## Intent Detection

### Keywords → Actions

| Keywords | Action |
|----------|--------|
| "clone", "copy design", "replicate", "look like" | → Clone workflow |
| "form", "input", "validation", "submit" | → Activate form-builder |
| "auth", "login", "signup", "protected" | → Activate api-builder + security focus |
| "dashboard", "admin", "panel" | → Multi-section epic |
| "landing", "homepage", "marketing" | → Component-heavy standard |
| "api", "endpoint", "route", "fetch" | → Activate api-builder |
| "style", "design", "css", "tailwind" | → Activate styling-enforcer |
| "performance", "optimize", "fast" | → Activate performance-auditor |
| "accessible", "a11y", "screen reader" | → Activate accessibility-checker |
| "state", "store", "zustand", "jotai", "react query" | → Activate state-manager |
| "animation", "motion", "animate", "transition" | → Activate animation-builder |
| "seo", "metadata", "opengraph", "sitemap" | → Activate seo-optimizer |
| "image", "images", "gallery", "photo" | → Activate image-optimizer |
| "test", "testing", "e2e", "unit test" | → Activate test-builder |

### Scope Detection

**Single Component Signals:**
- "add a button"
- "create a card"
- "make a header"
- "build a [component]"

**Page Signals:**
- "page", "route", "screen"
- "landing page", "about page"
- "/path" mentions

**Feature Signals:**
- "feature", "functionality"
- "add [capability]"
- "implement [system]"

**Full App Signals:**
- "full", "complete", "entire"
- "app", "application", "site"
- "from scratch"

## Complexity Scoring

### Score Factors

| Factor | Points |
|--------|--------|
| Single file change | 1 |
| Multiple files (2-5) | 2 |
| Many files (5+) | 3 |
| Needs state management | +1 |
| Needs API integration | +1 |
| Needs authentication | +2 |
| Multiple pages | +2 |
| Database operations | +1 |
| Third-party integrations | +1 |
| Clone request | +3 |

### Complexity Thresholds

| Score | Complexity | Approach |
|-------|------------|----------|
| 1-2 | Quick | One-shot |
| 3-5 | Standard | Structured |
| 6+ | Epic | Ralph Loop |

## Agent Selection Matrix

```
Request Analysis
       │
       ▼
┌──────────────────────────────────────────────────┐
│ Always Active:                                   │
│ - styling-enforcer (Tailwind/shadcn patterns)   │
│ - server-components (RSC decisions)             │
│ - image-optimizer (next/image best practices)   │
└──────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│ Conditional Activation:                          │
│                                                  │
│ UI Components?   ──→ component-builder          │
│ Forms?           ──→ form-builder               │
│ API/Data?        ──→ api-builder                │
│ Performance?     ──→ performance-auditor        │
│ Accessibility?   ──→ accessibility-checker      │
│ State Mgmt?      ──→ state-manager              │
│ Animations?      ──→ animation-builder          │
│ SEO/Marketing?   ──→ seo-optimizer              │
│ Tests Needed?    ──→ test-builder               │
└──────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│ Always Run at End:                               │
│ - code-reviewer                                  │
│ - security-auditor                              │
└──────────────────────────────────────────────────┘
```

## Skill Activation

### Clone Website
**Triggers:**
- Explicit clone request
- Reference to specific website to replicate

**Actions:**
1. Activate `clone-website` skill
2. Activate `browser-automation` skill
3. Set up Ralph Loop with clone template
4. Set completion promise: "CLONE COMPLETE"

### React Best Practices
**Triggers:**
- Always active as reference
- Explicitly consulted for performance concerns

**Actions:**
1. Reference rules during implementation
2. Run performance-auditor for validation

## Phase Breakdown (Epic Tasks)

When complexity is Epic, break into phases:

### Standard Feature Epic
```
Phase 1: Setup & Foundation
- Project structure
- Core dependencies
- Base layout

Phase 2: Core Components
- Main UI components
- Shared components

Phase 3: Data Layer
- API routes / Server Actions
- Data fetching

Phase 4: Integration
- Connect components to data
- State management

Phase 5: Polish
- Loading states
- Error handling
- Edge cases
```

### Clone Epic
```
Phase 1: Layout Structure
- Header/Nav
- Main sections
- Footer

Phase 2: Hero Section
- Match layout
- Match styling

Phase 3: Feature Sections
- Each major section

Phase 4: Details
- Typography
- Spacing
- Colors

Phase 5: Responsive
- Mobile
- Tablet
- Desktop polish
```

### Auth Epic
```
Phase 1: Setup
- Auth provider config
- Database schema

Phase 2: UI
- Login page
- Signup page
- Forgot password

Phase 3: Logic
- Server actions
- Session management

Phase 4: Protection
- Middleware
- Protected routes

Phase 5: Polish
- Error handling
- Loading states
- Redirects
```
