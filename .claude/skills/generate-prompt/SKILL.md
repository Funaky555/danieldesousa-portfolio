---
name: generate-prompt
description: "Generate implementation prompt without executing. Good for reviewing approach first."
invocable_by: user
tools:
  - Read
  - Glob
  - Grep
  - Task
---

# /generate-prompt - Generate Implementation Prompt

## Purpose
Generate a detailed implementation prompt without executing it. Useful for reviewing the approach before implementation or for manual execution later.

## Usage
```
/generate-prompt <task-description>
```

## Workflow
1. Analyze the task description
2. Run research agents (in parallel):
   - codebase-pattern-researcher
   - framework-docs-researcher
   - framework-docs-researcher
3. Assess complexity score
4. Generate structured implementation prompt
5. Output prompt WITHOUT executing

## Output Format
```markdown
## Generated Implementation Prompt

**Complexity Score**: 45/100 (Standard)
**Recommended Skill**: /build

---

### Task
[Original task description]

### Research Findings

#### Existing Patterns
- [From codebase-pattern-researcher]

#### Best Practices
- [From framework-docs-researcher]

#### Framework Reference
- [From framework-docs-researcher]

### Implementation Steps
1. [Step 1]
2. [Step 2]
...

### Files to Create/Modify
- `path/to/component.tsx` - [purpose]
- `path/to/page.tsx` - [purpose]

### Agents to Invoke
- component-builder → form-builder → api-builder

### Quality Gates
- [ ] TypeScript compiles
- [ ] Lint passes
- [ ] Tests pass

---

**To execute**: Copy this prompt and run `/build` or invoke manually
```

## Integration
- Uses: Research agents (parallel)
- Outputs to: User (for review/manual use)
- Can feed into: `/build`, `/implement-epic`

## Example
```
/generate-prompt "Add a dashboard page showing user analytics with charts"
```
