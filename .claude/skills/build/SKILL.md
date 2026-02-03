---
name: build
description: "Universal dispatcher for all development tasks. Analyzes complexity, routes to agents, ensures quality gates pass."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
  - Task
  - Bash
  - TodoWrite
---

# /build - Universal Dispatcher Skill

## Overview

The `/build` skill is the single entry point for all development tasks. It analyzes your request, determines the complexity, routes to appropriate agents and skills, and ensures quality through automated checks.

## Invocation

```
/build <description of what you want>
```

## Examples

```
/build landing page with hero, features, pricing, and footer
/build clone stripe.com homepage
/build add dark mode toggle to the navbar
/build full auth system with login, signup, and password reset
/build contact form with validation
/build dashboard with sidebar navigation and overview stats
```

---

## MANDATORY DEFAULTS (Always Applied)

### shadcn/ui (REQUIRED - DO NOT SKIP)
- **ALWAYS** verify shadcn/ui is installed before building
- Check: `ls src/components/ui/` - must contain button.tsx, card.tsx, etc.
- If NOT installed: `npx shadcn@latest init` then `npx shadcn@latest add button card input badge`
- Verify cn() utility: `cat src/lib/utils.ts`
- **ALL buttons must use shadcn Button, ALL cards must use shadcn Card**

**NEVER build UI components without shadcn initialized!**

### Dark Mode
- **ALWAYS** implement dark mode support unless user explicitly opts out
- Use semantic colors: `bg-background`, `text-foreground`, `bg-card`
- NEVER use hardcoded colors like `bg-white`, `text-black`
- Include theme toggle if building navigation

**Skip only if user says**: "no dark mode", "light only", "skip dark mode"

### Responsive Design
- **ALWAYS** build mobile-first responsive layouts
- Test breakpoints: 375px, 768px, 1440px
- Use responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Never build desktop-only layouts.**

### Unit Tests
- **ALWAYS** write tests after completing features
- Colocate tests: `Component.tsx` → `Component.test.tsx`
- Test interactions, edge cases, loading/error states

---

## How It Works

### Phase 1: Parallel Research (NEW)

Before implementation, launch research agents in parallel:
1. `codebase-pattern-researcher` - Find existing patterns to follow
2. `framework-docs-researcher` - Get industry recommendations
3. `framework-docs-researcher` - Get relevant API documentation

Wait for all research to complete before proceeding.

### Phase 1b: Analysis

When you invoke `/build`, I will:

1. **Parse Intent**: What are you trying to build?
2. **Identify Scope**: Components, pages, features, or full app?
3. **Assess Complexity**: Quick, standard, or epic?
4. **Detect Special Cases**: Cloning? Forms? Auth?
5. **Check Opt-outs**: Did user explicitly opt out of dark mode?

### Phase 2: Planning

Based on analysis:

| Complexity | Criteria | Approach |
|------------|----------|----------|
| **Quick** | Single component, < 1 file, clear scope | One-shot implementation |
| **Standard** | 2-5 files, clear requirements | Structured implementation |
| **Epic** | 5+ files, multiple features, architectural decisions | Break into phases, use Ralph Loop |
| **Clone** | Website cloning request | Activate clone-website skill + Ralph |

### Phase 2b: Task Parallelization Assessment (MANDATORY)

**Always evaluate if work can be split into parallel tasks.**

Ask these questions:
1. Are there 3+ independent sub-tasks?
2. Can any work run simultaneously without dependencies?
3. Would parallel execution significantly speed up delivery?

**If YES to any:**
1. Use `TaskCreate` to create discrete work units
2. Use `Task` tool to spawn parallel subagents
3. Monitor with `TaskList` until all complete
4. Aggregate results

**Parallelizable work patterns:**
- Multiple pages (each page = 1 task)
- Multiple components (each component = 1 task)
- Research + implementation (run research in parallel)
- Tests for different modules (each test file = 1 task)
- Code review + security audit (run in parallel)

**NOT parallelizable:**
- Sequential dependencies (layout → page → components)
- Single file changes
- Quick complexity tasks (overhead not worth it)

### Phase 3: Routing

I will activate relevant agents based on the task:

| Task Involves | Agents Activated |
|---------------|------------------|
| UI Components | `component-builder`, `styling-enforcer` |
| Data Display | `server-components` |
| Forms | `form-builder` |
| API/Data | `api-builder` |
| Performance-critical | `performance-auditor` |
| User-facing UI | `accessibility-checker` |
| State Management | `state-manager` |
| Animations | `animation-builder` |
| SEO/Marketing | `seo-optimizer` |
| Images | `image-optimizer` |

### Phase 4: Execution

**Quick Tasks:**
```
Analyze → Implement (dark mode + responsive) → Tests → Quality Gates → Done
```

**Standard Tasks (with parallelization):**
```
Analyze → Plan → TaskCreate (if parallelizable) → Parallel Subagents → Tests → Quality Gates → Done
```

**Epic Tasks (with parallelization):**
```
Analyze → Break into Phases → TaskCreate per phase → Parallel execution where possible → Quality Gates → Done
```

**Clone Tasks:**
```
Analyze → Activate clone-website → [Ralph Loop: Screenshot → Build → Compare] → Tests → Quality Gates → Done
```

**Task Execution Example:**
```
# For "build landing page with hero, features, pricing, footer"

TaskCreate: "Build Hero section"
TaskCreate: "Build Features section" (can run parallel)
TaskCreate: "Build Pricing section" (can run parallel)
TaskCreate: "Build Footer section" (can run parallel)

→ 4 subagents work simultaneously
→ TaskList monitors progress
→ Aggregate and integrate results
```

### Phase 4b: Parallel Quality (NEW)

After implementation, run `/parallel-quality` to:
- Fix import ordering
- Detect duplications
- Validate types

### Phase 5: Parallel Review (NEW)

Run `/parallel-review` for comprehensive code review:
- Code quality check
- Security audit
- Duplication detection

### Phase 5b: Quality Gates

Every build runs these checks before completion:

1. **shadcn/ui**: Verify `src/components/ui/` has required components
2. **TypeScript**: `npm run typecheck`
3. **Lint**: `npm run lint`
4. **Build**: `npm run build`
5. **Tests**: `npm run test`
6. **Dark Mode**: Verify both themes work
7. **Responsive**: Verify mobile/tablet/desktop
8. **Design Polish**: `/frontend-design` - Ensure production-grade aesthetics
9. **Code Review**: `code-reviewer` agent
10. **Security Audit**: `security-auditor` agent

**Design Polish (Gate 8) Details:**
- Run `/frontend-design` to enhance visual quality
- Ensure distinctive, non-generic aesthetics
- Avoid typical AI-generated look
- Add subtle refinements that elevate the design
- This gate is MANDATORY for all UI-related builds

**shadcn/ui Verification Commands:**
```bash
# Check shadcn is initialized
ls src/components/ui/

# Verify cn() utility exists
grep -l "export function cn" src/lib/utils.ts

# Check components use shadcn imports (should find matches)
grep -r "@/components/ui/button" src/

# Check for violations (should find NO matches)
grep -r "className=\".*bg-blue-500.*px-4.*py-2" src/  # Custom button styling
```

### Phase 6: Post-Feature Workflow (MANDATORY)

After every build completes:

1. **Write Unit Tests** for all new components/features
2. **Knowledge Capture (NEW)**: If novel solutions were implemented:
   - Suggest running `/compound` to capture reusable patterns
   - Suggest running `/learn` if mistakes were made
3. **Update CLAUDE.md** with learnings:
   - What was built
   - Key decisions made
   - Patterns discovered
   - Issues encountered
3. **Evaluate Knowledge Capture** using this checklist:

| Question | Action if Yes |
|----------|---------------|
| Did I solve a problem in a reusable way? | Document in `references/patterns/` |
| Did I create a pattern worth extracting? | Consider creating a new agent |
| Did I repeat myself across files? | Consider creating a utility or hook |
| Did I learn something about the codebase? | Add to CLAUDE.md learnings |
| Would this be useful for future features? | Create or update a skill |
| Did I encounter a tricky edge case? | Document in error-recovery.md |

4. **Consider New Agents/Skills**

If during development you notice:
- A repeated pattern that could be automated → **Create an agent**
- A multi-step workflow that's common → **Create a skill**
- A decision tree that's complex → **Document in existing agent**

**Template for proposing new agent:**
```markdown
## Proposed Agent: [name]

### Purpose
[What problem does it solve?]

### When to Use
[Trigger conditions]

### Key Patterns
[Main code patterns it would provide]
```

---

## Ralph Loop Integration

For epic or clone tasks, I use Ralph Loop for iterative development:

```
/ralph-loop "<task description>" --completion-promise "TASK COMPLETE" --max-iterations <n>
```

**When I use Ralph:**
- Epic-level features (5+ files)
- Website cloning (iterative visual matching)
- Tasks requiring refinement cycles

**Completion Signal:**
```
<promise>TASK COMPLETE</promise>
```

## Complexity Assessment (Scoring Rubric)

### Scoring Criteria (0-100 points)

| Criteria | Points | How to Detect |
|----------|--------|---------------|
| **Sub-tasks Count** | 0-25 | Count implicit tasks in description |
| | 0 pts | 1 task implied |
| | 10 pts | 2-3 tasks implied |
| | 20 pts | 4-6 tasks implied |
| | 25 pts | 7+ tasks implied |
| **UI Components** | 0-20 | Count screens/components mentioned |
| | 0 pts | 1-2 components |
| | 10 pts | 3-5 components |
| | 20 pts | 6+ components |
| **User Flows** | 0-20 | Count distinct user journeys |
| | 0 pts | 1 flow |
| | 10 pts | 2-3 flows |
| | 20 pts | 4+ flows |
| **Scope Breadth** | 0-20 | Count features/areas touched |
| | 0 pts | 1 area |
| | 10 pts | 2-3 areas |
| | 20 pts | 4+ areas |
| **Description Length** | 0-15 | Word count of description |
| | 0 pts | < 50 words |
| | 8 pts | 50-150 words |
| | 15 pts | > 150 words |

### Classification Thresholds

| Score | Classification | Approach |
|-------|----------------|----------|
| < 40 | 🟢 SIMPLE | One-shot implementation |
| 40-59 | 🟡 MEDIUM | Structured implementation, ask user preference |
| 60+ | 🔴 COMPLEX | Break into phases, use /implement-epic |

### Override Rules (Always Upgrade Complexity)

| Condition | Minimum Level | Reason |
|-----------|---------------|--------|
| New database/data models | Medium | Data architecture decisions |
| Authentication/Security | Medium | Security review required |
| Multiple new pages | Complex | Navigation & state coordination |
| Cross-feature integration | Complex | Architectural decisions |
| Third-party API integration | Medium | API discovery needed |
| User explicitly requests review | Complex | Honor user preference |

> **When in doubt, upgrade complexity.** The overhead of planning is small compared to the cost of a mis-implemented feature.

### Quick (< 40 points)
- Single component addition
- Style adjustments
- Copy/text changes
- Bug fixes with clear cause
- Adding simple utility functions

### Standard (40-59 points)
- New page with clear sections
- Component with moderate complexity
- Form with validation
- API route with basic logic
- Feature within existing architecture

### Epic (60+ points)
- Multiple interconnected pages
- Full feature with UI + API + State
- Authentication system
- Dashboard with multiple sections
- Website clone
- Anything requiring architectural decisions

## Special Handling

### Clone Detection
If request contains:
- "clone [website]"
- "copy [website] design"
- "make it look like [website]"
- "replicate [website]"

→ Activate `clone-website` skill

### Form Detection
If request involves:
- Forms, inputs, validation
- User registration, login
- Contact, feedback forms
- Settings, profile editing

→ Activate `form-builder` agent

### Auth Detection
If request involves:
- Authentication, authorization
- Login, signup, logout
- Sessions, tokens
- Protected routes

→ Add extra security checks

### Dark Mode Opt-Out Detection
If request contains:
- "no dark mode"
- "light mode only"
- "skip dark mode"
- "without dark mode"

→ Skip dark mode implementation (rare)

## Output

After completion, I provide:

```markdown
## Build Complete

### What Was Built
- [List of features/components]

### Files Created/Modified
- `path/to/file.tsx` - [description]
- `path/to/file.test.tsx` - [tests for component]

### Quality Gate Results
- shadcn/ui: ✅ (components in src/components/ui/)
- TypeScript: ✅
- Lint: ✅
- Build: ✅
- Tests: ✅
- Dark Mode: ✅
- Responsive: ✅
- Design Polish: ✅ (frontend-design applied)
- Code Review: ✅
- Security: ✅

### Tests Written
- `ComponentName.test.tsx` - [what's tested]

### CLAUDE.md Updated
- Added learning: [brief description]

### Knowledge Capture
- New pattern documented: [yes/no]
- New agent proposed: [yes/no]
- New skill proposed: [yes/no]

### Notes
- [Any warnings or recommendations]
```

## Workflow Files

Supporting files for this skill:

- `routing.md` - Detailed routing logic
- `quality-gates.md` - Quality check specifications
- `ralph-templates/epic.md` - Template for epic Ralph loops
- `ralph-templates/clone.md` - Template for clone Ralph loops
