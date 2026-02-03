---
name: pre-release
description: "Full validation checklist before release. Runs build, lint, tests, and security checks."
invocable_by: user
disable-model-invocation: true
tools:
  - Bash
  - Read
  - Grep
---

# Pre-Release Skill

Run the complete pre-release checklist before deploying to production.

## Trigger
`/pre-release`

## Description
This skill executes a comprehensive validation pipeline to ensure the codebase is production-ready.

## Execution Steps

### Step 1: Build Verification

```bash
npm run build
```

**Expected:** No TypeScript errors, successful build
**If fails:** List all errors and offer to fix

### Step 2: Parallel Quality Check (NEW)

Run `/parallel-quality` to:
- Detect code duplication
- Fix import ordering
- Validate type consistency

### Step 3: Parallel Code Review (NEW)

Run `/parallel-review` to:
- General code quality check
- Security audit
- Final duplication check

### Step 4: Lint Verification

```bash
npm run lint
```

**Expected:** No linting errors
**If fails:** Run `npm run lint -- --fix` and report remaining issues

### Step 5: Test Suite

```bash
npm test
```

**Expected:** All tests pass
**If fails:** List failing tests with details

### Step 6: Security Audit

#### 6.1 Secrets Check
```bash
# Check for hardcoded secrets
grep -ri "api_key.*=.*['\"]" src/ --include="*.ts" --include="*.tsx"
grep -ri "password.*=.*['\"]" src/ --include="*.ts" --include="*.tsx"
grep -ri "secret.*=.*['\"]" src/ --include="*.ts" --include="*.tsx"
```

#### 6.2 Console.log Cleanup
```bash
# Find console.logs that might leak data
grep -r "console.log" src/ --include="*.ts" --include="*.tsx" | wc -l
```

### Step 7: Dependency Check

```bash
npm audit
```

**Expected:** No high/critical vulnerabilities
**If fails:** List vulnerabilities and recommend updates

### Step 8: Git Status Check

```bash
git status
git diff --stat
```

**Verify:**
- All intended changes are staged
- No unintended files modified
- No sensitive files (.env) being committed

### Step 9: Triage Findings (NEW)

Run `/triage all` to:
- Categorize all findings from review and quality checks
- Prioritize issues
- Create action items for remaining work

### Step 10: Generate Pre-Release Report

```markdown
# Pre-Release Report

**Date:** [Current Date]
**Branch:** [Current Branch]

## Verification Results

| Check | Status |
|-------|--------|
| TypeScript Build | ✅/❌ |
| Parallel Quality | ✅/❌ |
| Parallel Review | ✅/❌ |
| ESLint | ✅/❌ |
| Tests | ✅/❌ |
| Security Audit | ✅/❌ |
| Dependency Audit | ✅/❌ |
| Git Status | ✅/❌ |

## Issues Found
[List any issues]

## Pre-Release Checklist

- [ ] All TypeScript errors resolved
- [ ] All lint errors resolved
- [ ] All tests passing
- [ ] No hardcoded secrets
- [ ] Console.logs reviewed/removed
- [ ] No critical npm vulnerabilities
- [ ] Changes reviewed and intentional

## Recommendation

**READY FOR RELEASE** ✅
or
**NOT READY - Action Required** ❌
```

### Step 11: Final Confirmation

If all checks pass:
```
✅ Pre-release checks PASSED

The codebase is ready for production deployment.

Next steps:
1. Create a git tag for this release
2. Push to production branch
3. Deploy using your deployment process
```

If any checks fail:
```
❌ Pre-release checks FAILED

The following issues must be resolved before release:
1. [Issue 1]
2. [Issue 2]

Would you like me to help fix these issues?
```

## Important Notes

- All checks must pass for production readiness
- Security issues are blocking - no exceptions
- Build and lint failures must be resolved
- Review console.logs even if not blocking
