# How to Add Multiple Languages to the Portfolio

This project is currently configured for **English only**, but the i18n infrastructure is ready for you to add more languages whenever needed.

## Quick Start: Adding a New Language (e.g., Portuguese)

### Step 1: Create Translation File

1. Copy the English translations file:
   ```bash
   cp messages/en.json messages/pt.json
   ```

2. Translate all the content in `messages/pt.json` to Portuguese

### Step 2: Update i18n Configuration

Edit `lib/i18n.ts`:

```typescript
// Before:
export const locales = ["en"] as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
};

// After:
export const locales = ["en", "pt"] as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  pt: "🇵🇹",
};
```

### Step 3: Import Translation in Provider

Edit `components/providers/i18n-provider.tsx`:

```typescript
// Before:
import en from "@/messages/en.json";

const messages: Record<Locale, Record<string, unknown>> = {
  en,
};

// After:
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

const messages: Record<Locale, Record<string, unknown>> = {
  en,
  pt,
};
```

### Step 4: Add Language Switcher Component

Create `components/layout/language-switcher.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/i18n-provider";
import { Locale, localeNames, localeFlags } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{localeFlags[locale]}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-md border border-border bg-popover p-1 shadow-md">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc as Locale);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent ${
                  locale === loc
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground"
                }`}
              >
                <span>{localeFlags[loc as Locale]}</span>
                <span>{localeNames[loc as Locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

### Step 5: Add Language Switcher to Header

Edit `components/layout/header.tsx`:

Add the import:
```typescript
import { LanguageSwitcher } from "@/components/layout/language-switcher";
```

Add the component in the desktop navigation (around line 51):
```tsx
<LanguageSwitcher />
<ThemeToggle />
```

Add the component in mobile navigation (around line 60):
```tsx
<LanguageSwitcher />
<ThemeToggle />
```

## Translation File Structure

The `messages/en.json` file is organized by page/section:

```json
{
  "nav": { ... },           // Navigation menu
  "home": { ... },          // Home page
  "about": { ... },         // About page
  "philosophy": { ... },    // Philosophy page
  "experience": { ... },    // Experience page
  "services": { ... },      // Services page
  "software": { ... },      // Software page
  "contact": { ... },       // Contact page
  "footer": { ... },        // Footer
  "common": { ... }         // Common/shared text
}
```

## Usage in Components

The i18n system provides several hooks:

```tsx
import { useTranslations, useTranslationList, useLocale } from "@/components/providers/i18n-provider";

// Get single translation
const t = useTranslations();
const title = t("home.hero.title"); // "Daniel de Sousa"

// Get list/array translations
const tList = useTranslationList();
const principles = tList("philosophy.keyPrinciplesList"); // ["Intelligence", "Intensity", "Intention"]

// Get/set current locale
const { locale, setLocale, locales } = useLocale();
```

## Best Practices

1. **Keep keys in English**: Use English for JSON keys (e.g., `"title"`, `"description"`)
2. **Organize by page**: Group translations by page/section for maintainability
3. **Use nested structure**: Use dot notation for hierarchy (e.g., `"home.hero.title"`)
4. **Consistent terminology**: Keep technical terms and names consistent across languages
5. **Test all languages**: Switch between languages to ensure all translations work
6. **SEO considerations**: Update meta tags for each language if needed

## Example: Adding Spanish

1. Create `messages/es.json` (copy from `en.json` and translate)
2. Update `lib/i18n.ts`:
   ```typescript
   export const locales = ["en", "pt", "es"] as const;
   export const localeNames = { en: "English", pt: "Português", es: "Español" };
   export const localeFlags = { en: "🇺🇸", pt: "🇵🇹", es: "🇪🇸" };
   ```
3. Import in `i18n-provider.tsx`:
   ```typescript
   import es from "@/messages/es.json";
   const messages = { en, pt, es };
   ```
4. Rebuild the language switcher component (Step 4 above)
5. Add to header (Step 5 above)

## Troubleshooting

- **Missing translation**: The system falls back to English if a key is missing
- **TypeScript errors**: Make sure the locale type is updated in `lib/i18n.ts`
- **Language not persisting**: Check that localStorage is working in the browser
- **Hydration mismatch**: The provider prevents this by rendering default locale on server

## Current Status

- ✅ i18n infrastructure is ready
- ✅ English translations are complete
- ⏸️ Multi-language support is disabled (English only)
- 📝 Follow this guide when you want to add more languages
