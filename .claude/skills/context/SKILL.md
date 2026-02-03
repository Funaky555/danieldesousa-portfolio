---
name: context
description: "Load reference documentation into context. Use to get tech-stack, conventions, patterns, or compounds."
invocable_by: both
user-invocable: false
tools:
  - Read
  - Glob
---

# /context - Load Reference Documentation

## Purpose
Dynamically load detailed reference documentation into context for the current task. Keeps CLAUDE.md minimal while providing rich context on demand.

## Usage
```
/context [topic]
```

## Available Topics
- `tech-stack` - Full technology stack details
- `conventions` - Naming, imports, file structure
- `patterns` - Domain-specific implementation patterns
- `compounds` - Previously captured solutions
- `all` - Load everything (use sparingly)

## Workflow
1. Parse requested topic(s)
2. Load relevant files from `.claude/references/`
3. Present summary of loaded context
4. Context remains available for current conversation

## Reference Structure
```
.claude/references/
├── tech-stack.md          # Technology details
├── conventions.md         # Project conventions
├── compounds.md           # Captured solutions
└── patterns/
    ├── state-management.md
    ├── error-handling.md
    ├── forms.md
    └── [domain-specific].md
```

## Integration
- Called by: `/build` (when needed), `/plan`, research agents
- Loads: Reference documentation
- Updates: compounds.md (via /compound)

## Examples
```
/context tech-stack
/context patterns
/context conventions patterns
```
