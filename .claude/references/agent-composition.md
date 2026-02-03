# Agent Composition System

This document describes how orchestrator agents can compose and delegate to other agents, enabling powerful parallel and sequential workflows.

---

## Overview

**Agent Composition** allows agents to call other agents, creating powerful orchestration patterns:

- **Parallel Composition**: Multiple agents run simultaneously (~2-3x faster)
- **Sequential Composition**: Agents run in order, passing context
- **Conditional Composition**: Agents run based on conditions
- **Hybrid Composition**: Mix of parallel, sequential, and conditional

---

## Architecture

### Agent Types

| Type | Description | Can Delegate? | Can Be Delegated To? |
|------|-------------|---------------|----------------------|
| **Leaf** | Performs actual work, doesn't call other agents | ❌ | ✅ |
| **Orchestrator** | Composes other agents, minimal direct work | ✅ | ✅ |
| **Hybrid** | Can do work AND delegate to other agents | ✅ | ✅ |

### Frontmatter Schema for Orchestrators

```yaml
---
name: feature-orchestrator
description: "Orchestrates complete feature development"
type: orchestrator  # NEW: leaf | orchestrator | hybrid
activation_mode: automatic
triggering_conditions:
  - "Complex feature requiring multiple agents"
tools: Read, Glob, Grep, Task, TodoWrite

# NEW: Composition Configuration
composition:
  # Agents that run in parallel (Phase 1)
  parallel_research:
    - codebase-pattern-researcher
    - framework-docs-researcher
    - framework-docs-researcher

  # Agents that run sequentially after research
  sequential_build:
    - component-builder
    - test-builder

  # Conditional agents based on task analysis
  conditional:
    - agent: form-builder
      when: "task involves forms, inputs, validation"
    - agent: api-builder
      when: "task involves API, data fetching, server actions"
    - agent: state-manager
      when: "task involves complex state, stores, providers"

  # Parallel quality gates (always run)
  parallel_quality:
    - code-reviewer
    - security-auditor
    - accessibility-checker

# Loop prevention
max_delegation_depth: 3
---
```

---

## Composition Patterns

### Pattern 1: Parallel Research → Sequential Build → Parallel Review

The most common pattern for feature development:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: PARALLEL RESEARCH                   │
├─────────────────┬─────────────────┬─────────────────────────────┤
│ codebase-       │ best-practices- │ framework-docs-             │
│ pattern-        │ researcher      │ researcher                  │
│ researcher      │                 │                             │
│                 │                 │                             │
│ "Find existing  │ "Find industry  │ "Find API docs for         │
│  patterns"      │  standards"     │  this feature"              │
└────────┬────────┴────────┬────────┴──────────────┬──────────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                           ▼
                  [Aggregate Research]
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 2: SEQUENTIAL BUILD                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  component-builder ──► api-builder ──► test-builder             │
│         │                  │                │                   │
│         │                  │                │                   │
│    [Creates UI]      [Creates API]    [Creates Tests]           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 3: PARALLEL REVIEW                        │
├─────────────────┬─────────────────┬─────────────────────────────┤
│ code-reviewer   │ security-       │ accessibility-              │
│                 │ auditor         │ checker                     │
│                 │                 │                             │
│ "Review code    │ "Check          │ "Verify WCAG               │
│  quality"       │  security"      │  compliance"                │
└────────┬────────┴────────┬────────┴──────────────┬──────────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                           ▼
                    [Aggregate Reviews]
                           │
                           ▼
                       ✅ DONE
```

### Pattern 2: Conditional Routing

When the orchestrator needs to choose agents based on task analysis:

```
                    [Analyze Task]
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
    Has Forms?     Has API?      Has State?
          │              │              │
          ▼              ▼              ▼
    form-builder   api-builder   state-manager
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                  [Continue Flow]
```

### Pattern 3: Recursive Composition (with depth limit)

Orchestrators can call other orchestrators (with depth limits to prevent infinite loops):

```
feature-orchestrator (depth 0)
    │
    ├── research-orchestrator (depth 1)
    │       ├── codebase-pattern-researcher (depth 2, leaf)
    │       ├── framework-docs-researcher (depth 2, leaf)
    │       └── framework-docs-researcher (depth 2, leaf)
    │
    ├── component-builder (depth 1, leaf)
    │
    └── quality-orchestrator (depth 1)
            ├── code-reviewer (depth 2, leaf)
            └── security-auditor (depth 2, leaf)

MAX DEPTH: 3 (prevents runaway recursion)
```

---

## Implementation Guide

### How to Call Multiple Agents in Parallel

**CRITICAL**: To run agents in parallel, include multiple `Task` tool calls in a SINGLE response:

```markdown
## Executing Parallel Research

I will now launch 3 research agents in parallel:

<parallel-execution>
Task(subagent_type: "general-purpose", prompt: "
You are the codebase-pattern-researcher agent.
[Load .claude/agents/codebase-pattern-researcher.md]
Task: Find existing patterns for [feature]
")

Task(subagent_type: "general-purpose", prompt: "
You are the framework-docs-researcher agent.
[Load .claude/agents/framework-docs-researcher.md]
Task: Research industry best practices for [feature]
")

Task(subagent_type: "general-purpose", prompt: "
You are the framework-docs-researcher agent.
[Load .claude/agents/framework-docs-researcher.md]
Task: Find relevant API documentation for [feature]
")
</parallel-execution>

All 3 agents execute simultaneously. Wait for all results before proceeding.
```

### How to Pass Context Between Agents

When agents run sequentially, pass relevant context:

```markdown
## Sequential Execution with Context Passing

**Step 1: Research** (completed)
- Pattern found: AuthContext using React Context
- Best practice: Server-side session validation
- API: NextAuth.js v5 patterns

**Step 2: Build** (passing research context)

Task(subagent_type: "general-purpose", prompt: "
You are the component-builder agent.
[Load .claude/agents/component-builder.md]

CONTEXT FROM RESEARCH:
- Use existing AuthContext pattern
- Implement server-side session validation
- Follow NextAuth.js v5 patterns

Task: Build the login component using this research
")
```

### How to Handle Conditional Agents

Analyze the task and invoke relevant agents:

```markdown
## Task Analysis

Request: "Build a contact form with API endpoint"

Analysis:
- ✅ Has forms → Invoke form-builder
- ✅ Has API → Invoke api-builder
- ❌ Has state management → Skip state-manager
- ❌ Has animations → Skip animation-builder

Invoking conditional agents: form-builder, api-builder
```

---

## Loop Prevention

### Rules to Prevent Infinite Recursion

1. **Max Delegation Depth**: Default 3, configurable per agent
2. **Cycle Detection**: Track agent call chain, reject if agent already in chain
3. **Timeout**: Maximum 5 minutes per orchestration
4. **Explicit Leaf Marking**: Agents marked as `type: leaf` cannot delegate

### Depth Tracking

```markdown
## Current Delegation Chain

depth=0: feature-orchestrator
  depth=1: research-orchestrator
    depth=2: codebase-pattern-researcher (LEAF - stops here)
    depth=2: framework-docs-researcher (LEAF - stops here)
  depth=1: component-builder (LEAF - stops here)
  depth=1: quality-orchestrator
    depth=2: code-reviewer (LEAF - stops here)
    depth=2: security-auditor (LEAF - stops here)

✅ All chains terminate at depth ≤ 3
```

### Cycle Detection Example

```markdown
## Cycle Detection

Call chain: A → B → C → A
                     ↑
                     CYCLE DETECTED!

Action: Reject call, log error:
"Cycle detected: agent 'A' is already in the call chain"
```

---

## Context Object Schema

When passing context between agents, use this structure:

```typescript
interface AgentContext {
  // Task information
  task: {
    description: string;
    complexity: 'simple' | 'medium' | 'complex';
    features: string[];
  };

  // Research results (from research phase)
  research: {
    existingPatterns: string[];
    bestPractices: string[];
    apiDocs: string[];
    codeExamples: string[];
  };

  // Build results (from build phase)
  build: {
    filesCreated: string[];
    filesModified: string[];
    componentsCreated: string[];
    testsCreated: string[];
  };

  // Review results (from review phase)
  review: {
    issues: Array<{
      severity: 'critical' | 'warning' | 'info';
      agent: string;
      message: string;
      file?: string;
      line?: number;
    }>;
    passed: boolean;
  };

  // Delegation tracking
  delegation: {
    depth: number;
    chain: string[];
    maxDepth: number;
  };
}
```

---

## Failure Handling

### Single Agent Failure

```markdown
## Handling Single Agent Failure

Parallel execution results:
- ✅ codebase-pattern-researcher: SUCCESS
- ❌ framework-docs-researcher: FAILED (network timeout)
- ✅ framework-docs-researcher: SUCCESS

Action:
1. Log failure: "framework-docs-researcher failed: network timeout"
2. Retry once: Re-invoke framework-docs-researcher
3. If still fails: Continue with available results
4. Note in context: "Research incomplete - missing best practices"
```

### Critical Agent Failure

```markdown
## Handling Critical Agent Failure

If security-auditor fails:
- ⛔ BLOCKING - Cannot proceed
- Action: Fix issue, re-run security-auditor
- Never skip security review

If code-reviewer fails:
- ⚠️ WARNING - Can proceed with caution
- Action: Manual review recommended
- Log: "Automated code review unavailable"
```

### Orchestrator Recovery

```markdown
## Orchestrator Recovery Pattern

try:
  1. Run parallel research
  2. Run sequential build
  3. Run parallel review
catch:
  - Log which phase failed
  - Preserve completed work
  - Report partial results
  - Suggest manual completion steps
```

---

## Best Practices

### DO ✅

1. **Maximize parallelism** - Run independent agents simultaneously
2. **Pass context explicitly** - Don't assume agents share state
3. **Use leaf agents for actual work** - Orchestrators should orchestrate, not implement
4. **Set reasonable depth limits** - Default 3 is usually sufficient
5. **Handle failures gracefully** - Partial results are better than no results

### DON'T ❌

1. **Don't create deep nesting** - If depth > 3, flatten your orchestration
2. **Don't pass unnecessary context** - Only pass what agents need
3. **Don't skip security reviews** - Always run security-auditor
4. **Don't ignore failures** - Log and handle all errors
5. **Don't hardcode agent logic** - Keep orchestrators flexible

---

## Example: Full Feature Orchestration

```markdown
# Building: User Profile Page with Edit Form

## Phase 0: Task Analysis
- Complexity: Medium (score 52)
- Features: UI, Forms, API, State
- Conditional agents needed: form-builder, api-builder, state-manager

## Phase 1: Parallel Research (3 agents)

[Launch 3 Task calls in single response]

Results aggregated:
- Pattern: Existing UserContext for user data
- Best practice: Optimistic updates for forms
- API: Server actions for mutations

## Phase 2: Sequential Build (with conditions)

Step 1: component-builder
- Created: src/components/profile/ProfileCard.tsx
- Created: src/components/profile/ProfileHeader.tsx

Step 2: form-builder (conditional: has forms)
- Created: src/components/profile/ProfileEditForm.tsx
- Created: src/lib/validations/profile.ts

Step 3: api-builder (conditional: has API)
- Created: src/app/api/profile/route.ts
- Created: src/actions/profile.ts

Step 4: state-manager (conditional: has state)
- Modified: src/stores/user-store.ts

Step 5: test-builder
- Created: src/components/profile/ProfileCard.test.tsx
- Created: src/components/profile/ProfileEditForm.test.tsx

## Phase 3: Parallel Review (3 agents)

[Launch 3 Task calls in single response]

Results:
- code-reviewer: ✅ PASSED (2 suggestions)
- security-auditor: ✅ PASSED
- accessibility-checker: ✅ PASSED (1 warning)

## Summary

Files created: 8
Tests created: 2
Issues found: 3 (2 suggestions, 1 warning)
Status: ✅ COMPLETE
```

---

## Related Documentation

- [AGENTS-INDEX.md](../AGENTS-INDEX.md) - List of all available agents
- [WORKFLOWS.md](../WORKFLOWS.md) - Workflow patterns
- [parallel-review skill](../skills/parallel-review/SKILL.md) - Parallel review implementation
- [parallel-quality skill](../skills/parallel-quality/SKILL.md) - Parallel quality implementation
