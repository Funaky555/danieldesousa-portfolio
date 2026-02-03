# Synthesis Brief Template

Use this template to document the synthesized design decisions from competitive research.

---

## Synthesis: {Project Name}

**Sector:** {sector}
**Focus Areas:** {focus areas}
**Date:** {date}
**Complexity Score:** {score}/100 ({classification})

---

## Sources Analyzed

| # | Site | URL | Key Strength | Score |
|---|------|-----|--------------|-------|
| 1 | {Site Name} | {url} | {what they do best} | {X}/10 |
| 2 | {Site Name} | {url} | {what they do best} | {X}/10 |
| 3 | {Site Name} | {url} | {what they do best} | {X}/10 |
| 4 | {Site Name} | {url} | {what they do best} | {X}/10 |
| 5 | {Site Name} | {url} | {what they do best} | {X}/10 |

---

## Comparison Matrix

| Aspect | Site 1 | Site 2 | Site 3 | Site 4 | Site 5 | Winner | Adopted Because |
|--------|--------|--------|--------|--------|--------|--------|-----------------|
| **Hero Section** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Navigation** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Typography** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Color System** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Card Design** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Animations** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **Mobile UX** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |
| **{Focus Area}** | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {X}/10 | {winner} | {reason} |

---

## Adopted Patterns

### Hero Section
- **Inspired by:** {site name}
- **Pattern:** {description of the pattern}
- **Why adopted:** {reasoning}
- **Implementation notes:** {specific implementation details}

### Navigation
- **Inspired by:** {site name}
- **Pattern:** {description}
- **Why adopted:** {reasoning}
- **Implementation notes:** {details}

### Typography
- **Inspired by:** {site name}
- **Heading font:** {font name}
- **Body font:** {font name}
- **Scale:** {size scale description}
- **Why adopted:** {reasoning}

### Color System
- **Inspired by:** {site name}
- **Primary:** {color} - {usage}
- **Accent:** {color} - {usage}
- **Background:** {light} / {dark}
- **Why adopted:** {reasoning}

### Card Components
- **Inspired by:** {site name}
- **Pattern:** {description}
- **Border radius:** {value}
- **Shadow:** {description}
- **Why adopted:** {reasoning}

### Animations & Interactions
- **Inspired by:** {site name}
- **Page transitions:** {description}
- **Hover effects:** {description}
- **Scroll animations:** {description}
- **Micro-interactions:** {description}

### {Focus Area Specific Pattern}
- **Inspired by:** {site name}
- **Pattern:** {description}
- **Why adopted:** {reasoning}
- **Implementation notes:** {details}

---

## Design Tokens

Reference: `src/styles/design-tokens.css`

```css
:root {
  /* Colors */
  --primary: {hsl value};
  --primary-foreground: {hsl value};
  --secondary: {hsl value};
  --secondary-foreground: {hsl value};
  --accent: {hsl value};
  --accent-foreground: {hsl value};
  --background: {hsl value};
  --foreground: {hsl value};
  --card: {hsl value};
  --card-foreground: {hsl value};
  --muted: {hsl value};
  --muted-foreground: {hsl value};
  --border: {hsl value};
  --ring: {hsl value};

  /* Typography */
  --font-sans: {font stack};
  --font-heading: {font stack};
  --font-mono: {font stack};

  /* Spacing */
  --section-padding-mobile: {value};
  --section-padding-desktop: {value};
  --container-max: {value};

  /* Radius */
  --radius-sm: {value};
  --radius-md: {value};
  --radius-lg: {value};
  --radius-xl: {value};

  /* Shadows */
  --shadow-sm: {value};
  --shadow-md: {value};
  --shadow-lg: {value};
  --shadow-glow: {value};
}

.dark {
  --background: {dark value};
  --foreground: {dark value};
  --card: {dark value};
  --card-foreground: {dark value};
  --border: {dark value};
  --muted: {dark value};
  --muted-foreground: {dark value};
}
```

---

## Unique Differentiator

### Market Gap Identified
{Description of what ALL competitors are missing or doing poorly}

### Our Approach
{How we will differentiate and fill this gap}

### Implementation
{Specific features/patterns that make us unique}

---

## Pages to Build

### 1. Homepage / Landing
**Route:** `/`
**Sections:**
1. {Section name} - {brief description}
2. {Section name} - {brief description}
3. {Section name} - {brief description}
4. {Section name} - {brief description}
5. {Section name} - {brief description}

**Key components:**
- {Component} - inspired by {source}
- {Component} - inspired by {source}

### 2. {Page Name}
**Route:** `/{route}`
**Sections:**
1. {Section name} - {brief description}
2. {Section name} - {brief description}

**Key components:**
- {Component} - inspired by {source}

### 3. {Page Name}
**Route:** `/{route}`
**Sections:**
1. {Section name} - {brief description}
2. {Section name} - {brief description}

**Key components:**
- {Component} - inspired by {source}

---

## Component Inventory

| Component | Source Inspiration | shadcn Base | Custom Styling |
|-----------|-------------------|-------------|----------------|
| {Component} | {site} | {Button/Card/etc} | {yes/no} |
| {Component} | {site} | {Button/Card/etc} | {yes/no} |
| {Component} | {site} | {Button/Card/etc} | {yes/no} |

---

## Implementation Priority

### Phase 1: Foundation
- [ ] Design tokens CSS file
- [ ] Tailwind config updates
- [ ] Layout component (header, footer)

### Phase 2: Core Pages
- [ ] Homepage sections
- [ ] Navigation (desktop + mobile)
- [ ] Footer

### Phase 3: Additional Pages
- [ ] {Page name}
- [ ] {Page name}

### Phase 4: Polish
- [ ] Animations
- [ ] Dark mode refinement
- [ ] Responsive testing
- [ ] Performance optimization

---

## Notes & Decisions

### Approved by user:
- {Date}: {decision made}

### Open questions:
- {Question that needs resolution}

### Deferred features:
- {Feature to implement later}
