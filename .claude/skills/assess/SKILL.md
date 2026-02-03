---
name: assess
description: "Assess complexity of a task before implementation. Returns score and recommended approach."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
---

# /assess - Task Complexity Assessment Skill

## Overview

The `/assess` skill analyzes a task description and provides a detailed complexity assessment, recommending the appropriate implementation approach (Quick, Standard, or Epic with Ralph Loop).

Use this skill **before starting** any feature to understand scope and plan accordingly.

## Invocation

```
/assess <description of what you want to build>
```

## Examples

```
/assess landing page with hero section and contact form
/assess full authentication system with OAuth providers
/assess add dark mode toggle to navbar
/assess e-commerce checkout flow with cart and payments
/assess dashboard with multiple data visualizations
```

---

## How It Works

### Step 1: Parse Task Description

I analyze your request to identify:
- **Components**: UI elements needed
- **Pages**: New routes/pages required
- **State**: State management complexity
- **API**: Backend/API requirements
- **Integrations**: Third-party services

### Step 2: Score Complexity Factors

| Factor | Points | Description |
|--------|--------|-------------|
| New pages/routes | +1 each | Each new route adds complexity |
| Complex components | +1 each | Forms, data tables, charts |
| API routes | +1 each | Backend endpoints needed |
| Authentication | +3 | Login, signup, sessions |
| Third-party APIs | +2 each | External service integration |
| Database/ORM | +2 | Data persistence layer |
| Real-time features | +3 | WebSockets, SSE, polling |
| File uploads | +2 | Image/file handling |
| Payments | +3 | Stripe, payment processing |
| Email/notifications | +2 | Transactional emails |
| Search/filtering | +1-2 | Basic to advanced search |
| Multi-step forms | +2 | Wizard-like flows |

### Step 3: Determine Complexity Level

| Score | Level | Approach |
|-------|-------|----------|
| 0-3 | **Quick** | One-shot implementation |
| 4-7 | **Standard** | Structured, multi-file implementation |
| 8+ | **Epic** | Ralph Loop with phased approach |

### Step 4: Generate Recommendation

---

## Output Format

```markdown
## Task Assessment: [Brief Task Name]

### Complexity Score: [X] points

### Factors Identified

| Factor | Points | Notes |
|--------|--------|-------|
| [Factor 1] | +X | [specific detail] |
| [Factor 2] | +X | [specific detail] |
| ... | ... | ... |

### Complexity Level: [QUICK / STANDARD / EPIC]

### Recommended Approach

**[QUICK]**
→ Proceed with `/build <task>` directly
→ Expected: 1-2 files, single iteration

**[STANDARD]**
→ Proceed with `/build <task>`
→ Expected: 3-5 files, structured implementation
→ Plan:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]

**[EPIC]**
→ Use Ralph Loop for iterative development
→ Expected: 6+ files, multiple phases
→ Recommended phases:
  1. Phase 1: [description]
  2. Phase 2: [description]
  3. Phase 3: [description]
→ Template: `ralph-templates/epic.md`
→ Command:
  ```
  /ralph-loop "<task>" --completion-promise "TASK COMPLETE" --max-iterations 15
  ```

### Files Likely Needed

- `src/app/[route]/page.tsx` - [purpose]
- `src/components/[name].tsx` - [purpose]
- `src/lib/[name].ts` - [purpose]
- ...

### Agents to Activate

- `component-builder` - [reason]
- `form-builder` - [reason]
- ...

### Risks & Considerations

- [Risk 1]: [mitigation]
- [Risk 2]: [mitigation]

### Ready to Proceed?

Reply with:
- `/build <task>` to start implementation
- Ask questions if you need clarification
```

---

## Assessment Examples

### Example 1: Quick Task

```
/assess add a loading spinner to the dashboard
```

**Result:**
- Score: 1 point (single component)
- Level: **QUICK**
- Approach: Direct implementation with `/build`

### Example 2: Standard Task

```
/assess contact form with email validation and API submission
```

**Result:**
- Score: 5 points (form +1, validation +1, API route +1, email +2)
- Level: **STANDARD**
- Approach: Structured implementation
- Plan: Form component → API route → Email service → Tests

### Example 3: Epic Task

```
/assess complete user authentication with OAuth, profile management, and settings
```

**Result:**
- Score: 12 points (auth +3, OAuth +2, profile page +1, settings page +1, database +2, API routes +3)
- Level: **EPIC**
- Approach: Ralph Loop with phases
- Phases:
  1. Auth infrastructure (NextAuth setup)
  2. Login/signup pages
  3. Profile management
  4. Settings page
  5. Integration & polish

---

## When to Use /assess

### Always Use When:
- Starting a new feature you haven't built before
- Task description is vague or broad
- You're unsure if Ralph Loop is needed
- Planning a sprint or feature set

### Skip When:
- Simple bug fixes
- Copy/style changes
- Tasks you've done many times
- Single-file changes

---

## Integration with Other Skills

After assessment:

| Level | Next Step |
|-------|-----------|
| Quick | `/build <task>` |
| Standard | `/build <task>` |
| Epic | `/ralph-loop` or `/feature-launch` |

The `/build` skill also runs assessment internally, but `/assess` gives you the detailed breakdown before committing to implementation.
