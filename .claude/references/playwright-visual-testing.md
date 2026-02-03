# Playwright Visual Testing Reference

## Purpose
Lock in unique designs with visual regression testing. Prevent design drift and ensure synthesized patterns remain consistent.

## Setup

### Installation
```bash
npm install -D @playwright/test
npx playwright install chromium
```

### Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    // Desktop viewports
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Mobile viewports
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // Tablet
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro 11'] },
    },
  ],

  // Start dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Visual Regression Tests

### Basic Screenshot Comparison
```typescript
// e2e/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Regression', () => {
  test('full page screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
    });
  });

  test('above the fold', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-atf.png');
  });
});
```

### Component-Level Screenshots
```typescript
// e2e/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Component Visual Regression', () => {
  test('hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toHaveScreenshot('hero.png');
  });

  test('pricing cards', async ({ page }) => {
    await page.goto('/pricing');
    const pricing = page.locator('[data-testid="pricing-section"]');
    await expect(pricing).toHaveScreenshot('pricing-cards.png');
  });

  test('navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation.png');
  });

  test('footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png');
  });
});
```

### Dark Mode Testing
```typescript
// e2e/visual/dark-mode.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dark Mode Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Enable dark mode via class
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
  });

  test('homepage dark mode', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
    });
  });

  test('toggle transition', async ({ page }) => {
    // Remove dark mode to test toggle
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    // Click theme toggle
    await page.click('[data-testid="theme-toggle"]');

    // Wait for transition
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('after-dark-toggle.png');
  });
});
```

### Responsive Screenshots
```typescript
// e2e/visual/responsive.spec.ts
import { test, expect } from '@playwright/test';

const viewports = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
};

for (const [name, size] of Object.entries(viewports)) {
  test.describe(`Responsive: ${name}`, () => {
    test.use({ viewport: size });

    test('homepage', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveScreenshot(`homepage-${name}.png`, {
        fullPage: true,
      });
    });

    test('navigation behavior', async ({ page }) => {
      await page.goto('/');

      if (name === 'mobile' || name === 'tablet') {
        // Open mobile menu
        await page.click('[data-testid="mobile-menu-button"]');
        await page.waitForTimeout(300);
      }

      await expect(page).toHaveScreenshot(`nav-${name}.png`);
    });
  });
}
```

### Interaction State Screenshots
```typescript
// e2e/visual/interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Interaction States', () => {
  test('button hover state', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('[data-testid="cta-button"]');

    // Baseline
    await expect(button).toHaveScreenshot('button-default.png');

    // Hover
    await button.hover();
    await expect(button).toHaveScreenshot('button-hover.png');
  });

  test('input focus state', async ({ page }) => {
    await page.goto('/contact');
    const input = page.locator('input[name="email"]');

    // Baseline
    await expect(input).toHaveScreenshot('input-default.png');

    // Focus
    await input.focus();
    await expect(input).toHaveScreenshot('input-focus.png');
  });

  test('card hover state', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('[data-testid="feature-card"]').first();

    await expect(card).toHaveScreenshot('card-default.png');

    await card.hover();
    await page.waitForTimeout(300); // Wait for animation
    await expect(card).toHaveScreenshot('card-hover.png');
  });
});
```

### Animation Freeze for Screenshots
```typescript
// e2e/visual/with-animations.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Animation-Heavy Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  test('hero without animations', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('hero-static.png');
  });
});
```

## Commands

```bash
# Run all visual tests
npx playwright test e2e/visual

# Update snapshots (after intentional design changes)
npx playwright test e2e/visual --update-snapshots

# Run specific test file
npx playwright test e2e/visual/homepage.spec.ts

# Run in headed mode (see browser)
npx playwright test e2e/visual --headed

# Generate HTML report
npx playwright test e2e/visual --reporter=html
npx playwright show-report
```

## CI Integration

### GitHub Actions
```yaml
# .github/workflows/visual-tests.yml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run visual tests
        run: npx playwright test e2e/visual

      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

## Snapshot Management

### Directory Structure
```
e2e/
├── visual/
│   ├── homepage.spec.ts
│   ├── components.spec.ts
│   └── responsive.spec.ts
└── visual.spec.ts-snapshots/
    ├── homepage-full-Desktop-Chrome.png
    ├── homepage-full-Mobile-Safari.png
    ├── hero-Desktop-Chrome.png
    └── ...
```

### Threshold Configuration
```typescript
// For pixel-perfect matching
await expect(page).toHaveScreenshot('exact.png', {
  maxDiffPixels: 0,
});

// Allow small differences (anti-aliasing, fonts)
await expect(page).toHaveScreenshot('tolerant.png', {
  maxDiffPixelRatio: 0.01, // 1% difference allowed
});

// Ignore specific regions (dynamic content)
await expect(page).toHaveScreenshot('masked.png', {
  mask: [page.locator('[data-testid="timestamp"]')],
});
```

## Integration with Research Clone

After synthesizing a design:
1. Generate components with frontend-design
2. Create visual baselines with Playwright
3. Commit snapshots to version control
4. Any future changes will be caught by visual regression

```bash
# After generating new design
npm run dev &
npx playwright test e2e/visual --update-snapshots
git add e2e/*.spec.ts-snapshots/
git commit -m "feat: lock in synthesized design baselines"
```
