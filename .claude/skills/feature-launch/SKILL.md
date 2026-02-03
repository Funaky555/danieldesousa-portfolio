---
name: feature-launch
description: "Launch a completed feature. Runs final checks and creates release notes."
invocable_by: user
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - TodoWrite
---

# /feature-launch - E2E Feature Development Skill

## Overview

The `/feature-launch` skill orchestrates complete feature development from planning to deployment, coordinating multiple agents through all phases. It includes **automatic complexity assessment** to determine if Ralph Loop should be used.

## Invocation

```
/feature-launch "<feature description>"
```

## Examples

```
/feature-launch "user authentication with OAuth and profile management"
/feature-launch "e-commerce checkout flow with cart and payments"
/feature-launch "dashboard with data visualizations and filtering"
/feature-launch "blog with MDX, categories, and search"
/feature-launch "multi-step form wizard with validation"
```

---

## Phase 0: Complexity Assessment (MANDATORY)

**Before any implementation, assess task complexity.**

### Complexity Scoring

| Factor | Points |
|--------|--------|
| New pages/routes | +1 each |
| Complex components | +1 each |
| API routes | +1 each |
| Authentication | +3 |
| Third-party APIs | +2 each |
| Database/ORM | +2 |
| Real-time features | +3 |
| File uploads | +2 |
| Payments | +3 |
| Email/notifications | +2 |
| Search/filtering | +1-2 |
| Multi-step forms | +2 |
| State management | +1-2 |

### Complexity Levels

| Score | Level | Approach |
|-------|-------|----------|
| 0-3 | Quick | Use `/build` instead |
| 4-7 | Standard | Structured phases, Ralph Loop optional |
| 8+ | **Epic** | **Ralph Loop REQUIRED** |

### Ralph Loop Decision

**If score >= 8 (Epic):**
```
/ralph-loop "<feature description>" --completion-promise "TASK COMPLETE" --max-iterations 20
```

Use template: `.claude/skills/build/ralph-templates/epic.md`

**If score 4-7 (Standard):**
- Continue with structured phases below
- Consider Ralph Loop for complex sub-phases

**If score 0-3 (Quick):**
- Use `/build` instead of `/feature-launch`

---

## Feature Development Lifecycle

### Phase 1: Discovery & Planning

**Activate: feature-builder conceptually**

1. **Analyze Requirements**
   - Parse feature description
   - Identify user stories
   - Define acceptance criteria

2. **Architecture Planning**
   - Identify pages/routes needed
   - Plan component hierarchy
   - Map API requirements
   - Define state management approach

3. **Create Development Plan**
   ```markdown
   ## Feature: [Name]

   ### Complexity Assessment
   - **Score**: [X] points
   - **Level**: [Quick/Standard/Epic]
   - **Ralph Loop**: [Yes/No]

   ### Pages/Routes
   1. /route-1 - Purpose
   2. /route-2 - Purpose

   ### Components
   - Component1
   - Component2

   ### API Routes
   - GET /api/resource
   - POST /api/resource

   ### State Management
   - Zustand store or React Query

   ### Implementation Approach
   [ ] Quick → Use /build
   [ ] Standard → Proceed with phases
   [x] Epic → Use Ralph Loop
   ```

4. **Confirm with User**
   - Present plan with complexity assessment
   - Clarify any ambiguities
   - Confirm Ralph Loop usage for Epic tasks

---

### Phase 2: Setup & Infrastructure

**Verify prerequisites:**

1. **shadcn/ui Verification**
   ```bash
   ls src/components/ui/
   ```
   If missing: `npx shadcn@latest init`

2. **Dependencies**
   - Install required packages
   - Configure environment variables

3. **Database Setup** (if needed)
   - Prisma schema
   - Migrations

---

### Phase 3: Data Layer

**Activate: api-builder agent**

1. **Create API Routes**
   - Route handlers in `src/app/api/`
   - Input validation with Zod
   - Error handling

2. **Create Data Services**
   - Database queries
   - External API integrations
   - Caching strategies

3. **Create Types**
   - Request/response types
   - Domain types
   - Validation schemas

---

### Phase 4: State Management

**Activate: state-manager agent**

1. **Create Stores/Hooks**
   - Zustand stores for complex state
   - React Query for server state
   - Custom hooks for reusable logic

2. **Implement State Logic**
   - Loading states
   - Error handling
   - Optimistic updates

---

### Phase 5: Presentation Layer

**Activate: component-builder, form-builder agents**

1. **Create Pages**
   - Server Components by default
   - Client Components where needed
   - Loading and error states

2. **Create Components**
   - Use shadcn/ui as base
   - Feature-specific components
   - Proper composition

3. **Apply Mandatory Defaults**
   - Dark mode support
   - Responsive design
   - Accessibility

---

### Phase 6: Navigation & Routing

1. **Configure Routes**
   - App Router structure
   - Dynamic routes
   - Route groups

2. **Implement Navigation**
   - Navigation components
   - Breadcrumbs
   - Back handling

3. **Protected Routes** (if auth)
   - Middleware
   - Route guards

---

### Phase 7: Quality Assurance

**Activate: styling-enforcer, accessibility-checker agents**

1. **Verify shadcn/ui Usage**
   - All buttons use Button component
   - All cards use Card component
   - cn() for class composition

2. **Dark Mode Check**
   - Semantic colors used
   - Both themes work

3. **Responsive Check**
   - Mobile layout works
   - Tablet layout works
   - Desktop layout works

4. **Accessibility Check**
   - ARIA labels
   - Keyboard navigation
   - Focus management

---

### Phase 8: Testing

**Activate: test-builder agent**

1. **Unit Tests**
   - Utility functions
   - Hooks
   - Services

2. **Component Tests**
   - Rendering
   - Interactions
   - State changes

3. **Integration Tests** (if applicable)
   - Full user flows
   - API integration

4. **Coverage Report**
   - Target: 80% for new code

---

### Phase 9: Security Review

**Activate: security-auditor agent**

1. **Check for vulnerabilities**
   - No hardcoded secrets
   - Input validation
   - CSRF protection
   - XSS prevention

---

### Phase 10: Code Review

**Activate: code-reviewer agent**

1. **Quality Review**
   - Architecture correct
   - Patterns followed
   - No anti-patterns

---

### Phase 11: Documentation

1. **Update CLAUDE.md**
   - Add feature to learnings
   - Document key decisions
   - Note patterns discovered

2. **Code Documentation**
   - Complex logic commented
   - Public APIs documented

---

## Quality Gates

Every build runs these checks:

1. **shadcn/ui**: Verify components in `src/components/ui/`
2. **TypeScript**: `npm run typecheck`
3. **Lint**: `npm run lint`
4. **Build**: `npm run build`
5. **Tests**: `npm run test`
6. **Dark Mode**: Verified
7. **Responsive**: Verified
8. **Code Review**: Passed
9. **Security**: Passed

---

## Output

After completing `/feature-launch`, I provide:

```markdown
## Feature Launch Complete: [Feature Name]

### Complexity Assessment
- **Score**: [X] points
- **Level**: [Quick/Standard/Epic]
- **Ralph Loop Used**: [Yes/No]

### Summary
Successfully implemented [feature] with [key highlights].

### Files Created

**Pages**
- `src/app/[route]/page.tsx` - [purpose]

**Components**
- `src/components/[name].tsx` - [purpose]

**API**
- `src/app/api/[route]/route.ts` - [purpose]

**Tests**
- `src/[name].test.tsx` - [what's tested]

### Quality Gates
- ✅ shadcn/ui verified
- ✅ TypeScript (0 errors)
- ✅ Lint (0 errors)
- ✅ Build successful
- ✅ Tests passing
- ✅ Dark mode works
- ✅ Responsive design
- ✅ Security audit passed
- ✅ Code review approved

### Documentation
- CLAUDE.md updated with learnings
- Key decisions documented

### Next Recommended Steps
1. [Optional enhancement 1]
2. [Optional enhancement 2]
```

---

## Ralph Loop Integration

### When Ralph Loop is Triggered

Ralph Loop is **automatically triggered** when:
- Complexity score >= 8 points (Epic level)
- Feature spans 6+ files
- Multiple pages with shared state
- Full-stack feature (UI + API + DB)

### Ralph Loop Execution

For Epic features, `/feature-launch` converts to Ralph Loop mode:

```
/ralph-loop "Build [feature] with phases:
1. Data Layer (API routes, services, types)
2. State Management (stores, hooks)
3. Presentation (pages, components)
4. Navigation & Routing
5. Quality & Polish (tests, a11y, responsive)"
--completion-promise "TASK COMPLETE"
--max-iterations 20
```

### Templates

Located at `.claude/skills/build/ralph-templates/`:
- `epic.md` - Multi-phase features (auth, dashboard, etc.)
- `clone.md` - Website cloning tasks

### Phase Completion

Each phase must pass quality gates before proceeding:
- `npm run typecheck` - Zero errors
- `npm run lint` - Code style OK
- `npm run build` - Compiles successfully

Final completion signal:
```
<promise>TASK COMPLETE</promise>
```

---

## Complexity Quick Reference

| Complexity | Score | Action |
|------------|-------|--------|
| Quick | 0-3 | Use `/build` instead |
| Standard | 4-7 | Proceed with phases |
| Epic | 8+ | **Ralph Loop required** |

**Always run `/assess` first if unsure about complexity.**
