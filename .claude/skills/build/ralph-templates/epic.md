# Ralph Template: Epic Feature

## Usage

```
/ralph-loop "<TASK_DESCRIPTION>" --completion-promise "TASK COMPLETE" --max-iterations 20
```

## Template Prompt

```markdown
## Task: [FEATURE DESCRIPTION]

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)

### Current Phase: [PHASE_NUMBER] of [TOTAL_PHASES]
[PHASE_DESCRIPTION]

### Phase Objectives
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

### Previous Progress
[What has been completed in previous iterations]

### This Iteration
1. Check current state of implementation
2. Identify what's missing or broken
3. Implement next piece
4. Verify it works
5. Document progress

### Quality Checks (run after each iteration)
- `npm run typecheck` - Must pass
- `npm run lint` - Must pass
- Manual verification - Must work as expected

### Phase Completion Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### When This Phase is Complete
- Update "Previous Progress" section
- Move to next phase
- If all phases complete, proceed to Design Polish

### Design Polish Phase (MANDATORY - Final Step)
Before signaling completion, run `/frontend-design` to:
- Enhance visual quality to production-grade
- Ensure distinctive, non-generic aesthetics
- Add refinements that elevate the design
- Verify high design quality standards

After design polish: <promise>TASK COMPLETE</promise>

### Important Guidelines
- Use Server Components by default
- Add 'use client' only when needed
- Use shadcn/ui components from @/components/ui/
- Use cn() for class composition
- Follow existing project patterns
```

## Example: Dashboard Feature

```markdown
## Task: Build User Dashboard with Profile, Settings, and Activity

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)

### Phases Overview
1. Dashboard Layout Shell
2. Profile Section
3. Settings Section
4. Activity History
5. Integration & Polish

### Current Phase: 1 of 5
Dashboard Layout Shell - Create the main dashboard layout with sidebar navigation and header.

### Phase 1 Objectives
1. Create dashboard layout with sidebar
2. Add navigation links
3. Add header with user menu
4. Set up routing structure

### Previous Progress
- None (starting fresh)

### This Iteration
1. Check if dashboard route exists
2. Create layout.tsx with sidebar
3. Add navigation component
4. Add header component
5. Verify navigation works

### Quality Checks
- `npm run typecheck` - Must pass
- `npm run lint` - Must pass
- Navigation should be functional

### Phase 1 Completion Criteria
- [ ] Dashboard layout renders
- [ ] Sidebar shows navigation
- [ ] Header shows user info
- [ ] Routes work correctly

### When This Phase is Complete
Move to Phase 2: Profile Section
```

## Phase Transition

When moving between phases:

```markdown
### Previous Progress
- Phase 1 COMPLETE: Dashboard layout with sidebar, header, navigation
- Phase 2 COMPLETE: Profile section with avatar, info, edit form
- Phase 3 IN PROGRESS: Settings section

### Current Phase: 3 of 5
Settings Section - Create settings page with notification and account preferences.
```

## Completion Signal

When ALL phases are done and verified:

```markdown
### All Phases Complete

Phase 1: ✅ Dashboard Layout
Phase 2: ✅ Profile Section
Phase 3: ✅ Settings Section
Phase 4: ✅ Activity History
Phase 5: ✅ Integration & Polish

All quality checks pass:
- TypeScript: ✅
- Lint: ✅
- Build: ✅

<promise>TASK COMPLETE</promise>
```
