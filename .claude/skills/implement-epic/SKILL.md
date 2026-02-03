---
name: implement-epic
description: "For large features/epics. Breaks the task into smaller tasks, then implements each one iteratively until completion."
invocable_by: user
arguments: "<task-description> [--max-iterations=30]"
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

# Implement Epic - Break Down & Iterate

For large tasks that need to be broken into smaller, manageable sub-tasks.

## Input
- **Task Description:** $ARGUMENTS
- **Max Iterations:** `--max-iterations=N` (default: 30)

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    IMPLEMENT EPIC PIPELINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: ANALYZE                                                │
│  ├─ Parse task requirements                                      │
│  ├─ Identify components/pages needed                             │
│  ├─ Identify user flows                                          │
│  └─ Assess complexity                                            │
│                                                                  │
│  Phase 2: BREAK DOWN                                             │
│  ├─ Split into 5-15 atomic tasks                                 │
│  ├─ Order by dependencies                                        │
│  ├─ Estimate each task (S/M/L)                                   │
│  └─ Write tasks to epic-tasks.md                                 │
│                                                                  │
│  Phase 3: APPROVAL                                               │
│  ├─ Show task breakdown to user                                  │
│  ├─ Allow adjustments                                            │
│  └─ Confirm before starting                                      │
│                                                                  │
│  Phase 4: IMPLEMENT                                              │
│  ├─ Pick next pending task                                       │
│  ├─ Implement task, verify, mark complete                        │
│  ├─ Continue until all tasks done                                │
│  └─ Use TodoWrite for progress tracking                          │
│                                                                  │
│  Phase 5: FINAL VERIFICATION                                     │
│  ├─ Run full build                                               │
│  ├─ Run typecheck and lint                                       │
│  ├─ Summary report                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Analyze the Task

### Extract Key Information:
- **Feature Name** - What are we building
- **Description** - Full requirements
- **Components** - UI components needed
- **Pages** - Routes/pages needed
- **User Flows** - How users interact
- **API Needs** - Data fetching requirements
- **Dependencies** - Other features/services needed

### Complexity Assessment
Based on:
- Number of pages/screens (1-2: Small, 3-5: Medium, 6+: Large)
- Number of user flows
- API integration complexity
- New patterns vs existing patterns
- Dark mode + responsive requirements

## Phase 2: Break Down into Tasks

### Task Breakdown Rules

**Atomic Tasks:** Each task should be:
- Completable in one focused session
- Independently testable
- Has clear done criteria

**Task Categories:**
1. **Setup** - Create boilerplate files, routes
2. **Component** - Implement one component
3. **Page** - Implement one page/screen
4. **Flow** - Implement one user flow
5. **Integration** - Connect to API/service
6. **Polish** - Edge cases, error handling, accessibility

### Example Breakdown

For a feature "User Dashboard with Analytics":

```markdown
## Task Breakdown: User Dashboard

### Foundation (do first)
- [ ] Task 1: Create route structure and layout
- [ ] Task 2: Set up data fetching hooks

### Components
- [ ] Task 3: Create StatsCard component
- [ ] Task 4: Create RecentActivityList component
- [ ] Task 5: Create QuickActionsPanel component
- [ ] Task 6: Create AnalyticsChart component

### Pages
- [ ] Task 7: Implement Dashboard overview page
- [ ] Task 8: Implement Analytics detail page

### Integration
- [ ] Task 9: Connect to API for stats data
- [ ] Task 10: Connect to API for activity data

### Polish
- [ ] Task 11: Add loading states
- [ ] Task 12: Add error boundaries
- [ ] Task 13: Verify dark mode + responsive

### Verification
- [ ] Task 14: Final build + lint + typecheck
- [ ] Task 15: Write tests
```

### Write Tasks to File

Create `.claude/epic-tasks.md`:

```markdown
# Epic: [Feature Name]
Description: [Brief description]
Created: [Date]
Status: IN_PROGRESS

## Tasks

### Task 1: Create route structure
**Status:** PENDING
**Type:** Setup
**Files:**
- src/app/dashboard/page.tsx
- src/app/dashboard/layout.tsx
**Done when:** Routes accessible and render placeholder

### Task 2: Create StatsCard component
**Status:** PENDING
**Type:** Component
**Files:**
- src/components/dashboard/StatsCard.tsx
**Done when:** Component renders with props, supports dark mode

[... more tasks ...]
```

## Phase 3: User Approval

Present the breakdown:

```markdown
## Epic Breakdown: [Feature Name]

I've analyzed the task and broken it into **[N] tasks**:

| # | Task | Type | Estimate |
|---|------|------|----------|
| 1 | Create route structure | Setup | S |
| 2 | StatsCard component | Component | S |
| 3 | Dashboard page | Page | M |
| ... | ... | ... | ... |

**Estimated effort:** [S/M/L based on total tasks]

### Ready to start?
- Type "yes" or "go" to start implementation
- Type "adjust" to modify tasks
- Type "skip [N]" to skip specific tasks
```

Wait for user confirmation before proceeding.

## Phase 4: Implement Tasks

For each task:

1. **Read epic-tasks.md** to find next PENDING task
2. **Mark it IN_PROGRESS** in the file
3. **Update TodoWrite** with current task
4. **Implement the task:**
   - Component: Create with proper props, dark mode, responsive
   - Page: Create with proper data fetching, layout
   - Flow: Implement user interaction
5. **Verify:** Run `npm run build && npm run typecheck`
6. **Mark task COMPLETE** if build passes
7. **Continue** to next task

### Completion Check

After each task:
- If more PENDING tasks exist → Continue to next
- If ALL tasks COMPLETE → Move to Phase 5

## Phase 5: Final Verification

### Build & Quality Check

```bash
npm run typecheck  # Zero errors
npm run lint       # Zero errors
npm run build      # Success
npm run test       # Pass (if tests written)
```

### Generate Completion Report

```markdown
## Epic Complete: [Feature Name]

### Tasks Completed: [N/N]
| # | Task | Status |
|---|------|--------|
| 1 | Create route structure | ✅ |
| 2 | StatsCard component | ✅ |
| ... | ... | ... |

### Files Created:
- [list of new files]

### Files Modified:
- [list of modified files]

### Verification
- TypeCheck: ✅
- Lint: ✅
- Build: ✅

### Manual Testing
1. Navigate to /dashboard
2. Verify components render correctly
3. Test dark mode toggle
4. Test responsive layouts (mobile/tablet/desktop)
```

## Task File Format

`.claude/epic-tasks.md` status values:
- `PENDING` - Not started
- `IN_PROGRESS` - Currently working
- `COMPLETE` - Done and verified
- `BLOCKED` - Can't proceed (with reason)
- `NEEDS_INPUT` - Requires human decision
- `SKIPPED` - Intentionally skipped

## Handling Issues

### Task Blocked
If a task can't be completed:
1. Mark as BLOCKED with reason
2. Skip to next task
3. Report blocked tasks at end

### Build Failures
If build fails after task:
1. Don't mark complete
2. Fix issues
3. Only mark complete when build passes

### Need Human Input
If task needs decision:
1. Mark as NEEDS_INPUT
2. Describe what's needed
3. Ask user for clarification
