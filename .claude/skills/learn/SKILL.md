---
name: learn
description: "Reflect on completed work and update rules/agents if needed. Run automatically after flows complete, or manually when Claude makes a mistake."
invocable_by: both
arguments: "[lesson] - Optional: specific lesson to add. If omitted, auto-reflects on recent work."
tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Learn & Improve

This skill makes CLAUDE.md and agents a "living document" that evolves over time based on mistakes and learnings.

## When This Runs

1. **Automatically** - After any major flow completes (via hook)
2. **Manually** - When user notices Claude made a mistake: `/learn <lesson>`

## Input

**Lesson (optional):** $ARGUMENTS

---

## Mode 1: Manual Lesson (when $ARGUMENTS is provided)

Add the provided lesson to CLAUDE.md under "## Project-Specific Learnings":

### Steps:

1. Read current `CLAUDE.md`
2. Check if lesson already exists (avoid duplicates)
3. If new, append to "## Project-Specific Learnings" section
4. Keep it concise (one line)
5. Confirm the addition

### Format:
```markdown
### [Date] - [Topic]
- **Lesson:** [One-line description of the rule]
```

### Example:
```
/learn Always check if component is mounted before setting state
```
Becomes:
```markdown
### 2024-01-20 - React State Management
- **Lesson:** Always check if component is mounted before setting state in async operations
```

---

## Mode 2: Auto-Reflection (when $ARGUMENTS is empty)

Reflect on the most recent work and determine if any lessons should be captured.

### Steps:

1. **Review Recent Changes**
   - Check `git diff HEAD~1` or recent unstaged changes
   - Identify what was implemented/fixed

2. **Analyze for Learnings**
   Ask yourself:
   - Did I make any mistakes that required correction?
   - Did I discover a pattern that wasn't documented?
   - Did I find duplicate code that should have been reused?
   - Did I use a wrong import path or naming convention?
   - Did build/lint/typecheck fail and why?
   - Did I miss dark mode or responsive requirements?

3. **Categorize the Learning**

   | Category | Update Target |
   |----------|---------------|
   | Code pattern mistake | CLAUDE.md "Project-Specific Learnings" |
   | Agent behavior issue | Relevant agent in `.claude/agents/` |
   | Skill workflow gap | Relevant skill in `.claude/skills/` |
   | Missing reference info | `.claude/references/` |

4. **Apply Updates**

   **For CLAUDE.md updates:**
   - Add to "## Project-Specific Learnings" section
   - Use date and topic format
   - Max one line per lesson

   **For Agent updates:**
   - Add to agent's instruction section
   - Be specific about the edge case

   **For Skill updates:**
   - Add step or clarification to workflow
   - Document edge case handling

5. **Report Changes**

   Output format:
   ```markdown
   ## 📚 Learning Applied

   ### What Happened
   [Brief description of the issue/discovery]

   ### Lesson Learned
   [The insight]

   ### Changes Made
   - [File]: [Change description]

   ### No Changes Needed
   [If nothing to update, explain why]
   ```

---

## Decision Framework

### Should this be a CLAUDE.md lesson?

✅ **YES** if:
- It's a mistake Claude makes repeatedly
- It's a hard rule with no exceptions
- It applies across all features
- It's about code quality/safety
- It's about Next.js/React patterns

❌ **NO** if:
- It's feature-specific (use agent/skill instead)
- It's a one-time edge case
- It's already documented elsewhere
- It's too verbose (keep rules concise)

### Should this update an agent?

✅ **YES** if:
- The agent missed a specific check
- The agent's output format was wrong
- The agent needs to handle a new edge case

### Should this update a skill?

✅ **YES** if:
- A workflow step was missing
- The skill didn't handle an edge case
- The skill's output format needs improvement

---

## Next.js Specific Learnings to Watch For

- Server vs Client component boundaries
- Proper use of `'use client'` directive
- Data fetching patterns (Server Components vs SWR vs React Query)
- Image optimization with next/image
- Font optimization with next/font
- Metadata API usage
- Route handlers vs Server Actions
- shadcn/ui component patterns
- Tailwind class ordering
- Dark mode implementation
- Responsive design breakpoints

---

## Examples

### Example 1: Manual lesson about imports
```
/learn Always use @/ alias for imports instead of relative paths
```

**Result:** Adds to CLAUDE.md:
```markdown
### 2024-01-20 - Import Patterns
- **Lesson:** Always use `@/` alias for imports instead of relative paths
```

### Example 2: Auto-reflection finds Server/Client boundary issue
```
/learn
```

**Analysis:** Used `useState` in a Server Component without adding `'use client'` directive.

**Result:** Adds to CLAUDE.md:
```markdown
### 2024-01-20 - Server Components
- **Lesson:** Check for hooks/event handlers before deciding if component needs `'use client'`
```

---

## Important Notes

- Keep CLAUDE.md minimal - only add truly critical rules
- Prefer updating specific agents/skills over adding generic rules
- Don't add lessons that are already implied by existing rules
- Each rule should be one line maximum
- Always verify dark mode and responsive design after changes
