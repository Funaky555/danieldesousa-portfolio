---
name: browser-automation
description: "Automate browser interactions for testing or scraping. Uses Claude-in-Chrome MCP."
invocable_by: user
tools:
  - Bash
  - Read
---

# Browser Automation Skill

## Overview

This skill provides browser automation capabilities using [agent-browser](https://github.com/vercel-labs/agent-browser) from Vercel Labs. It enables visual tasks, website analysis, screenshots, and automated interactions.

**Key Feature**: Uses deterministic element refs (`@e1`, `@e2`) from snapshots instead of fragile CSS selectors - optimal for AI-driven automation.

## Installation

```bash
# Install globally
npm install -g agent-browser

# Download Chromium browser
agent-browser install

# Linux users should include system dependencies
agent-browser install --with-deps
```

## Core Concepts

### Refs (Element References)
Instead of fragile selectors, snapshots provide deterministic refs like `@e1`, `@e2`.

**Workflow**: `open` → `snapshot` → identify refs → interact using refs → re-snapshot if needed

### Sessions
Multiple isolated browser instances can run simultaneously:
```bash
agent-browser open https://site1.com --session browser1
agent-browser open https://site2.com --session browser2
```

## Commands

### Navigation

```bash
# Open URL (starts session)
agent-browser open https://example.com

# Open with session name
agent-browser open https://example.com --session mysession
```

### Screenshots

```bash
# Current viewport
agent-browser screenshot output.png

# Full page (scrollable)
agent-browser screenshot --full output.png

# After opening a URL
agent-browser open https://example.com
agent-browser screenshot --full screenshot.png
```

### Snapshots (Accessibility Tree)

```bash
# Full snapshot with element refs
agent-browser snapshot

# Compact mode (less verbose)
agent-browser snapshot -c

# Interactive elements only
agent-browser snapshot -i

# Limit depth
agent-browser snapshot -d 3

# Scoped to selector
agent-browser snapshot -s ".hero"
```

### Interactions

```bash
# Click (using ref from snapshot)
agent-browser click @e5

# Fill input (clears first)
agent-browser fill @e3 "search text"

# Type without clearing
agent-browser type @e3 "hello"

# Press key
agent-browser press Enter

# Hover
agent-browser hover @e7

# Scroll
agent-browser scroll down
agent-browser scroll up
agent-browser scroll @e5

# Check/uncheck checkboxes
agent-browser check @e4
agent-browser uncheck @e4

# Drag and drop
agent-browser drag @e1 @e2
```

### Data Extraction

```bash
# Get text content
agent-browser get text @e1

# Get HTML
agent-browser get html @e1

# Get input value
agent-browser get value @e1

# Get attribute
agent-browser get attr @e1 href

# Get page title
agent-browser get title

# Get current URL
agent-browser get url

# Get element count
agent-browser get count "button"

# Get bounding box
agent-browser get box @e1
```

### Semantic Locators

Find elements by accessibility semantics:

```bash
# Find by ARIA role
agent-browser find role button click

# Find by text content
agent-browser find text "Submit" click

# Find by label
agent-browser find label "Email" fill "test@example.com"

# Find by placeholder
agent-browser find placeholder "Search..." fill "query"

# Find by alt text
agent-browser find alt "Logo" click

# Find by test ID
agent-browser find testid "submit-btn" click
```

### Browser Settings

```bash
# Set viewport size
agent-browser set viewport 1440 900

# Set device emulation
agent-browser set device "iPhone 14"

# Set geolocation
agent-browser set geo 37.7749 -122.4194

# Set offline mode
agent-browser set offline true

# Set custom headers
agent-browser set headers '{"Authorization": "Bearer token"}'

# Set media features (dark mode)
agent-browser set media '{"prefers-color-scheme": "dark"}'
```

### JavaScript Evaluation

```bash
# Run JavaScript
agent-browser eval "document.title"

# Extract data
agent-browser eval "document.querySelector('h1').textContent"

# Complex extraction
agent-browser eval "JSON.stringify(Array.from(document.querySelectorAll('a')).map(a => a.href))"
```

### Waiting

```bash
# Wait for selector
agent-browser wait "@e5"

# Wait for text
agent-browser wait text "Success"

# Wait for URL pattern
agent-browser wait url "/dashboard"

# Wait for load state
agent-browser wait load

# Wait for JavaScript condition
agent-browser wait js "document.readyState === 'complete'"

# Wait with timeout (ms)
agent-browser wait "@e5" --timeout 10000
```

### State Management

```bash
# Save browser state (cookies, localStorage)
agent-browser state save auth-state.json

# Load browser state
agent-browser state load auth-state.json
```

## Workflows

### Clone Website Flow

```bash
# 1. Open target site
agent-browser open https://stripe.com

# 2. Take full page screenshot
agent-browser screenshot --full target-full.png

# 3. Get page structure
agent-browser snapshot -c > structure.txt

# 4. Extract design tokens
agent-browser eval "
  const root = getComputedStyle(document.documentElement);
  const tokens = {};
  for (let i = 0; i < root.length; i++) {
    const prop = root[i];
    if (prop.startsWith('--')) {
      tokens[prop] = root.getPropertyValue(prop).trim();
    }
  }
  JSON.stringify(tokens, null, 2);
"

# 5. Extract colors
agent-browser eval "
  const colors = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
    if (s.color) colors.add(s.color);
  });
  JSON.stringify([...colors]);
"

# 6. Extract fonts
agent-browser eval "
  const fonts = new Set();
  document.querySelectorAll('*').forEach(el => {
    const font = getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/[\"']/g, '');
    if (font) fonts.add(font);
  });
  JSON.stringify([...fonts]);
"
```

### Multi-Viewport Screenshots

```bash
# Mobile (iPhone 14)
agent-browser set viewport 390 844
agent-browser screenshot mobile.png

# Tablet (iPad)
agent-browser set viewport 768 1024
agent-browser screenshot tablet.png

# Desktop
agent-browser set viewport 1440 900
agent-browser screenshot desktop.png

# Full page at each size
agent-browser set viewport 390 844
agent-browser screenshot --full mobile-full.png
```

### Visual Comparison Flow

```bash
# Screenshot target
agent-browser open https://target-site.com
agent-browser screenshot --full target.png

# Screenshot local build
agent-browser open http://localhost:3000
agent-browser screenshot --full current.png

# Compare visually (read both images for comparison)
```

### Form Testing

```bash
agent-browser open http://localhost:3000/contact
agent-browser snapshot -i  # Interactive elements only

# Fill form using refs from snapshot
agent-browser fill @e3 "John Doe"
agent-browser fill @e4 "john@example.com"
agent-browser fill @e5 "Test message"
agent-browser click @e6

# Verify success
agent-browser wait text "Thank you"
agent-browser screenshot success.png
```

## Viewport Presets

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375 | 667 |
| iPhone 14 | 390 | 844 |
| iPhone 14 Pro Max | 430 | 932 |
| iPad | 768 | 1024 |
| iPad Pro | 1024 | 1366 |
| Laptop | 1366 | 768 |
| Desktop | 1440 | 900 |
| Large Desktop | 1920 | 1080 |

## Options

| Flag | Purpose |
|------|---------|
| `--session <name>` | Use isolated browser instance |
| `--headed` | Show browser window (visible) |
| `--json` | Machine-readable output |
| `--debug` | Enable debug logging |
| `--timeout <ms>` | Set command timeout |

## Best Practices

1. **Always snapshot first**: Get refs before interacting
2. **Use refs over selectors**: More reliable across page changes
3. **Wait for content**: Dynamic sites need waits
4. **Set consistent viewports**: Match target and local screenshots
5. **Use sessions**: Isolate different test contexts
6. **Handle modals**: Dismiss cookie banners, popups before screenshots

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Chromium not found" | Run `agent-browser install` |
| Element not found | Run `snapshot` first to get current refs |
| Timeout | Increase timeout, check URL is accessible |
| Screenshot blank | Wait for page load with `wait load` |
| Wrong viewport | Explicitly `set viewport` before screenshot |
| Content cut off | Use `--full` flag for full page |
| Dynamic content missing | Add `wait` commands before screenshot |

## Integration with Clone Workflow

The clone-website skill should:

1. **First**: Use agent-browser to screenshot and snapshot target
2. **Extract**: Colors, fonts, spacing from computed styles
3. **Build**: Create components matching visual reference
4. **Compare**: Screenshot local vs target
5. **Iterate**: Fix differences until match

```bash
# Ideal clone workflow
agent-browser open https://target.com
agent-browser screenshot --full target.png
agent-browser snapshot -c > structure.txt

# Build components...

agent-browser open http://localhost:3000
agent-browser screenshot --full current.png

# Compare and iterate
```
