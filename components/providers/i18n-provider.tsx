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
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import zh from "@/messages/zh.json";

const messages: Record<Locale, typeof en> = {
  en,
  pt,
  es,
  fr,
  zh,
};

type Messages = typeof en;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<Messages>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  locales: readonly Locale[];
}

const I18nContext = createContext<I18nContextType | null>(null);

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
      let value: unknown = messages[locale];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Fallback to English if key not found
          let fallback: unknown = messages.en;
          for (const fk of keys) {
            if (fallback && typeof fallback === "object" && fk in fallback) {
              fallback = (fallback as Record<string, unknown>)[fk];
            } else {
              return key; // Return key if not found in fallback either
            }
          }
          return typeof fallback === "string" ? fallback : key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  // Prevent hydration mismatch by rendering default locale on server
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{ locale: defaultLocale, setLocale, t, locales }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, locales }}>
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

export function useLocale() {
  const { locale, setLocale, locales } = useI18n();
  return { locale, setLocale, locales };
}
