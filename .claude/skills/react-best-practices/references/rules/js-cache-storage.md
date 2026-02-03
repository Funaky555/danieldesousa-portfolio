# Storage Caching

**Impact:** LOW-MEDIUM
**Category:** JavaScript Optimization

## Problem

Repeated localStorage/sessionStorage access is slower than memory.

## Solution

Cache storage values in memory, sync when needed.

## Examples

### Bad - Direct Storage Access
```tsx
'use client'

function Settings() {
  // Reads from localStorage on every render
  const theme = localStorage.getItem('theme')
  const fontSize = localStorage.getItem('fontSize')
  const language = localStorage.getItem('language')

  return <SettingsPanel theme={theme} fontSize={fontSize} language={language} />
}
```

### Good - React State Cache
```tsx
'use client'

function useStorageValue(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue
    return localStorage.getItem(key) ?? defaultValue
  })

  const setStoredValue = useCallback((newValue: string) => {
    setValue(newValue)
    localStorage.setItem(key, newValue)
  }, [key])

  return [value, setStoredValue] as const
}

function Settings() {
  const [theme, setTheme] = useStorageValue('theme', 'light')
  const [fontSize, setFontSize] = useStorageValue('fontSize', '16')

  return <SettingsPanel theme={theme} fontSize={fontSize} />
}
```

### Good - Module-Level Cache
```tsx
// lib/storage-cache.ts

const cache = new Map<string, string | null>()
let initialized = false

function initCache() {
  if (initialized || typeof window === 'undefined') return
  // Pre-load commonly used keys
  const keys = ['theme', 'fontSize', 'language', 'user']
  keys.forEach(key => {
    cache.set(key, localStorage.getItem(key))
  })
  initialized = true
}

export function getStorageValue(key: string): string | null {
  initCache()
  if (!cache.has(key)) {
    cache.set(key, localStorage.getItem(key))
  }
  return cache.get(key) ?? null
}

export function setStorageValue(key: string, value: string): void {
  cache.set(key, value)
  localStorage.setItem(key, value)
}

export function removeStorageValue(key: string): void {
  cache.delete(key)
  localStorage.removeItem(key)
}
```

### Sync with Storage Events
```tsx
'use client'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value
      localStorage.setItem(key, JSON.stringify(newValue))
      return newValue
    })
  }, [key])

  return [storedValue, setValue] as const
}
```

### Batch Storage Writes
```tsx
// Bad - multiple writes
function saveSettings(settings: Settings) {
  localStorage.setItem('theme', settings.theme)
  localStorage.setItem('fontSize', settings.fontSize)
  localStorage.setItem('language', settings.language)
  localStorage.setItem('notifications', JSON.stringify(settings.notifications))
}

// Good - single write
function saveSettings(settings: Settings) {
  localStorage.setItem('settings', JSON.stringify(settings))
}
```

### Debounced Storage Write
```tsx
'use client'

const debouncedSave = debounce((key: string, value: string) => {
  localStorage.setItem(key, value)
}, 500)

function Editor() {
  const [content, setContent] = useState(() =>
    localStorage.getItem('draft') ?? ''
  )

  const handleChange = (newContent: string) => {
    setContent(newContent)  // Immediate state update
    debouncedSave('draft', newContent)  // Debounced storage write
  }

  return <textarea value={content} onChange={e => handleChange(e.target.value)} />
}
```

## Storage Access Cost

| Operation | Relative Speed |
|-----------|---------------|
| Memory access | 1x (baseline) |
| localStorage read | ~10-100x slower |
| localStorage write | ~10-100x slower |
| IndexedDB | Async, varies |

## Key Points

1. localStorage is synchronous and blocks
2. Cache in React state or module variables
3. Initialize cache once, update on changes
4. Listen to storage events for cross-tab sync
5. Batch and debounce writes when possible
