# Defer Third-Party Scripts

**Impact:** CRITICAL
**Category:** Bundle Optimization

## Problem

Third-party scripts block page load and hurt Core Web Vitals.

## Solution

Defer non-critical scripts, load analytics after interaction.

## Examples

### Bad - Blocking Script
```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <head>
        <script src="https://analytics.example.com/script.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
// Blocks page render
```

### Good - Next.js Script Component
```tsx
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://analytics.example.com/script.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
```

### Script Strategies

```tsx
// Load immediately but don't block
<Script src="..." strategy="beforeInteractive" />

// Load after page is interactive (default)
<Script src="..." strategy="afterInteractive" />

// Load during idle time
<Script src="..." strategy="lazyOnload" />

// Inline script with worker
<Script id="analytics" strategy="worker">
  {`console.log('runs in web worker')`}
</Script>
```

### Analytics - Load After Interaction
```tsx
'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export function Analytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Load after first user interaction
    const handleInteraction = () => {
      setShouldLoad(true)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }

    window.addEventListener('scroll', handleInteraction, { once: true })
    window.addEventListener('click', handleInteraction, { once: true })

    // Or load after delay
    const timer = setTimeout(() => setShouldLoad(true), 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <Script
      src="https://analytics.example.com/script.js"
      strategy="lazyOnload"
    />
  )
}
```

### Google Analytics Pattern
```tsx
import Script from 'next/script'

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
```

### Chat Widget Pattern
```tsx
'use client'

import { useState } from 'react'
import Script from 'next/script'

export function ChatWidget() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <button onClick={() => setLoaded(true)}>
        Need help? Chat with us
      </button>

      {loaded && (
        <Script
          src="https://chat-widget.example.com/widget.js"
          strategy="lazyOnload"
          onLoad={() => {
            // Initialize chat widget
            window.ChatWidget?.init({ key: '...' })
          }}
        />
      )}
    </>
  )
}
```

## Strategy Selection

| Script Type | Strategy |
|-------------|----------|
| Critical (auth, security) | `beforeInteractive` |
| Analytics, tracking | `lazyOnload` |
| Chat widgets | Load on interaction |
| Social embeds | `lazyOnload` |
| A/B testing | `afterInteractive` |

## Key Points

1. Use Next.js `<Script>` component, not `<script>`
2. Default to `lazyOnload` for non-critical scripts
3. Load analytics after user interaction when possible
4. Chat/support widgets should load on demand
5. Monitor impact with Core Web Vitals
