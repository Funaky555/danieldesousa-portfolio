---
name: parallel-quality
description: "Run 3 quality agents simultaneously: duplication-detector, import-fixer, type-sync."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
  - Task
  - Edit
---

# /parallel-quality - Parallel Quality Checks

## Purpose
Run multiple quality-focused agents simultaneously for fast, comprehensive code quality assessment.

## Usage
```
/parallel-quality [files|directory]
```

## Agents Executed (In Parallel)
1. **duplication-detector** - Find duplicate code and consolidation opportunities
2. **import-fixer** - Fix ESLint import ordering issues
3. **type-sync** - Validate type consistency (TypeScript)

## Workflow
1. Identify target files
2. Launch all 3 agents in parallel
3. Apply auto-fixes where possible (imports)
4. Report issues that need manual attention

## Output Format
```
## Parallel Quality Results

### Auto-Fixed
- [import-fixer] Fixed import order in 5 files

### Manual Action Required
- [duplication-detector] Consider extracting shared logic:
  - Pattern found in: fileA.tsx, fileB.tsx, fileC.tsx
  - Suggested: Create shared utility in lib/utils/

### Type Issues
- [type-sync] Type mismatch: UserResponse vs User in api.ts:30
```

## Integration
- Called by: `/build` (post-implementation), `/pre-release`, feature-builder (Phase 4)
- Calls: duplication-detector, import-fixer, type-sync agents

## Example
```
/parallel-quality src/
```
