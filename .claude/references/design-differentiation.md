# Design Differentiation Guide

Templates looking the same? Use these resources to create unique, high-quality designs.

## Available Approaches

| Approach | When to Use | Skill/Reference |
|----------|-------------|-----------------|
| **Build from description** | You know what you want, we research + build | `/new-website` |
| **Modernize old sites** | Preserve content, competitor-inspired design | `/modernize-website` |
| **Clone single site** | Quick visual replication of one site | `/clone-website` |
| **Sector research** | Analyze competitors, extract patterns | `@sector-researcher` |
| **Visual testing** | Lock in unique designs with screenshots | `.claude/references/playwright-visual-testing.md` |

## Quick Comparison

| Skill | Input | Content | Design Source |
|-------|-------|---------|---------------|
| `/new-website` | Your description | New (you provide) | Research competitors, build best |
| `/modernize-website` | Existing URL | Preserve exactly | Research competitors, use patterns |
| `/clone-website` | Existing URL | Copy | Clone from single site |

## The Magic Formula

```
YOUR VISION / OLD CONTENT
        +
TOP COMPETITOR PATTERNS (researched)
        =
UNIQUE SITE (best-in-class presentation)
```

## Example Commands

```bash
# Describe what you want → We research and build
/new-website fintrack "fintech dashboard for crypto" --focus="analytics, charts"
/new-website lawsite "professional law firm website" --focus="trust, services"

# Modernize old site → Preserve content, competitor-inspired design
/modernize-website acme-refresh --from=https://old-company-site.com

# Clone a single site's design
/clone-website https://beautiful-site.com
```

## Related Resources

- **Sector Researcher Agent**: `.claude/agents/sector-researcher.md`
- **Visual Testing Reference**: `.claude/references/playwright-visual-testing.md`
- **New Website Skill**: `.claude/skills/new-website/SKILL.md`
- **Modernize Website Skill**: `.claude/skills/modernize-website/SKILL.md`
