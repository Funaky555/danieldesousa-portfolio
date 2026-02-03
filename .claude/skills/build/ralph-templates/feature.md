# Ralph Template: Single Feature (Next.js)

## Usage

```
/ralph-loop "<TASK_DESCRIPTION>" --completion-promise "TASK COMPLETE" --max-iterations 10
```

## Template Prompt

```markdown
## Task: [FEATURE DESCRIPTION]

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)

### Objectives
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

### Current Progress
[What has been completed so far]

### This Iteration
1. Check current state
2. Identify next step
3. Implement
4. Verify it works

### Quality Checks (run after each iteration)
- `npm run typecheck` - Must pass
- `npm run lint` - Must pass
- Manual verification - Must work as expected

### Completion Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Design Polish Phase (MANDATORY)
Before signaling completion, run `/frontend-design` to:
- Enhance visual quality to production-grade
- Ensure distinctive, non-generic aesthetics
- Add refinements that elevate the design
- Verify high design quality standards

### When Complete
After all criteria met AND design polish applied:
<promise>TASK COMPLETE</promise>

### Important Guidelines
- Use Server Components by default
- Add 'use client' only when needed
- Use shadcn/ui components from @/components/ui/
- Use cn() for class composition
- Support dark mode - use semantic colors
- Build responsive - mobile-first
```

## Example: Contact Form Feature

```markdown
## Task: Create Contact Form with Email Notification

### Context
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict)

### Objectives
1. Create contact form component with validation
2. Build API route for form submission
3. Integrate email sending service
4. Add success/error handling

### Current Progress
- None (starting fresh)

### This Iteration
1. Check if contact page exists
2. Create ContactForm component with shadcn
3. Add form validation with zod
4. Wire up to submit handler

### Quality Checks
- `npm run typecheck` - Must pass
- `npm run lint` - Must pass
- Form renders and validates correctly

### Completion Criteria
- [ ] Form renders with all fields
- [ ] Validation shows errors correctly
- [ ] API route handles submission
- [ ] Email is sent on submit
- [ ] Success/error states shown to user

### When Complete
All criteria met, quality checks pass.

<promise>TASK COMPLETE</promise>
```

## Progress Updates

Update progress after each iteration:

```markdown
### Current Progress
- Created ContactForm component with shadcn inputs
- Added zod validation schema
- Implemented client-side validation
- IN PROGRESS: Building API route

### This Iteration
1. Create /api/contact route
2. Add email service integration
3. Handle success/error responses
4. Test full flow
```

## Completion Signal

When ALL objectives are done and verified:

```markdown
### All Objectives Complete

1. Contact form with name, email, message fields
2. Validation with zod schema
3. API route at /api/contact
4. Email sent via Resend

All quality checks pass:
- TypeScript: ✅
- Lint: ✅
- Build: ✅
- Form works in light/dark mode
- Form is responsive

<promise>TASK COMPLETE</promise>
```
