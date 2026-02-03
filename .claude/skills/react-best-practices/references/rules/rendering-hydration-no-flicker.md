# Prevent Hydration Flicker

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

Content changes between server render and client hydration causing visible flicker.

## Solution

Ensure server and client render identical initial content.

## Examples

### Bad - Different Server/Client Content
```tsx
function Greeting() {
  // Server: renders with server time
  // Client: renders with client time (different!)
  const time = new Date().toLocaleTimeString()

  return <p>Current time: {time}</p>
}
// FLICKER: Time changes on hydration
```

### Good - Defer Client-Only Content
```tsx
'use client'

function Greeting() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    // Only runs on client
    setTime(new Date().toLocaleTimeString())
  }, [])

  // Server and initial client render match (null)
  if (!time) return <p>Loading time...</p>

  return <p>Current time: {time}</p>
}
```

### Bad - Window Check Without Deferral
```tsx
function ResponsiveComponent() {
  // Server: window undefined
  // Client: window exists
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return isMobile ? <MobileView /> : <DesktopView />
}
// FLICKER: Different component on hydration
```

### Good - useEffect for Client Detection
```tsx
'use client'

function ResponsiveComponent() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Show default until mounted
  if (!mounted) {
    return <DesktopView />  // Default matches SSR
  }

  return isMobile ? <MobileView /> : <DesktopView />
}
```

### Theme Flicker Prevention
```tsx
// Bad - causes flash of wrong theme
function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'  // Server doesn't have localStorage
  )
  return <div className={theme}>...</div>
}

// Good - inline script in HTML head
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Using next-themes (Recommended)
```tsx
// Handles theme without flicker
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Suspense for Client Content
```tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const ClientOnlyTime = dynamic(() => import('./Time'), { ssr: false })

function Page() {
  return (
    <div>
      <h1>Welcome</h1>
      <Suspense fallback={<span>Loading...</span>}>
        <ClientOnlyTime />
      </Suspense>
    </div>
  )
}
```

### suppressHydrationWarning
```tsx
// Use sparingly for intentional mismatches
function Time() {
  return (
    <time suppressHydrationWarning>
      {new Date().toLocaleTimeString()}
    </time>
  )
}
```

## Common Causes of Hydration Mismatch

| Cause | Solution |
|-------|----------|
| Date/time rendering | useEffect + state |
| window/document access | useEffect + mounted state |
| localStorage/sessionStorage | useEffect or cookies |
| Random values | Server-provided seed |
| User preferences (theme) | next-themes or inline script |
| Device detection | CSS media queries or useEffect |

## Key Points

1. Server and client initial render must match
2. Use useEffect for client-only values
3. Show loading state until client values ready
4. Use next-themes for theme handling
5. `suppressHydrationWarning` for intentional mismatches only
