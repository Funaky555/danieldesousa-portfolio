---
name: parallel-review
description: "Run 3 review agents simultaneously: code-reviewer, security-auditor, duplication-detector."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
  - Task
---

# /parallel-review - Parallel Code Review

## Purpose
Run multiple code review agents simultaneously for comprehensive feedback in less time.

## Usage
```
/parallel-review [files|directory]
```

## Agents Executed (In Parallel)
1. **code-reviewer** - General code quality, patterns, best practices
2. **security-auditor** - Security vulnerabilities, input validation
3. **duplication-detector** - Code duplication, consolidation opportunities

## Workflow
1. Identify files to review (from args or recent changes via `git diff`)
2. Launch all 3 agents in parallel using Task tool
3. Collect results from all agents
4. Consolidate findings into unified report
5. Prioritize issues by severity

## Output Format
```
## Parallel Review Results

### Critical Issues (Fix Before Merge)
- [security-auditor] XSS vulnerability in user input at component.tsx:42
- [code-reviewer] Missing error handling in server action at actions.ts:88

### Warnings (Should Fix)
- [duplication-detector] Similar logic in fileA.tsx:20 and fileB.tsx:45
- [code-reviewer] Consider extracting to shared utility

### Suggestions (Nice to Have)
- [code-reviewer] Could improve naming of `x` variable
```

## Integration
- Called by: `/pre-release`, `/build` (on completion), feature-builder (Phase 5)
- Calls: code-reviewer, security-auditor, duplication-detector agents

## Example
```
/parallel-review src/components/auth
```
