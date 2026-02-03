---
name: task
description: "SMART ROUTER: Automatically analyzes a task description, classifies complexity, and routes to the appropriate workflow. Just describe what you need - no need to know which command to use."
invocable_by: both
arguments: "<task-description> [--dry-run]"
tools:
  - Read
  - Glob
  - Grep
  - Task
  - TodoWrite
---

# Smart Task Router

Automatically detect task complexity and route to the right workflow.

## Input
- **Task Description:** $ARGUMENTS
- **Flag:** `--dry-run` (optional) - Analyze and classify only, don't execute

## How It Works

```
/task <description>
    │
    ▼
┌─────────────────────┐
│  ANALYZE TASK       │
│  - Sub-tasks count  │
│  - UI components    │
│  - Flow complexity  │
│  - Scope breadth    │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  CLASSIFY           │
│  Score 0-100        │
│  - Complex (60+)    │
│  - Medium (40-59)   │
│  - Simple (<40)     │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  ROUTE              │
│  Complex → /implement-epic
│  Medium → Ask user
│  Simple → /build
└─────────────────────┘
```

## Step 1: Parse Task Description

Analyze the user's description for complexity indicators.

## Step 2: Analyze & Score

### Scoring Criteria (0-100 points)

| Criteria | Points | How to Detect |
|----------|--------|---------------|
| **Sub-tasks** | 0-25 | Count implicit tasks in description |
| | 0 pts | 1 task implied |
| | 10 pts | 2-3 tasks implied |
| | 20 pts | 4-6 tasks implied |
| | 25 pts | 7+ tasks implied |
| **UI Components** | 0-20 | Count screens/components mentioned |
| | 0 pts | 1-2 components |
| | 10 pts | 3-5 components |
| | 20 pts | 6+ components |
| **User Flows** | 0-20 | Count distinct user journeys |
| | 0 pts | 1 flow |
| | 10 pts | 2-3 flows |
| | 20 pts | 4+ flows |
| **Scope Breadth** | 0-20 | Count features/areas touched |
| | 0 pts | 1 area |
| | 10 pts | 2-3 areas |
| | 20 pts | 4+ areas |
| **Description Length** | 0-15 | Word count of description |
| | 0 pts | < 50 words |
| | 8 pts | 50-150 words |
| | 15 pts | > 150 words |

### Detection Patterns

**Sub-tasks:**
```
Look for:
- Numbered lists (1., 2., 3.)
- Bullet points with distinct actions
- Words like "first", "then", "also", "and"
- Multiple verbs (create, add, update, delete)
```

**UI Components:**
```
Look for:
- "page", "screen", "view"
- "component", "widget", "card"
- "form", "input", "button"
- "modal", "dialog", "popup"
- "table", "list", "grid"
```

**User Flows:**
```
Look for:
- "when user", "after user"
- "login flow", "signup flow"
- "checkout process"
- "form submission"
- Conditional paths (if/then)
```

**Scope Breadth (Next.js specific):**
```
- "auth", "login", "signup" → Authentication
- "dashboard" → Dashboard feature
- "settings", "profile" → Settings/Profile
- "api", "endpoint" → API routes
- "admin" → Admin features
- "payment", "checkout" → Commerce
```

## Step 3: Classify

### Classification Rules

```
Score >= 60  →  🔴 COMPLEX (needs epic breakdown)
Score 40-59  →  🟡 MEDIUM (suggest approach, offer choice)
Score < 40   →  🟢 SIMPLE (direct implementation)
```

### Override Rules

**Force COMPLEX if any:**
- New authentication system
- Database schema changes
- Cross-feature integration
- Multiple new pages
- Real-time features

**Force SIMPLE if any:**
- Bug fix
- Styling tweak
- Text change
- Single component update

## Step 4: Present Analysis

Output the analysis before routing:

```markdown
## 🎯 Task Analysis

**Description:** [summary]

### Complexity Score: [XX]/100

| Criteria | Score | Details |
|----------|-------|---------|
| Sub-tasks | X/25 | [N] tasks implied |
| UI Components | X/20 | [N] components mentioned |
| User Flows | X/20 | [N] flows identified |
| Scope Breadth | X/20 | [N] areas touched |
| Description | X/15 | [N] words |

### Classification: [🔴 COMPLEX / 🟡 MEDIUM / 🟢 SIMPLE]

**Reasoning:**
- [Key factor 1]
- [Key factor 2]
- [Key factor 3]

### Recommended Approach
[Description of recommended workflow]

---

**Proceeding with:** `/implement-epic` or `/build`
```

## Step 5: Route to Workflow

### If Complex (60+):
```
Launching /implement-epic workflow...

This will:
1. Break task into smaller sub-tasks
2. Show task breakdown for approval
3. Implement each task sequentially
4. Verify after each task
```

### If Simple (<40):
```
Launching /build workflow...

This will:
1. Analyze requirements
2. Create necessary components
3. Implement with proper patterns
4. Verify build and lint
```

### If Medium (40-59):
```
⚠️ This task is borderline.

I recommend: [Complex/Simple] because [reason]

Options:
1. Proceed with recommended approach
2. Use /implement-epic (break into tasks first)
3. Use /build (direct implementation)
4. --dry-run (just show analysis, don't execute)

Which would you prefer?
```

Wait for user choice before proceeding.

## Step 6: Execute

Hand off to the appropriate skill.

## Usage Examples

```bash
# Auto-detect and execute
/task Add a user profile page with avatar upload and settings

# Just analyze, don't execute
/task Create a dashboard with analytics widgets --dry-run

# Simple task
/task Fix the button alignment on the login page

# Complex task
/task Implement user authentication with OAuth, email verification, and password reset
```

## Example Output

```markdown
## 🎯 Task Analysis

**Description:** Implement user authentication with OAuth, email verification, and password reset

### Complexity Score: 72/100

| Criteria | Score | Details |
|----------|-------|---------|
| Sub-tasks | 20/25 | 4 tasks (OAuth, email verify, password reset, base auth) |
| UI Components | 15/20 | 5 components (login, signup, verify, reset forms, buttons) |
| User Flows | 15/20 | 3 flows (login, signup, recovery) |
| Scope Breadth | 15/20 | 3 areas (auth, email, settings) |
| Description | 7/15 | 11 words |

### Classification: 🔴 COMPLEX

**Reasoning:**
- Multiple authentication methods (OAuth + email)
- Email verification requires backend integration
- Password reset is a full flow with security considerations
- Auth override rule triggered

### Recommended Approach
Break into tasks using /implement-epic, then implement each:
1. Base authentication setup
2. OAuth integration
3. Email verification
4. Password reset flow

---

**Proceeding with:** `/implement-epic`
```

## Edge Cases

**Ambiguous scope:**
- Ask clarifying questions before classifying
- "Does this need [X]?" approach

**Mixed complexity:**
- If some parts are simple, some complex
- Break out complex parts, do simple ones inline

**Missing context:**
- Ask for more details if task is too vague
- "What should happen when...?"
