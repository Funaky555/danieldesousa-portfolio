# Tech Stack Reference

## Core Framework

### Next.js 16+
- **App Router** - File-based routing in `/app`
- **Server Components** - Default rendering mode
- **Server Actions** - Form handling and mutations
- **Streaming** - Suspense-based progressive loading
- **Turbopack** - Default bundler (stable) with 5-10x faster refresh
- **React Compiler** - Built-in automatic memoization (stable)

### TypeScript
- **Strict mode** enabled
- **Path aliases** - `@/` for src root
- **Type-safe APIs** - Zod for validation

## Styling

### Tailwind CSS
- **Utility-first** CSS framework
- **JIT mode** - On-demand class generation
- **Dark mode** - `class` strategy

### shadcn/ui
- **Radix primitives** - Accessible components
- **Copy-paste model** - Components in your codebase
- **Customizable** - Modify as needed

### Class Utilities
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Dependencies

### Core
```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0"
}
```

### Styling
```json
{
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### UI Components
```json
{
  "@radix-ui/react-*": "^1.0.0",
  "lucide-react": "^0.300.0"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.49.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0"
}
```

### Data Fetching (Optional)
```json
{
  "swr": "^2.2.0",
  "@tanstack/react-query": "^5.0.0"
}
```

## Project Structure

```
/
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Marketing route group
│   │   ├── page.tsx          # Landing page
│   │   └── layout.tsx        # Marketing layout
│   ├── (dashboard)/          # Dashboard route group
│   │   ├── dashboard/
│   │   └── layout.tsx        # Dashboard layout
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── forms/                # Form components
│   └── [feature]/            # Feature components
├── lib/
│   ├── utils.ts              # Utility functions
│   └── [feature]/            # Feature utilities
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript types
├── public/                   # Static assets
└── .claude/                  # Claude configuration
```

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```
