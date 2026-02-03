---
name: triage
description: "Categorize and prioritize findings from reviews. Sorts into Fix Now, Backlog, Won't Fix."
invocable_by: both
tools:
  - Read
  - Grep
  - TodoWrite
---

# /triage - Process Pending Findings

## Purpose
Review and categorize pending issues, TODOs, and findings from code reviews or quality checks. Helps maintain a clean backlog.

## Usage
```
/triage [source]
```

## Sources
- `todos` - In-code TODO comments
- `review` - Findings from last code review
- `quality` - Issues from quality checks
- `all` - Everything

## Workflow
1. Gather findings from specified source
2. Present each finding for categorization
3. User decides action for each:
   - **Fix Now**: Add to immediate todo list
   - **Fix Later**: Add to backlog with priority
   - **Won't Fix**: Document reason and dismiss
   - **Need Info**: Flag for clarification
4. Update tracking files
5. Generate summary report

## Output Format
```
## Triage Results

### Fix Now (3 items)
- [ ] Security: Validate user input in form.tsx:42
- [ ] Bug: Handle null case in parser.ts:88
- [ ] Type: Fix type mismatch in api.ts:30

### Backlog (2 items)
- [ ] [P2] Refactor: Extract duplicate logic to utility
- [ ] [P3] Enhancement: Add retry logic to API calls

### Dismissed (1 item)
- Won't fix: Legacy code scheduled for removal

### Need Info (1 item)
- ? : Unclear if rate limiting is needed here
```

## Integration
- Called after: `/parallel-review`, `/parallel-quality`, `/audit-code`
- Updates: TodoWrite, backlog tracking
- Feeds into: `/build`, sprint planning

## Example
```
/triage review
/triage all
```
