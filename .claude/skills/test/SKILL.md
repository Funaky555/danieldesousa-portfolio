---
name: test
description: "Run test suite with coverage reporting. Supports watch mode and specific test targeting."
invocable_by: both
tools:
  - Bash
  - Read
---

# Test Skill

Run the test suite for the Next.js application.

## Trigger
`/test [options]`

## Description
This skill runs the test suite using Vitest, including:
- Unit tests
- Component tests
- Integration tests
- Coverage reporting

## Running Tests

### All Tests
```bash
npm test
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Specific File
```bash
npm test -- tests/components/Button.test.tsx
```

### Specific Pattern
```bash
npm test -- --grep "Button"
```

## Test Structure

```
tests/
├── setup.ts              # Global test setup
├── helpers/
│   ├── render.tsx        # Custom render with providers
│   └── fixtures.ts       # Test data
├── unit/
│   ├── utils/            # Utility tests
│   └── hooks/            # Hook tests
├── components/
│   ├── Button.test.tsx   # Component tests
│   └── Form.test.tsx
└── integration/
    ├── auth.test.tsx     # Auth flow tests
    └── api.test.ts       # API route tests
```

## Writing Tests

### Component Test Example
```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles click events", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Hook Test Example
```typescript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "@/hooks/use-counter";

describe("useCounter", () => {
  it("increments count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### Server Component Test Example
```typescript
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Page from "@/app/page";

// Mock fetch for server components
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn(),
  }),
}));

describe("Home Page", () => {
  it("renders welcome message", async () => {
    const { container } = render(await Page());
    expect(container).toHaveTextContent("Welcome");
  });
});
```

### API Route Test Example
```typescript
import { describe, it, expect } from "vitest";
import { GET, POST } from "@/app/api/users/route";
import { NextRequest } from "next/server";

describe("Users API", () => {
  it("GET returns users", async () => {
    const request = new NextRequest("http://localhost/api/users");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.users)).toBe(true);
  });

  it("POST creates user", async () => {
    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com" }),
    });
    const response = await POST(request);

    expect(response.status).toBe(201);
  });
});
```

## Test Helpers

### Custom Render with Providers
```typescript
// tests/helpers/render.tsx
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system">
      {ui}
    </ThemeProvider>
  );
}
```

### Mock Next.js Router
```typescript
// tests/helpers/router.ts
import { vi } from "vitest";

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
```

## Coverage Requirements

Minimum coverage thresholds:
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Coverage Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/types/**",
        "**/*.d.ts",
        "src/components/ui/**", // shadcn components
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80
      }
    }
  }
});
```

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run in watch mode |
| `npm run test:coverage` | Run with coverage |
| `npm run test:ui` | Open Vitest UI |

## Mocking Best Practices

### Mock External APIs
```typescript
vi.mock("@/lib/api", () => ({
  fetchUsers: vi.fn().mockResolvedValue([
    { id: "1", name: "John" }
  ]),
}));
```

### Mock Environment Variables
```typescript
vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:3000");
```

### Mock Server Actions
```typescript
vi.mock("@/app/actions", () => ({
  createUser: vi.fn().mockResolvedValue({ success: true }),
}));
```

## CI Integration

Tests should pass before:
- Merging pull requests
- Deploying to production

### GitHub Actions
```yaml
- name: Run Tests
  run: npm test -- --coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Troubleshooting

### Tests Timeout
- Increase timeout in vitest.config.ts
- Check for unresolved promises
- Mock async operations

### Component Not Found
- Check import paths
- Verify component exports
- Check for server/client mismatch

### Hydration Errors
- Use `suppressHydrationWarning` where needed
- Match server/client rendering
