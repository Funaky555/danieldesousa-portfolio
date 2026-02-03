# Hoist Regular Expressions

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Creating RegExp inside loops or functions recreates the object repeatedly.

## Solution

Define RegExp outside of functions/loops.

## Examples

### Bad - RegExp in Loop
```tsx
function validateEmails(emails: string[]) {
  return emails.every(email => {
    // Creates new RegExp on each iteration!
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  })
}
```

### Good - Hoisted RegExp
```tsx
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmails(emails: string[]) {
  return emails.every(email => EMAIL_REGEX.test(email))
}
```

### Bad - RegExp in Component
```tsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (value: string) => {
    // Creates new RegExp on every keystroke!
    const sanitized = value.replace(/[^a-zA-Z0-9\s]/g, '')
    setQuery(sanitized)
  }

  return <input value={query} onChange={e => handleChange(e.target.value)} />
}
```

### Good - Hoisted Outside Component
```tsx
const SANITIZE_REGEX = /[^a-zA-Z0-9\s]/g

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (value: string) => {
    const sanitized = value.replace(SANITIZE_REGEX, '')
    setQuery(sanitized)
  }

  return <input value={query} onChange={e => handleChange(e.target.value)} />
}
```

### Multiple Related Patterns
```tsx
// Group related patterns together
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]{10,}$/,
  url: /^https?:\/\/[^\s]+$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const

function validate(value: string, type: keyof typeof PATTERNS): boolean {
  return PATTERNS[type].test(value)
}
```

### Cached Dynamic Patterns
```tsx
const patternCache = new Map<string, RegExp>()

function getPattern(searchTerm: string): RegExp {
  if (!patternCache.has(searchTerm)) {
    // Escape special chars and create pattern
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    patternCache.set(searchTerm, new RegExp(escaped, 'gi'))
  }
  return patternCache.get(searchTerm)!
}

function highlightMatches(text: string, searchTerm: string): string {
  const pattern = getPattern(searchTerm)
  return text.replace(pattern, '<mark>$&</mark>')
}
```

### Global Flag Caveat
```tsx
// Warning: global flag has state!
const GLOBAL_REGEX = /test/g

// This has a gotcha:
GLOBAL_REGEX.test('test')  // true
GLOBAL_REGEX.test('test')  // false (lastIndex moved!)
GLOBAL_REGEX.test('test')  // true (reset)

// Solution 1: Don't use global for .test()
const TEST_REGEX = /test/  // No 'g'
TEST_REGEX.test('test')  // Always works correctly

// Solution 2: Reset lastIndex
GLOBAL_REGEX.lastIndex = 0
GLOBAL_REGEX.test('test')  // Works correctly now
```

### React useMemo for Dynamic Patterns
```tsx
'use client'

function Search({ searchTerm, items }) {
  // Memoize dynamic pattern
  const pattern = useMemo(() => {
    if (!searchTerm) return null
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(escaped, 'gi')
  }, [searchTerm])

  const filtered = useMemo(() => {
    if (!pattern) return items
    return items.filter(item => pattern.test(item.name))
  }, [items, pattern])

  return <List items={filtered} />
}
```

## Key Points

1. Define RegExp literals outside functions
2. Use constants for static patterns
3. Cache dynamic patterns in Map
4. Be careful with global flag and .test()
5. Use useMemo for React dynamic patterns
