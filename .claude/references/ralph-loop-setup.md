# Ralph Loop Setup Guide

## Overview

Ralph Loop is an iterative development pattern for Claude Code that enables autonomous, multi-step task completion with visual feedback and continuous refinement. It's particularly useful for website cloning and complex feature implementation.

## What is Ralph Loop?

Ralph Loop is a Claude Code plugin that:
- Runs iterative development cycles
- Compares progress against completion criteria
- Continues until a "completion promise" is detected
- Allows for visual comparison and refinement

## Installation

### Option 1: ralph-loop Plugin (Recommended)

```bash
# Install the ralph-loop plugin globally
npm install -g @anthropic/ralph-loop

# Or via Claude Code plugins
claude plugins install ralph-loop
```

### Option 2: Manual Implementation

If the plugin isn't available, you can simulate Ralph Loop behavior manually:

```markdown
## Manual Ralph Loop Pattern

When working on complex tasks:

1. **Define completion criteria** clearly
2. **Work in iterations**:
   - Make changes
   - Evaluate progress
   - Identify remaining work
   - Continue until complete
3. **Signal completion** with: <promise>TASK COMPLETE</promise>
```

## Usage

### Basic Syntax

```bash
/ralph-loop "<task description>" --completion-promise "<signal>" --max-iterations <n>
```

### Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `task` | Description of what to accomplish | Required |
| `--completion-promise` | Signal text when task is complete | "TASK COMPLETE" |
| `--max-iterations` | Maximum iteration cycles | 15 |

### Examples

#### Website Cloning
```bash
/ralph-loop "Clone stripe.com homepage. Work section by section: Navigation, Hero, Features, Footer. Compare visually with target after each section." --completion-promise "CLONE COMPLETE" --max-iterations 15
```

#### Epic Feature Implementation
```bash
/ralph-loop "Implement user authentication: 1) Setup auth provider 2) Create login/signup pages 3) Add protected routes 4) Test all flows" --completion-promise "AUTH COMPLETE" --max-iterations 20
```

#### Responsive Design
```bash
/ralph-loop "Make the dashboard fully responsive. Test at mobile (375px), tablet (768px), and desktop (1440px). Fix all layout issues." --completion-promise "RESPONSIVE COMPLETE" --max-iterations 10
```

## Integration with /build Skill

The `/build` skill automatically uses Ralph Loop for:

| Task Type | Triggers Ralph Loop |
|-----------|---------------------|
| Clone requests | Always |
| Epic complexity (6+ score) | Always |
| Multi-page features | Usually |
| Iterative refinement | As needed |

### Automatic Activation

When you run:
```bash
/build clone linear.app
```

The dispatcher will automatically:
1. Detect clone intent
2. Activate `clone-website` skill
3. Start Ralph Loop with clone template
4. Set completion promise to "CLONE COMPLETE"

## Best Practices

### 1. Clear Task Descriptions

```bash
# BAD - Vague
/ralph-loop "Make website look good"

# GOOD - Specific
/ralph-loop "Clone stripe.com hero section: gradient mesh background, headline 'Financial infrastructure', two CTA buttons, tilted dashboard image"
```

### 2. Define Completion Criteria

```bash
# Include measurable goals
/ralph-loop "Build pricing page with 3 tiers. Complete when:
- All 3 pricing cards display correctly
- Toggle switches between monthly/annual
- CTA buttons are functional
- Responsive on mobile" --completion-promise "PRICING COMPLETE"
```

### 3. Set Appropriate Iteration Limits

| Task Complexity | Suggested Max Iterations |
|-----------------|-------------------------|
| Simple (1-2 components) | 5 |
| Medium (page with sections) | 10 |
| Complex (multi-page, clone) | 15-20 |
| Very Complex (full app) | 25-30 |

### 4. Break Large Tasks

Instead of:
```bash
/ralph-loop "Build entire e-commerce site"
```

Do:
```bash
/ralph-loop "Build product listing page with filters"
/ralph-loop "Build product detail page"
/ralph-loop "Build shopping cart"
/ralph-loop "Build checkout flow"
```

## Templates

### Clone Template

Located at: `.claude/skills/build/ralph-templates/clone.md`

```markdown
## Clone Task: [URL]

### Sections to Build
1. Navigation
2. Hero
3. Features
4. [Additional sections...]
5. Footer

### Per-Section Process
1. Analyze target section
2. Build initial version
3. Compare with target
4. Identify differences
5. Fix and refine
6. Move to next section

### Completion Criteria
- All sections present
- Colors ~90% match
- Typography matches
- Responsive design works
- Interactive elements functional

### Signal
<promise>CLONE COMPLETE</promise>
```

### Epic Template

Located at: `.claude/skills/build/ralph-templates/epic.md`

```markdown
## Epic Task: [Feature Name]

### Phases
1. Setup & Foundation
2. Core Components
3. Data Layer
4. Integration
5. Polish

### Per-Phase Process
1. Define phase scope
2. Implement features
3. Verify functionality
4. Run quality checks
5. Move to next phase

### Completion Criteria
- All features implemented
- TypeScript passes
- Lint passes
- Build succeeds
- Tests pass (if applicable)

### Signal
<promise>TASK COMPLETE</promise>
```

## Fallback Without Plugin

If Ralph Loop plugin is unavailable, use this manual approach:

```markdown
## Manual Iterative Development

I'll work on this task iteratively:

**Task**: [Description]
**Completion Criteria**: [What defines "done"]

### Iteration 1
- [Work done]
- [Progress made]
- [Remaining work]

### Iteration 2
- [Work done]
- [Progress made]
- [Remaining work]

[Continue until complete]

### Final Status
<promise>TASK COMPLETE</promise>
```

## Troubleshooting

### Loop Doesn't Complete

1. Check completion promise matches exactly
2. Ensure task is achievable
3. Increase max iterations if needed
4. Verify all criteria are meetable

### Too Many Iterations

1. Break task into smaller chunks
2. Make completion criteria more specific
3. Reduce scope

### Progress Not Visible

1. Request screenshots after each iteration
2. Compare with target visually
3. List specific differences to fix

## Configuration

### Project Settings

In `.claude/project-config.json`:

```json
{
  "ralph": {
    "defaultMaxIterations": 15,
    "completionPromise": "TASK COMPLETE",
    "templates": {
      "epic": ".claude/skills/build/ralph-templates/epic.md",
      "clone": ".claude/skills/build/ralph-templates/clone.md"
    }
  }
}
```

### Per-Task Override

```bash
/ralph-loop "Task" --max-iterations 25 --completion-promise "CUSTOM COMPLETE"
```
