# Example: SaaS Landing Page

This example demonstrates the `/new-website` skill output for a SaaS landing page project.

## Command Used

```bash
/new-website devhub "developer tools landing" --focus="hero, features, pricing, testimonials"
```

---

## Phase 0: Complexity Assessment

### Score: 52/100 (MEDIUM)

| Criteria | Score | Reason |
|----------|-------|--------|
| Pages | 10/25 | Single landing page with sections |
| Features | 10/25 | Static content, some animations |
| Sector | 20/25 | Developer tools need credibility |
| Customization | 12/25 | Needs to stand out from templates |

### Conditional Agents Detected
- animation-builder (marketing animations)
- seo-optimizer (landing page SEO)
- image-optimizer (hero images, screenshots)

---

## Phase 2: Sites Analyzed

### 1. Vercel.com
**Score:** 9/10
**Strengths:**
- Technical credibility through design
- Gradient mastery
- Performance-focused messaging
- Clean code examples

**Adopted:**
- Gradient hero treatment
- Code block styling
- Performance badge design

### 2. Linear.app
**Score:** 9/10
**Strengths:**
- Bold, minimal typography
- Smooth scroll animations
- Product screenshots that sell
- Confident messaging

**Adopted:**
- Typography scale
- Section transitions
- Screenshot presentation

### 3. Raycast.com
**Score:** 8/10
**Strengths:**
- Developer-focused design
- Keyboard shortcut hints
- Clean iconography
- Great feature grid

**Adopted:**
- Feature card layout
- Icon treatment
- Developer-friendly copy style

### 4. Resend.com
**Score:** 8/10
**Strengths:**
- Beautiful dark mode
- Neon accent colors
- API-first presentation
- Trust through simplicity

**Adopted:**
- Color accent approach
- API showcase pattern
- Footer design

### 5. Supabase.com
**Score:** 8/10
**Strengths:**
- Open source credibility
- Comparison tables
- Integration showcases
- Community focus

**Adopted:**
- Integration logos grid
- Comparison approach
- Community section

---

## Phase 3: Synthesis Brief

### Design Tokens Generated

```css
:root {
  /* Developer-focused colors - Bold + Technical */
  --primary: 142 76% 36%;           /* Green - growth, go */
  --primary-foreground: 0 0% 100%;
  --accent: 262 83% 58%;            /* Purple - creativity */
  --accent-foreground: 0 0% 100%;

  /* Dark-first design (developers prefer dark) */
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  --card: 0 0% 100%;
  --muted: 220 14% 96%;
  --border: 220 13% 91%;

  /* Typography - Technical but readable */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-heading: "Cal Sans", "Inter", sans-serif;
  --font-mono: "Fira Code", "JetBrains Mono", monospace;

  /* Slightly more rounded for friendliness */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Pronounced shadows for depth */
  --shadow-card: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-glow: 0 0 40px rgba(34, 197, 94, 0.2);
}

.dark {
  --background: 224 71% 4%;
  --foreground: 210 40% 98%;
  --card: 224 71% 6%;
  --muted: 215 28% 17%;
  --border: 215 28% 17%;

  /* Glowing accents in dark mode */
  --shadow-glow: 0 0 60px rgba(34, 197, 94, 0.3);
}
```

### Sections to Build

1. **Hero**
   - Bold headline with gradient text
   - Subheadline with value prop
   - CTA buttons (primary + secondary)
   - Code snippet or product preview
   - Trust badges (GitHub stars, companies)

2. **Features Grid**
   - 6 features in 3x2 grid
   - Icon + title + description
   - Hover animations
   - Raycast-inspired cards

3. **Product Showcase**
   - Large screenshot/video
   - Feature callouts
   - Linear-inspired presentation

4. **Code Example**
   - Syntax-highlighted code block
   - Copy button
   - Multiple language tabs
   - Vercel-inspired styling

5. **Testimonials**
   - 3 testimonial cards
   - Avatar, name, company, role
   - Quote styling

6. **Pricing**
   - 3 tiers (Free, Pro, Enterprise)
   - Feature comparison
   - Highlighted recommended tier
   - Annual/monthly toggle

7. **FAQ**
   - Accordion component
   - 6-8 common questions

8. **CTA Section**
   - Final conversion push
   - Email signup or get started

9. **Footer**
   - Navigation links
   - Social links
   - Legal links
   - Newsletter signup

### Unique Differentiator

**Gap identified:** Most developer tool landing pages are either too corporate or too playful. Few strike the balance between technical credibility and approachability.

**Our approach:** "Technical confidence" - Design that respects developers' intelligence while being visually striking. Code examples that actually work, not lorem ipsum.

---

## Phase 4: Components Built

### Core Components

```
src/components/
├── landing/
│   ├── Hero.tsx                  # Gradient hero with code preview
│   ├── FeaturesGrid.tsx          # 6 features in grid
│   ├── ProductShowcase.tsx       # Large screenshot section
│   ├── CodeExample.tsx           # Syntax-highlighted code
│   ├── Testimonials.tsx          # 3 testimonial cards
│   ├── PricingTable.tsx          # 3-tier pricing
│   ├── FAQ.tsx                   # Accordion FAQ
│   ├── CTASection.tsx            # Final CTA
│   └── Footer.tsx                # Full footer
├── ui/
│   ├── GradientText.tsx          # Animated gradient text
│   ├── FeatureCard.tsx           # Hover-animated card
│   ├── CodeBlock.tsx             # Syntax highlighting
│   ├── PricingCard.tsx           # Individual tier
│   ├── TestimonialCard.tsx       # Quote card
│   └── TrustBadges.tsx           # Logo cloud
└── layout/
    ├── Header.tsx                # Sticky nav
    └── MobileNav.tsx             # Mobile menu
```

### Sample Component: GradientText

```tsx
// src/components/ui/GradientText.tsx
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}

// Add to globals.css:
// @keyframes gradient {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
// .animate-gradient {
//   animation: gradient 3s ease infinite;
// }
```

### Sample Component: FeatureCard

```tsx
// src/components/ui/FeatureCard.tsx
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5",
        "hover:-translate-y-1",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>

      {/* Hover gradient border effect */}
      <div className="absolute inset-0 rounded-lg border border-transparent transition-colors group-hover:border-primary/20" />
    </Card>
  );
}
```

---

## Phase 5: Review Results

### Code Review
- Status: PASSED
- Issues: 1 (info level)
- Suggestion: Consider lazy loading below-fold sections

### Security Audit
- Status: PASSED
- Vulnerabilities: 0
- Notes: No user input handling, minimal attack surface

### Accessibility
- Status: PASSED
- All sections have proper heading hierarchy
- Focus states on all interactive elements
- Reduced motion support for animations

---

## Phase 6: Quality Gates

| Gate | Status | Notes |
|------|--------|-------|
| TypeScript | PASS | No errors |
| Lint | PASS | No warnings |
| Build | PASS | 187KB first load JS |
| Dark Mode | PASS | Beautiful dark theme |
| Responsive | PASS | All breakpoints verified |

### Lighthouse Scores

| Metric | Score |
|--------|-------|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Final Output

### Files Created

```
devhub/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── landing/              # 9 section components
│   │   ├── layout/               # Header, MobileNav
│   │   └── ui/                   # 6 custom components
│   └── styles/
│       └── design-tokens.css
├── docs/
│   ├── research-report.md
│   └── synthesis-brief.md
├── public/
│   ├── og-image.png              # OpenGraph image
│   └── screenshots/              # Product screenshots
└── visual-baselines/
    ├── desktop-landing.png
    ├── tablet-landing.png
    ├── mobile-landing.png
    └── desktop-landing-dark.png
```

### SEO Metadata Generated

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "DevHub - Developer Tools Made Simple",
  description: "Build faster with DevHub. The all-in-one toolkit for modern developers.",
  openGraph: {
    title: "DevHub - Developer Tools Made Simple",
    description: "Build faster with DevHub. The all-in-one toolkit for modern developers.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHub - Developer Tools Made Simple",
    description: "Build faster with DevHub.",
    images: ["/og-image.png"],
  },
};
```

### Commands

```bash
cd ~/Desktop/devhub
npm run dev      # Start development
npm run build    # Production build
npm run test     # Run tests
vercel deploy    # Deploy to Vercel
```

### Next Steps

1. Add real product screenshots
2. Integrate analytics (Vercel Analytics, PostHog)
3. Add blog section for SEO
4. Set up email capture (ConvertKit, Resend)
5. A/B test hero variations
6. Add changelog page
