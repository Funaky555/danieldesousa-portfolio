---
name: compound
description: "Capture reusable solutions and patterns. Stores in compounds.md for future reference."
invocable_by: both
tools:
  - Read
  - Write
  - Edit
---

# /compound - Capture Reusable Solutions

## Purpose
Capture novel solutions, patterns, and approaches discovered during implementation as searchable knowledge for future use.

## Usage
```
/compound <description>
```

## When to Use
- After solving a tricky problem
- When implementing a pattern that could be reused
- After finding a non-obvious solution
- When creating a utility that others might need

## Workflow
1. Analyze the solution/pattern being captured
2. Extract the key insight or approach
3. Create/update entry in `.claude/references/compounds.md`
4. Tag with relevant keywords for searchability
5. Include code example if applicable

## Compound Entry Format
```markdown
## [Title] - [Date]

**Tags**: #pattern #utility #[domain]

**Problem**: What problem does this solve?

**Solution**: Brief description of the approach

**Code Example**:
\`\`\`typescript
// Example implementation
\`\`\`

**When to Use**: Situations where this applies

**Related**: Links to related compounds or docs
```

## Integration
- Suggested by: feature-builder (Phase 7), post-flow hooks
- Searchable via: `/context`, research agents
- Referenced by: `/build`, `/plan`

## Example
```
/compound "Custom hook for optimistic updates with rollback in React Query"
```
