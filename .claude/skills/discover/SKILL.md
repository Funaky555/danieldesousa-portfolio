---
name: discover
description: "Explore and discover codebase structure. Use to understand unfamiliar areas."
invocable_by: user
tools:
  - Read
  - Glob
  - Bash
---

# /discover - Dynamic Context Discovery

## Overview

The `/discover` skill dynamically lists all available agents and skills in this project. Use this to see what tools are available for your development tasks.

## Invocation

```
/discover
/discover agents
/discover skills
/discover all
```

---

## Instructions

When this skill is invoked, perform the following discovery:

### 1. List Available Agents

Run: `ls -1 .claude/agents/*.md 2>/dev/null | xargs -I {} basename {} .md`

Present agents in a table:

| Agent | Purpose |
|-------|---------|
| `agent-name` | First line of agent file (description) |

For each agent, read the first few lines to extract its purpose.

### 2. List Available Skills

Run: `ls -d .claude/skills/*/ 2>/dev/null | xargs -I {} basename {}`

Present skills in a table:

| Skill | Invocation | Purpose |
|-------|------------|---------|
| `skill-name` | `/skill-name` | From SKILL.md overview |

### 3. List Reference Documentation

Run: `ls .claude/references/*.md .claude/references/**/*.md 2>/dev/null`

Group by category:
- Core references
- Pattern references
- Rule references (from react-best-practices)

---

## Output Format

```markdown
# Available Context for This Project

## Agents (`.claude/agents/`)

| Agent | Purpose |
|-------|---------|
| `component-builder` | Build React components with shadcn/Tailwind |
| ... | ... |

**Usage**: Agents are automatically activated by /build based on task type.
**Details**: See `.claude/AGENTS-INDEX.md` for full documentation.

## Skills (`.claude/skills/`)

| Skill | Invoke | Purpose |
|-------|--------|---------|
| `/build` | `/build <description>` | Main entry point for all tasks |
| `/discover` | `/discover` | This skill - list available context |
| `/clone-website` | Auto via /build | Clone website UI with design tokens |
| `/react-best-practices` | Reference | 45 performance rules |
| `/browser-automation` | Visual tasks | Screenshots, DOM analysis |

**Usage**: Use `/build` as your main entry point. Other skills are activated automatically.

## Reference Documentation

### Core
- `references/tech-stack.md` - Full stack documentation
- `references/conventions.md` - Coding conventions
- `references/ralph-loop-setup.md` - Ralph Loop configuration

### Patterns
- `references/patterns/shadcn-setup.md` - shadcn/ui guide (MANDATORY)
- `references/patterns/data-fetching.md` - Server/client data patterns
- `references/patterns/forms.md` - Form handling
- `references/patterns/error-handling.md` - Error boundaries
- `references/patterns/loading-states.md` - Skeletons, Suspense

### Performance Rules
Located in `skills/react-best-practices/references/rules/`:
- 45 rules organized by: async, bundle, caching, re-render, rendering, JS optimization

## Quick Start

1. **Build something**: `/build landing page with hero and features`
2. **Clone a site**: `/build clone stripe.com homepage`
3. **Check what's available**: `/discover`
4. **See agent details**: Read `.claude/AGENTS-INDEX.md`
```

---

## Dynamic Discovery Commands

If you need to verify the current state:

```bash
# List all agents
ls -1 .claude/agents/*.md | xargs -I {} basename {} .md

# List all skills
ls -d .claude/skills/*/ | xargs -I {} basename {}

# Count performance rules
ls .claude/skills/react-best-practices/references/rules/*.md | wc -l

# Check project config
cat .claude/project-config.json
```
