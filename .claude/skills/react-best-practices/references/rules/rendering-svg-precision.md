# SVG Precision Optimization

**Impact:** MEDIUM
**Category:** Rendering Optimization

## Problem

SVG files with excessive decimal precision increase file size unnecessarily.

## Solution

Round SVG coordinates and simplify paths.

## Examples

### Bad - Excessive Precision
```tsx
<svg viewBox="0 0 100 100">
  <path d="M10.123456789 20.987654321 L50.111111111 60.222222222 L90.333333333 20.444444444" />
  <circle cx="50.123456789" cy="50.987654321" r="25.555555555" />
</svg>
```

### Good - Optimized Precision
```tsx
<svg viewBox="0 0 100 100">
  <path d="M10.12 20.99 L50.11 60.22 L90.33 20.44" />
  <circle cx="50.12" cy="50.99" r="25.56" />
</svg>
```

### Using SVGO
```bash
# Install SVGO
npm install -D svgo

# Optimize SVG
npx svgo icon.svg -o icon.optimized.svg

# With precision setting
npx svgo icon.svg -p 2 -o icon.optimized.svg
```

### SVGO Config
```js
// svgo.config.js
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Customize precision
          cleanupNumericValues: {
            floatPrecision: 2,
          },
          // Remove unnecessary attributes
          removeViewBox: false,
          // Keep accessibility
          removeTitle: false,
        },
      },
    },
  ],
}
```

### Next.js SVG Import
```tsx
// Using @svgr/webpack
// next.config.js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      cleanupNumericValues: {
                        floatPrecision: 2,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}
```

### Manual Optimization Tips

```tsx
// Remove unnecessary decimals
// Before
<rect x="10.00000" y="20.00000" width="100.00000" height="50.00000" />

// After
<rect x="10" y="20" width="100" height="50" />

// Simplify transforms
// Before
<g transform="translate(0.00000, 0.00000) scale(1.00000, 1.00000)">

// After
<g>  // Remove identity transforms

// Use simpler path commands
// Before (cubic bezier)
<path d="M10 10 C 20 20, 40 20, 50 10" />

// After (quadratic if possible)
<path d="M10 10 Q 30 20 50 10" />
```

### Icon Component with Optimized SVG
```tsx
// components/icons/check.tsx
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
// Note: Clean integers, no excessive precision
```

## Size Comparison

| Precision | Example Value | File Impact |
|-----------|--------------|-------------|
| 10 decimals | 50.1234567890 | +8 bytes/value |
| 2 decimals | 50.12 | Baseline |
| 0 decimals | 50 | -3 bytes/value |

For an SVG with 100 coordinate values, reducing from 10 to 2 decimals saves ~800 bytes.

## Key Points

1. Use 2 decimal places maximum for most SVGs
2. Use integers when possible (10, not 10.00)
3. Run SVGO on all SVG assets
4. Configure @svgr/webpack for automatic optimization
5. Remove identity transforms and unnecessary attributes
