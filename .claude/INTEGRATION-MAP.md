# Integration Map

Cross-reference documentation for skill/agent dependencies in the Next.js Frontend project.

---

## Skill → Agent Dependencies

| Skill | Primary Agents | Supporting Agents |
|-------|---------------|-------------------|
| `/build` | component-builder, form-builder, api-builder | codebase-pattern-researcher, framework-docs-researcher |
| `/task` | (routes dynamically) | all agents based on task type |
| `/plan` | git-history-analyzer | framework-docs-researcher, codebase-pattern-researcher |
| `/learn` | - | - |
| `/parallel-review` | code-reviewer, security-auditor, performance-auditor | - |
| `/parallel-quality` | accessibility-checker, styling-enforcer, server-components | - |
| `/triage` | - | - |
| `/context` | framework-docs-researcher | git-history-analyzer |
| `/compound` | - | codebase-pattern-researcher |
| `/generate-prompt` | - | - |
| `/pre-release` | security-auditor, test-builder | code-reviewer |
| `/implement-epic` | component-builder | all development agents |
| `/feature-launch` | all development agents | all quality agents |
| `/clone-website` | component-builder, styling-enforcer | image-optimizer, seo-optimizer |
| `/react-best-practices` | performance-auditor | - |
| `/browser-automation` | - | - |

---

## Agent → Skill Integration

| Agent | Invoked By Skills | Auto-Loaded |
|-------|-------------------|-------------|
| `component-builder` | /build, /implement-epic, /clone-website | No |
| `server-components` | /build, /parallel-quality | Yes |
| `form-builder` | /build (form tasks) | No |
| `styling-enforcer` | /build, /parallel-quality, /clone-website | Yes |
| `api-builder` | /build (API tasks) | No |
| `performance-auditor` | /parallel-review, /react-best-practices | No |
| `accessibility-checker` | /parallel-quality | No |
| `code-reviewer` | /parallel-review, /pre-release | No |
| `security-auditor` | /parallel-review, /pre-release | No |
| `state-manager` | /build (state tasks) | No |
| `test-builder` | /pre-release | No |
| `animation-builder` | /build (animation tasks) | No |
| `seo-optimizer` | /build (SEO tasks), /clone-website | No |
| `image-optimizer` | /build (image tasks), /clone-website | No |
| `git-history-analyzer` | /plan, /context | No |
| `framework-docs-researcher` | /build, /plan | No |
| `codebase-pattern-researcher` | /build, /compound | No |
| `framework-docs-researcher` | /build, /context | No |

---

## Workflow Chains

### Build Flow
```
/build <description>
    │
    ├──► Assess Complexity (assess skill)
    │         │
    │         ├── Simple → Direct implementation
    │         │
    │         └── Complex → Research phase
    │                   │
    │                   ├──► @codebase-pattern-researcher
    │                   ├──► @framework-docs-researcher
    │                   └──► @framework-docs-researcher
    │
    ├──► Route to Builder Agent
    │         │
    │         ├── Component → @component-builder + @server-components
    │         ├── Form → @form-builder
    │         ├── API → @api-builder
    │         ├── Animation → @animation-builder
    │         └── State → @state-manager
    │
    ├──► Auto-Apply Patterns
    │         │
    │         ├──► @styling-enforcer (Tailwind)
    │         └──► @server-components (RSC decisions)
    │
    └──► Quality Gate
              │
              └──► npm run typecheck && npm run lint && npm run build
```

### Planning Flow
```
/plan <description>
    │
    ├──► @git-history-analyzer
    │         └── Understand code evolution
    │
    ├──► @codebase-pattern-researcher
    │         └── Analyze existing patterns
    │
    ├──► @framework-docs-researcher
    │         └── Research Next.js/React patterns
    │
    └──► Generate Implementation Plan
              └── Structured approach with phases
```

### Pre-Release Flow
```
/pre-release
    │
    ├──► Run Tests
    │         └── npm run test
    │
    ├──► Type Check
    │         └── npm run typecheck
    │
    ├──► Security Audit
    │         └── @security-auditor
    │
    ├──► Code Quality
    │         └── @code-reviewer
    │
    ├──► Build Verification
    │         └── npm run build
    │
    └──► Generate Release Notes
              └── Changelog summary
```

### Clone Website Flow
```
/clone-website <url>
    │
    ├──► Analyze Source
    │         └── Extract structure, colors, typography
    │
    ├──► Build Components
    │         │
    │         ├──► @component-builder
    │         ├──► @styling-enforcer
    │         └──► @image-optimizer
    │
    └──► Quality Pass
              │
              ├──► @seo-optimizer
              └──► @accessibility-checker
```

---

## Hook Integration

| Hook Event | Trigger | Action |
|------------|---------|--------|
| `PreToolUse` | Edit\|Write | protect-files.sh |
| `PostToolUse` | Edit\|Write | Prettier formatting (*.ts, *.tsx, *.js, *.jsx) |
| `Stop` | (always) | post-flow-learn.sh |
| `SubagentStop` | (always) | post-flow-learn.sh |
| `SessionStart` | (always) | Display quick commands reminder |

---

## Reference File Dependencies

| Reference File | Used By |
|----------------|---------|
| `references/patterns/` | component-builder, codebase-pattern-researcher |
| `.claude/references/tech-stack.md` | all builder agents |
| `.claude/references/compounds.md` | /compound skill |
| `.claude/CODEBASE_DEEP_DIVE.md` | /plan, codebase-pattern-researcher |
| `.claude/WORKFLOWS.md` | /build, /task |
| `.claude/AGENTS-INDEX.md` | /discover, /task |
| `.claude/RALPH_LOOP_TEMPLATES.md` | ralph-loop skill |
| `skills/react-best-practices/references/rules/` | performance-auditor |

---

## Auto-Load Chain

```
Session Start
    │
    ├──► Load CLAUDE.md (critical rules)
    │
    ├──► Load auto-loaded agents:
    │         ├── @server-components
    │         └── @styling-enforcer
    │
    └──► Display SessionStart hook message
```

---

## Agent Activation Matrix

| Task Type | Primary Agents | Supporting Agents |
|-----------|---------------|-------------------|
| Landing Page | component-builder, styling-enforcer | seo-optimizer, image-optimizer |
| Dashboard | component-builder, state-manager | server-components, accessibility-checker |
| Form/Auth | form-builder, api-builder | security-auditor, test-builder |
| API Route | api-builder | security-auditor |
| Animation | animation-builder, component-builder | performance-auditor |
| Clone Task | component-builder, styling-enforcer | image-optimizer, seo-optimizer |
