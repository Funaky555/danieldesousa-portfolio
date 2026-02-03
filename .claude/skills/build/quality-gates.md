# Quality Gates

## Overview

Quality gates run after every build to ensure code quality, security, and best practices. **Tests, dark mode, and responsive design are mandatory.**

## Gate Sequence

```
Implementation Complete
         │
         ▼
    ┌─────────┐
    │TypeCheck│──── FAIL ──→ Fix errors, retry
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │  Lint   │──── FAIL ──→ Fix errors, retry
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │  Build  │──── FAIL ──→ Fix errors, retry
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │  Tests  │──── FAIL ──→ Fix tests, retry
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │ Dark    │──── FAIL ──→ Fix theme issues, retry
    │ Mode    │
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │Responsive│─── FAIL ──→ Fix layout issues, retry
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │  Code   │──── ISSUES ──→ Address critical, note warnings
    │ Review  │
    └────┬────┘
         │ PASS
         ▼
    ┌─────────┐
    │Security │──── ISSUES ──→ Fix critical, note warnings
    │ Audit   │
    └────┬────┘
         │ PASS
         ▼
    BUILD COMPLETE
```

## Gate 1: TypeScript Check

**Command:** `npm run typecheck`

**What it checks:**
- Type errors
- Missing types
- Incorrect type usage
- Unused variables/imports

**Pass criteria:**
- Zero errors
- Warnings acceptable but noted

**Common fixes:**
```tsx
// Error: any type
const data: any → const data: UserData

// Error: possibly undefined
user.name → user?.name ?? 'Unknown'

// Error: missing return type
function getData() → function getData(): Promise<Data>
```

## Gate 2: Lint

**Command:** `npm run lint`

**What it checks:**
- ESLint rules
- Code style consistency
- React best practices
- Accessibility issues (eslint-plugin-jsx-a11y)

**Pass criteria:**
- Zero errors
- Warnings acceptable but noted

**Common fixes:**
```tsx
// Error: unused import
import { unused } from 'pkg' → Remove

// Error: missing key prop
{items.map(i => <Item />)} → {items.map(i => <Item key={i.id} />)}

// Error: img missing alt
<img src="..." /> → <img src="..." alt="description" />
```

## Gate 3: Build

**Command:** `npm run build`

**What it checks:**
- Successful production build
- No runtime errors in SSR
- All imports resolve
- No circular dependencies

**Pass criteria:**
- Build completes successfully
- No errors in output

**Common fixes:**
```tsx
// Error: window is not defined (SSR)
const width = window.innerWidth
→
const width = typeof window !== 'undefined' ? window.innerWidth : 0

// Or use dynamic import
const Component = dynamic(() => import('./Component'), { ssr: false })
```

## Gate 4: Tests (MANDATORY)

**Command:** `npm run test`

**What it checks:**
- All unit tests pass
- New components have tests
- Edge cases covered
- No regressions

**Pass criteria:**
- All tests pass
- New code has corresponding tests

**Requirements for new code:**
```
✅ Every new component has a .test.tsx file
✅ User interactions are tested
✅ Loading states are tested
✅ Error states are tested
✅ Edge cases are tested
```

**Test file location:**
```
src/components/Button.tsx
src/components/Button.test.tsx  ← Colocated
```

**Common test patterns:**
```tsx
// Test rendering
it('renders correctly', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})

// Test interaction
it('calls onClick when clicked', async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalled()
})

// Test states
it('shows loading state', () => {
  render(<Button loading>Click</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})
```

## Gate 5: Dark Mode (MANDATORY)

**Verification method:** Manual check or agent-browser screenshot

**What it checks:**
- All components work in light mode
- All components work in dark mode
- No hardcoded colors (bg-white, text-black)
- Semantic color classes used (bg-background, text-foreground)
- Theme toggle works (if navigation exists)

**Pass criteria:**
- Both themes render correctly
- No visual issues in either theme
- All text is readable in both themes

**Verification commands:**
```bash
# Screenshot light mode
agent-browser screenshot http://localhost:3000 --output light.png

# Screenshot dark mode (toggle first or force class)
agent-browser evaluate "document.documentElement.classList.add('dark')"
agent-browser screenshot http://localhost:3000 --output dark.png
```

**Common issues:**
```tsx
// ❌ WRONG: Hardcoded colors
<div className="bg-white text-black">

// ✅ CORRECT: Semantic colors
<div className="bg-background text-foreground">

// ❌ WRONG: Hardcoded border
<div className="border-gray-200">

// ✅ CORRECT: Semantic border
<div className="border-border">
```

**Skip condition:**
Only skip if user explicitly said: "no dark mode", "light only", "skip dark mode"

## Gate 6: Responsive Design (MANDATORY)

**Verification method:** Manual check or agent-browser screenshots

**What it checks:**
- Layout works at 375px (mobile)
- Layout works at 768px (tablet)
- Layout works at 1440px (desktop)
- No horizontal overflow
- Text is readable at all sizes
- Touch targets are adequate (44px minimum)

**Pass criteria:**
- No broken layouts at any breakpoint
- All content accessible at all sizes
- No horizontal scrolling (unless intentional)

**Verification commands:**
```bash
# Mobile
agent-browser screenshot http://localhost:3000 --width 375 --height 812 --output mobile.png

# Tablet
agent-browser screenshot http://localhost:3000 --width 768 --height 1024 --output tablet.png

# Desktop
agent-browser screenshot http://localhost:3000 --width 1440 --height 900 --output desktop.png
```

**Common issues:**
```tsx
// ❌ WRONG: Fixed width
<div className="w-[500px]">

// ✅ CORRECT: Responsive width
<div className="w-full max-w-lg">

// ❌ WRONG: Desktop-only grid
<div className="grid-cols-4">

// ✅ CORRECT: Responsive grid
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// ❌ WRONG: Fixed font size
<h1 className="text-5xl">

// ✅ CORRECT: Responsive font
<h1 className="text-2xl md:text-4xl lg:text-5xl">
```

## Gate 7: Code Review

**Agent:** `code-reviewer`

**What it checks:**
- Code organization
- Naming conventions
- Component structure
- Performance patterns
- Error handling
- Code duplication

**Pass criteria:**
- No critical issues
- Warnings documented

**Output format:**
```markdown
## Code Review Results

### Critical (Must Fix)
- None

### Warnings (Should Address)
- Consider memoizing expensive calculation in UserList.tsx:45

### Suggestions (Nice to Have)
- Could extract common styles to shared component

### Passed
- ✅ Proper TypeScript usage
- ✅ Consistent naming
- ✅ Good component structure
- ✅ Dark mode support
- ✅ Responsive design
```

## Gate 8: Security Audit

**Agent:** `security-auditor`

**What it checks:**
- Input validation
- Authentication/Authorization
- XSS vulnerabilities
- Injection risks
- Sensitive data exposure
- Security headers

**Pass criteria:**
- No critical vulnerabilities
- No high-severity issues
- Warnings documented

**Output format:**
```markdown
## Security Audit Results

### Critical (Must Fix)
- None

### High Severity
- None

### Medium Severity
- Consider rate limiting on /api/contact endpoint

### Passed Checks
- ✅ No hardcoded secrets
- ✅ Input validation present
- ✅ XSS protection (React escaping)
- ✅ CSRF protection (Next.js built-in)
```

## Gate Failure Handling

### On TypeScript/Lint/Build Failure:
1. Identify the error
2. Fix the code
3. Re-run the failed gate
4. Continue if passed

### On Test Failure:
1. Identify failing test
2. Fix the code OR fix the test (if test is wrong)
3. Re-run tests
4. Ensure no regressions

### On Dark Mode Failure:
1. Identify hardcoded colors
2. Replace with semantic tokens
3. Re-verify both themes

### On Responsive Failure:
1. Identify broken layout
2. Add responsive classes
3. Re-verify all breakpoints

### On Code Review Issues:
1. **Critical**: Must fix before completion
2. **Warning**: Fix if quick, otherwise document
3. **Suggestion**: Note for future improvement

### On Security Issues:
1. **Critical**: Must fix immediately
2. **High**: Must fix before completion
3. **Medium**: Fix if possible, document if not
4. **Low**: Document for awareness

## Quality Report

Final output after all gates:

```markdown
## Quality Gate Report

| Gate | Status | Notes |
|------|--------|-------|
| TypeScript | ✅ PASS | No errors |
| Lint | ✅ PASS | No errors |
| Build | ✅ PASS | Built in 12s |
| Tests | ✅ PASS | 15 tests, 100% pass |
| Dark Mode | ✅ PASS | Both themes verified |
| Responsive | ✅ PASS | Mobile/tablet/desktop verified |
| Code Review | ✅ PASS | 1 suggestion noted |
| Security | ✅ PASS | No issues |

### Summary
All quality gates passed. Code is ready for use.

### Tests Written
- `Button.test.tsx` - 5 tests (render, click, disabled, loading, variants)
- `Card.test.tsx` - 3 tests (render, with image, with actions)

### Notes
- Code Review: Consider extracting HeaderNav to shared component
```
