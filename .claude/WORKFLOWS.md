# Claude Code Workflows Guide

Quick reference for all available commands and agents for Next.js frontend development.

---

## Architecture: Static vs Dynamic Context

This project follows a **two-concept model** for Claude Code configuration:

| Type                     | Purpose                                          | Location               |
| ------------------------ | ------------------------------------------------ | ---------------------- |
| **Static (Rules)**       | Minimal, essential rules in EVERY conversation   | `CLAUDE.md` (~50 lines) |
| **Dynamic (Skills)**     | Rich workflows loaded on-demand                  | `.claude/skills/`      |
| **Dynamic (Agents)**     | Specialized sub-agents with limited scope        | `.claude/agents/`      |
| **References**           | Detailed docs loaded via `/context`              | `.claude/references/`  |

### Why This Structure?

- **CLAUDE.md stays minimal** - Only critical rules that apply to every task
- **Skills load on demand** - Don't bloat context unless needed
- **Agents have focused scope** - Better reliability through specialization
- **Hooks ensure consistency** - Deterministic actions (lint, learn) run automatically

---

## Quick Start for Non-Technical Users

### Build Any Feature

```
/build <feature-description>
```

Describe what you want. Claude automatically:

1. Analyzes requirements
2. Creates necessary components
3. Implements with proper styling
4. Ensures dark mode and responsive design

**Example:**

```
/build a user profile card that shows avatar, name, email, and a logout button
```

### Assess Complexity First

```
/assess <feature-description>
```

Get a complexity analysis before implementing.

---

## Quick Start for Developers

### Core Skills

| Command                   | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `/build <description>`    | Build a feature from description                          |
| `/assess <description>`   | Analyze complexity before implementation                  |
| `/task <description>`     | Smart router - auto-detect complexity and route           |
| `/discover`               | List all available agents and skills                      |
| `/feature-launch`         | Full feature launch workflow                              |

### Context & Learning

| Command            | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `/context <topic>` | Load detailed reference docs (patterns, conventions, tech-stack, compounds)        |
| `/learn [lesson]`  | Add lessons to CLAUDE.md or agents when mistakes happen                  |
| `/compound <desc>` | Capture novel solutions for future reuse                                 |

### Parallel Operations (NEW)

| Command               | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `/parallel-review`    | Run code-reviewer, security-auditor, duplication-detector in parallel  |
| `/parallel-quality`   | Run duplication-detector, import-fixer, type-sync in parallel          |
| `/triage [source]`    | Process and categorize findings from reviews/quality checks            |
| `/generate-prompt`    | Generate implementation prompt without executing                       |
| `/plan <description>` | Create structured plan with parallel research                          |
| `/pre-release`        | Full pre-release validation checklist                                  |

**Context Topics:**
- `conventions` - Naming, imports, file structure
- `patterns` - All coding patterns (forms, data-fetching, error-handling)
- `tech-stack` - Technology stack details
- `all` - Everything

**Learn Examples:**
```bash
# Manual lesson
/learn Always use server components by default

# Auto-reflection (analyzes recent work)
/learn
```

### Code Quality

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `/browser-automation` | Visual testing and screenshot automation               |
| `/react-best-practices` | Apply React performance patterns                     |

---

## Hooks (Automatic Actions)

Hooks run deterministically at specific points:

| Hook            | Trigger                   | Action                                      |
| --------------- | ------------------------- | ------------------------------------------- |
| `PreToolUse`    | Before Edit/Write         | Blocks protected files (.env, *.lock)       |
| `PostToolUse`   | After Edit/Write          | Auto-formats with Prettier                  |
| `Stop`          | When Claude finishes      | Suggests `/learn` if code changed           |
| `SubagentStop`  | When sub-agent finishes   | Suggests `/learn` if code changed           |
| `SessionStart`  | New session starts        | Shows quick command reminder                |

### Protected Files (Blocked from editing)
- `.env`, `.env.local`, `.env.production`, `.env.development`
- `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`
- `.git/`
- `settings.local.json`
- `node_modules/`
- `.next/`

Hooks are defined in `.claude/settings.json` and run the scripts in `.claude/hooks/`.

---

## Complexity Scoring

| Score   | Classification | Recommendation          |
| ------- | -------------- | ----------------------- |
| 60+     | Complex        | Break into smaller tasks |
| 40-59   | Medium         | Standard implementation  |
| < 40    | Simple         | Quick implementation     |

**Scoring Criteria:**

- Sub-tasks count (0-25 pts)
- UI components (0-20 pts)
- User flows (0-20 pts)
- Scope breadth (0-20 pts)
- Requirements length (0-15 pts)

**Override Rules:**
- New data models → Minimum Medium
- Authentication/Security → Minimum Medium
- Cross-feature integration → Complex

---

## Available Agents

These run automatically as part of workflows, but can be invoked via Task tool:

### Research Agents (NEW)

| Agent                      | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `git-history-analyzer`     | Trace code evolution and contributors                |
| `framework-docs-researcher`| Find industry standards and patterns                 |
| `codebase-pattern-researcher`| Analyze existing patterns for consistency          |
| `framework-docs-researcher`| Research framework APIs and examples                 |

### Orchestrator

| Agent             | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `component-builder` | Orchestrates full component development              |

### Component Builders

| Agent                    | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `form-builder`           | Creates form components with validation          |
| `animation-builder`      | Creates animations and transitions               |
| `server-components`      | Creates Server Components with data fetching     |
| `api-builder`            | Creates API routes and server actions            |

### Quality & Security

| Agent                    | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `code-reviewer`          | Reviews code for quality issues                  |
| `security-auditor`       | Checks for vulnerabilities                       |
| `performance-auditor`    | Audits performance bottlenecks                   |
| `accessibility-checker`  | Checks accessibility compliance                  |

### Optimization

| Agent                    | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `seo-optimizer`          | Optimizes for search engines                     |
| `image-optimizer`        | Optimizes image loading                          |
| `state-manager`          | Manages state patterns (Zustand, Context)        |

### Testing

| Agent                    | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `test-builder`           | Creates tests for components                     |

---

## Best Practices

### Keep CLAUDE.md Minimal

CLAUDE.md is included in EVERY conversation. Keep it to:
- Critical rules Claude gets wrong
- Git workflow rules
- Verification commands
- Quick command reference

Move everything else to `/context` skills.

### Use /learn Regularly

After any significant work:
```bash
/learn  # Auto-reflects on recent changes
```

When Claude makes a mistake:
```bash
/learn Always use server components by default
```

### Load Context On Demand

Don't memorize patterns. Load them when needed:
```bash
/context conventions  # Before starting a new feature
/context patterns     # When implementing complex logic
```

### Always Verify

Before considering any feature complete:
```bash
npm run typecheck   # Zero TypeScript errors
npm run lint        # Zero ESLint errors
npm run build       # Successful production build
```

Plus verify:
- Dark mode works in both themes
- Responsive design on mobile/tablet/desktop
