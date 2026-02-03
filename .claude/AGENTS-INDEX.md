# Agents Index

This document lists all available agents and their purposes. Agents are automatically activated by the `/build` skill based on task type.

---

## Orchestrator Agents (NEW)

Orchestrator agents compose other agents, enabling powerful parallel and sequential workflows.

| Agent | Type | Purpose |
|-------|------|---------|
| `feature-orchestrator` | orchestrator | **Primary orchestrator** - Composes research, build, and review agents for complete feature development. Runs 3 research agents in parallel, then sequential builds, then 3 review agents in parallel (~2-3x faster than sequential). |

### Agent Composition Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 1: PARALLEL RESEARCH (~2x faster)            │
├─────────────────┬─────────────────┬─────────────────────────────┤
│ codebase-       │ best-practices- │ framework-docs-             │
│ pattern-        │ researcher      │ researcher                  │
│ researcher      │                 │                             │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 2: SEQUENTIAL BUILD (conditional agents)     │
│  component-builder → [form-builder] → [api-builder] → tests     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 3: PARALLEL REVIEW (~3x faster)              │
├─────────────────┬─────────────────┬─────────────────────────────┤
│ code-reviewer   │ security-       │ accessibility-              │
│                 │ auditor         │ checker                     │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

### Agent Types

| Type | Description | Can Delegate? |
|------|-------------|---------------|
| **Leaf** | Performs actual work (component-builder, api-builder, etc.) | ❌ |
| **Orchestrator** | Composes other agents (feature-orchestrator) | ✅ |
| **Hybrid** | Can do work AND delegate | ✅ |

### Usage

The orchestrator is automatically activated for tasks scoring 40+ on complexity. You can also invoke it directly:

```
"Use @feature-orchestrator for this complex feature"
"/build user profile with edit form and avatar upload"  # Auto-triggers orchestrator
```

### Documentation

- Full composition system: `.claude/references/agent-composition.md`
- Orchestrator implementation: `.claude/agents/feature-orchestrator.md`

---

## Research Agents

Agents for researching patterns, best practices, and documentation before implementation.

| Agent | Purpose | Invoked By |
|-------|---------|------------|
| `sector-researcher` | **NEW** Research top websites in a sector, extract best UI/UX patterns, synthesize unique design | /research-clone, manual |
| `git-history-analyzer` | Trace code evolution and contributors | feature-builder, /plan, /context |
| `codebase-pattern-researcher` | Analyze existing patterns for consistency | feature-builder, feature-scaffold, /build |
| `framework-docs-researcher` | Research framework APIs, examples, and best practices | feature-builder, various builders, /context, /plan |

### Usage Examples

```
"Use @sector-researcher to analyze top fintech dashboards"
"Use @git-history-analyzer to understand how authentication evolved"
"Use @framework-docs-researcher to find Next.js patterns for caching"
"Use @codebase-pattern-researcher before adding a new component"
"Use @framework-docs-researcher to look up shadcn/ui patterns"
```

### sector-researcher (NEW)
**File**: `.claude/agents/sector-researcher.md`

Research top websites in a specific industry/sector and extract the best UI/UX patterns to synthesize into a unique, best-in-class design.

**Responsibilities:**
- Identify top 3-5 websites in a sector
- Deep analysis of each site's UI/UX patterns
- Create comparison scoring matrix
- Generate synthesis brief combining winning patterns
- Extract design tokens for implementation

**Workflow:**
1. Web search for industry leaders
2. Browser extension to analyze each site
3. Score patterns across sites
4. Generate synthesis brief
5. Feed to frontend-design for generation

**Integration:**
- Uses Claude browser extension for site analysis
- Uses Playwright for visual regression testing
- Outputs to frontend-design skill

**Activated by:** `/research-clone`, sector research requests

---

## Quick Reference

| Agent | Purpose | Auto-Activated When |
|-------|---------|---------------------|
| `component-builder` | Build React components | Building UI components |
| `server-components` | RSC vs 'use client' decisions | Any component creation |
| `form-builder` | Forms with validation | Forms, inputs, validation |
| `styling-enforcer` | Tailwind patterns, cn() | Any styling work |
| `api-builder` | Route handlers, server actions | API/data work |
| `performance-auditor` | 45 performance rules | Performance-critical code |
| `accessibility-checker` | WCAG compliance | User-facing UI |
| `code-reviewer` | Code quality review | Post-feature (quality gate) |
| `security-auditor` | Security vulnerabilities | Post-feature (quality gate) |
| `state-manager` | Zustand, Jotai, React Query | State management tasks |
| `test-builder` | Vitest + agent-browser | Test creation |
| `animation-builder` | Framer Motion | Animation tasks |
| `seo-optimizer` | Metadata, OpenGraph, JSON-LD, sitemap | Marketing/SEO pages, metadata config |
| `image-optimizer` | next/image patterns | Image handling |

---

## Core Agents

### component-builder
**File**: `.claude/agents/component-builder.md`

Build React components with shadcn/ui and Tailwind CSS.

**Responsibilities:**
- Component structure and organization
- shadcn/ui component usage
- Props interface design
- TypeScript typing
- Dark mode support
- Responsive design

**Activated by:** UI component requests

---

### server-components
**File**: `.claude/agents/server-components.md`

Decide between React Server Components and 'use client' directive.

**Responsibilities:**
- RSC vs Client component decisions
- Data fetching patterns
- Hydration considerations
- Performance optimization

**Activated by:** Any component creation (auto-loaded)

---

### form-builder
**File**: `.claude/agents/form-builder.md`

Build forms with react-hook-form, zod validation, and shadcn/ui.

**Responsibilities:**
- Form structure with react-hook-form
- Zod schema validation
- Error handling and display
- Accessible form controls
- Submit handling

**Activated by:** Form, input, validation tasks

---

### styling-enforcer
**File**: `.claude/agents/styling-enforcer.md`

Enforce Tailwind CSS patterns and cn() utility usage.

**Responsibilities:**
- Tailwind class organization
- cn() utility for conditionals
- Semantic color usage
- Responsive class patterns
- Dark mode class patterns

**Activated by:** Any styling work (auto-loaded)

---

### api-builder
**File**: `.claude/agents/api-builder.md`

Build Next.js API route handlers and server actions.

**Responsibilities:**
- Route handler structure
- Server action patterns
- Request/response handling
- Error handling
- Type safety

**Activated by:** API, backend, data tasks

---

## Quality Agents

### performance-auditor
**File**: `.claude/agents/performance-auditor.md`

Apply Vercel's 45 performance optimization rules.

**Responsibilities:**
- Bundle size optimization
- Re-render prevention
- Async/loading patterns
- Caching strategies
- JavaScript micro-optimizations

**References:** `skills/react-best-practices/references/rules/`

**Activated by:** Performance-critical code, optimization requests

---

### accessibility-checker
**File**: `.claude/agents/accessibility-checker.md`

Ensure WCAG compliance and keyboard navigation.

**Responsibilities:**
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader compatibility
- Color contrast

**Activated by:** User-facing UI components

---

### code-reviewer
**File**: `.claude/agents/code-reviewer.md`

Review code quality and best practices.

**Responsibilities:**
- Code structure review
- TypeScript best practices
- React patterns
- Performance considerations
- Maintainability

**Activated by:** Quality gate (post-feature)

---

### security-auditor
**File**: `.claude/agents/security-auditor.md`

Check for security vulnerabilities.

**Responsibilities:**
- XSS prevention
- CSRF protection
- Input sanitization
- Auth security
- Data exposure risks

**Activated by:** Quality gate (post-feature)

---

### duplication-detector
**File**: `.claude/agents/duplication-detector.md`

Detect code duplication and suggest refactoring opportunities.

**Responsibilities:**
- Find duplicate code patterns
- Identify similar implementations
- Suggest refactoring opportunities
- Recommend utility/hook extractions
- Find copy-paste patterns

**Activated by:** `/parallel-review`, `/parallel-quality`, quality gate

---

### import-fixer
**File**: `.claude/agents/import-fixer.md`

Fix import organization and remove unused imports.

**Responsibilities:**
- Remove unused imports
- Fix import order (React → Next → external → internal → types)
- Enforce path aliases (@/)
- Separate type imports
- Fix server/client boundary violations

**Activated by:** `/parallel-quality`, import issues detected

---

### type-sync
**File**: `.claude/agents/type-sync.md`

Ensure type consistency across the codebase.

**Responsibilities:**
- Sync API types with backend
- Verify Zod schemas match types
- Check component prop types
- Ensure hook return types
- Transform functions for API boundaries

**Activated by:** `/parallel-quality`, type inconsistencies, API changes

---

### test-builder
**File**: `.claude/agents/test-builder.md`

Create tests with Vitest and agent-browser.

**Responsibilities:**
- Unit test structure
- Component testing
- Integration tests
- Visual testing with agent-browser
- Coverage requirements

**Activated by:** Test creation, post-feature workflow

---

## Next.js 15 Specialized Agents (NEW)

### i18n-builder
**File**: `.claude/agents/i18n-builder.md`

Build internationalization support using next-intl for App Router.

**Responsibilities:**
- next-intl configuration and routing
- Message catalogs and namespaces
- Server/client component translations
- Language switcher components
- RTL support

**Activated by:** Multi-language requests, localization tasks

---

### auth-flow-builder
**File**: `.claude/agents/auth-flow-builder.md`

Implement authentication with NextAuth.js v5 (Auth.js).

**Responsibilities:**
- NextAuth.js v5 configuration
- OAuth and credentials providers
- Middleware protection
- Role-based access control
- Session management

**Activated by:** Authentication tasks, login/signup flows

---

### caching-strategy
**File**: `.claude/agents/caching-strategy.md`

Implement optimal caching for Next.js 15 with new defaults.

**Responsibilities:**
- Next.js 15 caching changes (no-store default)
- Tag-based revalidation
- unstable_cache for non-fetch
- React cache for deduplication
- Route segment config

**Activated by:** Performance optimization, data fetching patterns

---

### streaming-architect
**File**: `.claude/agents/streaming-architect.md`

Design streaming patterns with React Suspense.

**Responsibilities:**
- Suspense boundary placement
- Skeleton component design
- Loading.tsx patterns
- Error boundary integration
- Progressive enhancement

**Activated by:** Loading states, streaming requests

---

### ppr-builder
**File**: `.claude/agents/ppr-builder.md`

Implement Partial Prerendering for static/dynamic mix.

**Responsibilities:**
- PPR configuration
- Static shell design
- Dynamic hole placement
- Suspense integration
- Performance optimization

**Activated by:** PPR requests, instant load optimization

---


### parallel-routes-builder
**File**: `.claude/agents/parallel-routes-builder.md`

Build parallel and intercepting routes for complex layouts.

**Responsibilities:**
- @slot configuration
- Intercepting routes for modals
- Default.tsx patterns
- Conditional rendering
- Tab and split views

**Activated by:** Modal routing, split views, complex layouts

---

## Specialized Agents

### state-manager
**File**: `.claude/agents/state-manager.md`

Implement state management with Zustand, Jotai, or React Query.

**Responsibilities:**
- Store structure (Zustand)
- Atom patterns (Jotai)
- Query/mutation patterns (React Query)
- State persistence
- Optimistic updates

**Activated by:** State management tasks

---

### animation-builder
**File**: `.claude/agents/animation-builder.md`

Create animations with Framer Motion.

**Responsibilities:**
- Motion components
- Variants and transitions
- Gesture handling
- Layout animations
- Performance considerations

**Activated by:** Animation requests

---

### seo-optimizer
**File**: `.claude/agents/seo-optimizer.md`

Optimize for search engines and social sharing. Includes metadata building.

**Responsibilities:**
- Static and dynamic metadata
- OpenGraph and Twitter cards
- Structured data (JSON-LD)
- Sitemap and robots.txt generation
- Dynamic OG images
- Semantic HTML structure

**Activated by:** Marketing pages, SEO tasks, metadata configuration

---

### image-optimizer
**File**: `.claude/agents/image-optimizer.md`

Optimize images with next/image.

**Responsibilities:**
- next/image component usage
- Placeholder strategies
- Responsive images
- Lazy loading
- Format optimization

**Activated by:** Image handling tasks

---

## Agent Activation Matrix

| Task Type | Primary Agents | Supporting Agents |
|-----------|---------------|-------------------|
| Landing Page | component-builder, styling-enforcer | seo-optimizer, image-optimizer |
| Dashboard | component-builder, state-manager | server-components, accessibility-checker |
| Form/Auth | form-builder, api-builder | security-auditor, test-builder |
| API Route | api-builder | security-auditor |
| Animation | animation-builder, component-builder | performance-auditor |
| Clone Task | component-builder, styling-enforcer | image-optimizer, seo-optimizer |
| **Research Clone** | **sector-researcher**, component-builder | styling-enforcer, frontend-design skill |
| **Modernize Old Site** | content-extractor (via skill), component-builder | accessibility-checker, code-reviewer |

---

## Creating New Agents

If you identify a repeated pattern that should become an agent:

```markdown
# Agent: [name]

## Purpose
[What problem does this agent solve?]

## When to Activate
[Trigger conditions]

## Key Patterns
[Code patterns this agent provides]

## Checklist
- [ ] Step 1
- [ ] Step 2
- [ ] ...

## Examples
[Code examples]
```

Save to `.claude/agents/[name].md` and update `.claude/project-config.json`.
