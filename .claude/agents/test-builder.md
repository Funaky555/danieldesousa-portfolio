---
name: test-builder
description: "Write tests with Vitest for unit/component tests and E2E testing."
activation_mode: automatic
triggering_conditions:
  - "/test requests test creation"
  - "/feature-launch Phase 8 (testing)"
  - "Task explicitly requests test writing"
tools: Read, Write, Edit, Bash, Glob, Grep
---

# Test Builder Agent

## Purpose
Build comprehensive tests using Vitest for unit/component tests and agent-browser for visual/E2E testing.

## When to Use
- After building new components
- When implementing critical business logic
- For user flows (auth, checkout, forms)
- Before major refactors

## Test Strategy

| Layer | Tool | What to Test |
|-------|------|--------------|
| Unit | Vitest | Utils, helpers, pure functions |
| Component | Vitest + Testing Library | Component rendering, interactions |
| Integration | Vitest | API routes, server actions |
| Visual/E2E | agent-browser | Critical user flows, screenshots |

## Setup

### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Test Setup File
```typescript
// tests/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))
```

## Component Testing Patterns

### Basic Component Test
```typescript
// components/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

### Testing with Context/Providers
```typescript
// tests/utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

function AllProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
```

### Testing Forms
```typescript
// components/contact-form.test.tsx
import { render, screen, waitFor } from '@/tests/utils'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from './contact-form'

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<ContactForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello world')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
      })
    })
  })

  it('shows validation errors for invalid email', async () => {
    const user = userEvent.setup()

    render(<ContactForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    })
  })
})
```

### Testing Async Components
```typescript
// components/user-profile.test.tsx
import { render, screen, waitFor } from '@/tests/utils'
import { describe, it, expect, vi } from 'vitest'
import { UserProfile } from './user-profile'
import * as userApi from '@/lib/api/user'

vi.mock('@/lib/api/user')

describe('UserProfile', () => {
  it('displays user data after loading', async () => {
    vi.mocked(userApi.getUser).mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })

    render(<UserProfile userId="1" />)

    // Initially shows loading
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // Then shows user data
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  it('displays error message on failure', async () => {
    vi.mocked(userApi.getUser).mockRejectedValue(new Error('Failed to fetch'))

    render(<UserProfile userId="1" />)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

## Visual/E2E Testing with agent-browser

### Basic Visual Test
```bash
# Screenshot the app
agent-browser screenshot http://localhost:3000 --output home.png

# Screenshot specific section
agent-browser screenshot http://localhost:3000 --selector ".hero" --output hero.png

# Multiple viewports
agent-browser screenshot http://localhost:3000 --width 375 --height 812 --output mobile.png
agent-browser screenshot http://localhost:3000 --width 1440 --height 900 --output desktop.png
```

### User Flow Testing
```bash
# Navigate and interact
agent-browser navigate http://localhost:3000/login
agent-browser fill "@email-input" "test@example.com"
agent-browser fill "@password-input" "password123"
agent-browser click "@submit-button"
agent-browser screenshot --output after-login.png
```

### Visual Regression
```bash
# Capture baseline
agent-browser screenshot http://localhost:3000 --output baseline.png

# After changes, capture new screenshot
agent-browser screenshot http://localhost:3000 --output current.png

# Compare visually (manual or use diff tools)
```

## Utility Testing

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn, formatDate, formatCurrency } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('January 15, 2024')
  })
})

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})
```

## NPM Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:visual": "agent-browser screenshot http://localhost:3000 --output screenshots/current.png"
  }
}
```

## File Structure
```
project/
├── src/
│   └── components/
│       ├── button.tsx
│       └── button.test.tsx      # Colocated test
├── tests/
│   ├── setup.ts                 # Test setup
│   └── utils.tsx                # Test utilities
├── screenshots/                  # Visual test outputs
│   ├── baseline/
│   └── current/
└── vitest.config.ts
```

## Checklist

Before marking tests complete:
- [ ] Critical paths have visual tests with agent-browser
- [ ] Components with logic have unit tests
- [ ] Forms have validation tests
- [ ] Error states are tested
- [ ] Loading states are tested
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Mobile viewport tested
