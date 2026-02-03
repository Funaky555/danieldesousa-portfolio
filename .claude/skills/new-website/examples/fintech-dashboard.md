# Example: Fintech Dashboard

This example demonstrates the `/new-website` skill output for a fintech dashboard project.

## Command Used

```bash
/new-website fintrack "fintech dashboard" --focus="analytics, charts, portfolio tracking"
```

---

## Phase 0: Complexity Assessment

### Score: 78/100 (COMPLEX)

| Criteria | Score | Reason |
|----------|-------|--------|
| Pages | 20/25 | Dashboard, portfolio, transactions, settings |
| Features | 25/25 | Real-time data, charts, complex state |
| Sector | 20/25 | Fintech requires trust, precision |
| Customization | 13/25 | Needs differentiation from competitors |

### Conditional Agents Detected
- state-manager (complex dashboard state)
- api-builder (data fetching, real-time updates)
- animation-builder (chart animations, transitions)
- form-builder (settings, filters)
- security-auditor (financial data handling)

---

## Phase 2: Sites Analyzed

### 1. Linear.app
**Score:** 9/10
**Strengths:**
- Exceptional typography and whitespace
- Smooth, purposeful animations
- Clean data density
- Keyboard-first navigation

**Adopted:**
- Typography scale and hierarchy
- Subtle hover animations
- Command palette pattern

### 2. Mercury.com
**Score:** 8/10
**Strengths:**
- Trust-building through simplicity
- Clear financial data presentation
- Excellent mobile responsive
- Professional color palette

**Adopted:**
- Financial data card layout
- Number formatting patterns
- Neutral, trustworthy colors

### 3. Stripe Dashboard
**Score:** 9/10
**Strengths:**
- Information density done right
- Excellent chart designs
- Filter and search patterns
- Multi-level navigation

**Adopted:**
- Chart styling and animations
- Filter pill components
- Breadcrumb navigation

### 4. Robinhood
**Score:** 7/10
**Strengths:**
- Bold, confident design
- Gamified portfolio view
- Real-time price updates
- Mobile-first approach

**Adopted:**
- Portfolio performance display
- Price change indicators
- Sparkline charts

### 5. Copilot Money
**Score:** 8/10
**Strengths:**
- Beautiful gradient usage
- Clear categorization
- Intuitive transactions list
- Smart insights presentation

**Adopted:**
- Transaction list design
- Category color coding
- Insight cards

---

## Phase 3: Synthesis Brief

### Design Tokens Generated

```css
:root {
  /* Fintech-specific colors - Trust + Growth */
  --primary: 217 91% 60%;           /* Blue - trust */
  --primary-foreground: 0 0% 100%;
  --accent: 142 76% 36%;            /* Green - growth/positive */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;         /* Red - loss/negative */

  /* Neutral, professional background */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --muted: 210 40% 96%;
  --border: 214 32% 91%;

  /* Typography - Clean, readable numbers */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;  /* For numbers */

  /* Tighter radius for professional feel */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Subtle shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
}

.dark {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --card: 222 47% 8%;
  --border: 217 33% 17%;
}
```

### Pages to Build

1. **Dashboard Overview** (`/`)
   - Portfolio summary card
   - Performance chart (line/area)
   - Asset allocation (donut chart)
   - Recent transactions
   - Quick actions

2. **Portfolio** (`/portfolio`)
   - Holdings table
   - Individual asset cards
   - Performance by asset
   - Allocation breakdown

3. **Transactions** (`/transactions`)
   - Transaction list with filters
   - Search functionality
   - Category breakdown
   - Export options

4. **Settings** (`/settings`)
   - Profile settings
   - Notification preferences
   - Connected accounts
   - Security settings

### Unique Differentiator

**Gap identified:** Most fintech dashboards feel overwhelming or too gamified.

**Our approach:** "Calm finance" - a dashboard that presents data clearly without anxiety-inducing real-time flashes. Thoughtful animations that feel professional, not distracting.

---

## Phase 4: Components Built

### Core Components

```
src/components/
├── dashboard/
│   ├── PortfolioSummary.tsx      # Mercury-inspired value display
│   ├── PerformanceChart.tsx      # Stripe-inspired charts
│   ├── AssetAllocation.tsx       # Donut chart component
│   ├── RecentTransactions.tsx    # Copilot-inspired list
│   └── QuickActions.tsx          # Linear-inspired actions
├── portfolio/
│   ├── HoldingsTable.tsx         # Stripe table patterns
│   ├── AssetCard.tsx             # Robinhood-inspired cards
│   └── AllocationBreakdown.tsx
├── transactions/
│   ├── TransactionList.tsx       # Copilot list design
│   ├── TransactionFilters.tsx    # Stripe filter pills
│   └── CategoryChart.tsx
└── ui/
    ├── StatCard.tsx              # Reusable stat display
    ├── TrendIndicator.tsx        # +/- with color
    ├── Sparkline.tsx             # Mini chart
    └── MoneyDisplay.tsx          # Formatted currency
```

### Sample Component: MoneyDisplay

```tsx
// src/components/ui/MoneyDisplay.tsx
import { cn } from "@/lib/utils";

interface MoneyDisplayProps {
  value: number;
  currency?: string;
  showSign?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function MoneyDisplay({
  value,
  currency = "USD",
  showSign = false,
  size = "md",
  className,
}: MoneyDisplayProps) {
  const isPositive = value >= 0;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    signDisplay: showSign ? "always" : "auto",
  }).format(value);

  return (
    <span
      className={cn(
        "font-mono tabular-nums",
        showSign && isPositive && "text-emerald-600 dark:text-emerald-400",
        showSign && !isPositive && "text-red-600 dark:text-red-400",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-xl font-semibold",
        size === "xl" && "text-3xl font-bold",
        className
      )}
    >
      {formatted}
    </span>
  );
}
```

---

## Phase 5: Review Results

### Code Review
- Status: PASSED
- Issues: 2 (info level)
- Suggestions: Extract chart colors to theme, consider memo for large lists

### Security Audit
- Status: PASSED
- Vulnerabilities: 0
- Notes: Ensure API routes validate authentication before returning financial data

### Accessibility
- Status: PASSED (with fixes)
- Fixed: Added aria-labels to chart elements, ensured color contrast for trend indicators

---

## Phase 6: Quality Gates

| Gate | Status | Notes |
|------|--------|-------|
| TypeScript | PASS | No errors |
| Lint | PASS | No warnings |
| Build | PASS | 234KB first load JS |
| Dark Mode | PASS | All components support |
| Responsive | PASS | 375px, 768px, 1440px |

---

## Final Output

### Files Created

```
fintrack/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Dashboard
│   │   ├── portfolio/page.tsx
│   │   ├── transactions/page.tsx
│   │   └── settings/page.tsx
│   ├── components/
│   │   ├── dashboard/                  # 5 components
│   │   ├── portfolio/                  # 3 components
│   │   ├── transactions/               # 3 components
│   │   └── ui/                         # 4 custom components
│   └── styles/
│       └── design-tokens.css
├── docs/
│   ├── research-report.md
│   └── synthesis-brief.md
└── visual-baselines/
    ├── desktop-dashboard.png
    ├── tablet-dashboard.png
    ├── mobile-dashboard.png
    └── desktop-dashboard-dark.png
```

### Commands

```bash
cd ~/Desktop/fintrack
npm run dev      # Start development
npm run build    # Production build
npm run test     # Run tests
```

### Next Steps

1. Connect to real financial APIs
2. Add authentication (consider Clerk or Auth.js)
3. Implement real-time updates with WebSockets
4. Add data export functionality
5. Deploy to Vercel
