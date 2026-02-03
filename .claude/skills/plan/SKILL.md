---
name: plan
description: "Research-first planning with parallel agents. Creates structured implementation plans before coding."
invocable_by: both
tools:
  - Read
  - Glob
  - Grep
  - Task
---

# /plan - Structured Planning with Research

## Purpose
Create a structured implementation plan using parallel research agents before writing any code.

## Usage
```
/plan <task-description>
```

## Workflow

### Phase 1: Parallel Research
Launch in parallel:
1. **codebase-pattern-researcher**: How is similar code structured?
2. **framework-docs-researcher**: What's the recommended approach?
3. **framework-docs-researcher**: What APIs/methods are available?
4. **git-history-analyzer**: How did similar features evolve?

### Phase 2: Complexity Assessment
Calculate complexity score (0-100):
- Sub-tasks identified: 0-25 pts
- Files to modify: 0-20 pts
- External dependencies: 0-20 pts
- Scope breadth: 0-20 pts
- Uncertainty level: 0-15 pts

### Phase 3: Plan Generation
Based on research and complexity:
- Epic (60+): Break into phases with `/implement-epic`
- Standard (40-59): Single `/build` with detailed steps
- Quick (<40): Direct implementation

### Phase 4: Output Plan
```markdown
## Implementation Plan

**Task**: [description]
**Complexity**: [score]/100 ([classification])
**Recommended Approach**: [/build or /implement-epic]

### Research Summary
- **Existing Patterns**: [findings]
- **Best Practices**: [findings]
- **Framework APIs**: [relevant methods]
- **Historical Context**: [if relevant]

### Implementation Steps
1. [Step with agent/skill to use]
2. [Step with agent/skill to use]
...

### Files Affected
- [file]: [change description]

### Risks & Mitigations
- [risk]: [mitigation]

### Quality Gates
- [ ] Build passes
- [ ] Lint passes
- [ ] Tests pass
```

## Integration
- Calls: All 4 research agents (parallel)
- Feeds into: `/build`, `/implement-epic`, `/generate-prompt`
- Can save output for later execution

## Example
```
/plan "Implement user dashboard with analytics charts and data tables"
```
