---
name: init
description: "Initialize a new project from this boilerplate. Sets up folder structure, installs dependencies, configures git."
invocable_by: user
tools:
  - Bash
  - Write
  - Read
  - Edit
---

# /init - Project Initialization Skill

## Overview

Initialize a new Next.js frontend project from this boilerplate. This skill copies the project structure, updates configuration files, initializes git, and installs dependencies.

## Usage

```
/init <project-name>
```

## Requirements

- Project name must be lowercase, no spaces (use hyphens)
- Node.js 18+ installed
- npm or yarn available

## What It Does

### Phase 1: Validation
1. Validate project name (lowercase, no spaces, valid npm name)
2. Check target directory doesn't exist
3. Verify Node.js is available

### Phase 2: Project Creation
1. Create new project directory
2. Copy boilerplate structure (excluding node_modules, .git, .next, build artifacts)
3. Files to copy:
   - `src/` - All source code
   - `.claude/` - Agents, skills, references
   - `public/` - Static assets
   - Configuration files (package.json, tsconfig.json, tailwind.config.ts, etc.)

### Phase 3: Configuration Updates
1. Update `package.json`:
   - Replace `name` with project name
   - Reset version to `1.0.0`

2. Update `.claude/project-config.json`:
   - Replace `project.name` with project name

3. Update `CLAUDE.md`:
   - Replace title with project name

### Phase 4: Environment Setup
1. Copy `.env.example` to `.env.local` (if exists)
2. Note any required environment variables

### Phase 5: Git Initialization
1. Run `git init`
2. Create `.gitignore` if not present
3. Create initial commit: "Initial commit from claude-code-boilerplate"

### Phase 6: Dependency Installation
1. Run `npm install`
2. Optionally run `npx shadcn@latest init` if shadcn not already configured

### Phase 7: Next Steps
Display:
```markdown
## Project Created Successfully!

### Next Steps

1. Configure your environment:
   ```bash
   cd <project-name>
   # Edit .env.local if needed
   ```

2. Add shadcn components (if needed):
   ```bash
   npx shadcn@latest add button card input
   ```

3. Start development:
   ```bash
   npm run dev
   ```

4. Use Claude Code commands:
   - `/build <task>` - Start building features
   - `/discover` - See available agents and skills
   - `/assess <task>` - Check task complexity
   - `/clone-website <url>` - Clone a website design

### Project Structure

```
<project-name>/
├── src/
│   ├── app/           # App Router pages
│   ├── components/    # React components
│   │   └── ui/        # shadcn/ui components
│   └── lib/           # Utilities
├── public/            # Static files
└── .claude/           # AI agents and skills
```

### Mandatory Defaults (Already Configured)

- **shadcn/ui**: All UI components use shadcn
- **Dark mode**: Semantic colors configured
- **Responsive**: Mobile-first breakpoints

Happy building!
```

## Example

```
User: /init my-nextjs-app

Bot: Creating new project 'my-nextjs-app'...

✓ Project directory created
✓ Boilerplate files copied
✓ Configuration updated
✓ Environment file created
✓ Git repository initialized
✓ Dependencies installed

Your project is ready! See next steps above.
```

## Error Handling

| Error | Solution |
|-------|----------|
| Directory exists | Choose different name or delete existing |
| Invalid name | Use lowercase letters, numbers, hyphens only |
| npm not found | Install Node.js first |
| Permission denied | Check folder permissions |

## Notes

- shadcn/ui components may need to be added based on your needs
- The `.claude/` folder contains all AI context and agents
- Dark mode and responsive design are preconfigured
