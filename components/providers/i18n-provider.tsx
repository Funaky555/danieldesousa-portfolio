"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  Locale,
  locales,
  defaultLocale,
  getCurrentLocale,
  setStoredLocale,
} from "@/lib/i18n";

// Import all message files
// To add more languages:
// 1. Create a new JSON file in /messages (e.g., pt.json)
// 2. Import it here: import pt from "@/messages/pt.json";
// 3. Add it to the messages object below
import en from "@/messages/en.json";

const messages: Record<Locale, Record<string, unknown>> = {
  en,
  // pt,
  // es,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
  locales: readonly Locale[];
}

const I18nContext = createContext<I18nContextType | null>(null);

function navigateToKey(obj: unknown, keys: string[]): unknown {
  let value: unknown = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return value;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getCurrentLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value = navigateToKey(messages[locale], keys);

      if (value === undefined) {
        // Fallback to English
        value = navigateToKey(messages.en, keys);
      }

      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  const tList = useCallback(
    (key: string): string[] => {
      const keys = key.split(".");
      let value = navigateToKey(messages[locale], keys);

      if (value === undefined) {
        // Fallback to English
        value = navigateToKey(messages.en, keys);
      }

      if (Array.isArray(value)) {
        return value as string[];
      }

      return [];
    },
    [locale]
  );

  // Prevent hydration mismatch by rendering default locale on server
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{ locale: defaultLocale, setLocale, t, tList, locales }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tList, locales }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}

export function useTranslationList() {
  const { tList } = useI18n();
  return tList;
}

export function useLocale() {
  const { locale, setLocale, locales } = useI18n();
  return { locale, setLocale, locales };
}
