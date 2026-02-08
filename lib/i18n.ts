// Supported locales
export const locales = ["en", "pt", "es", "fr", "zh"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "en";

// Locale metadata for display
export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  fr: "Français",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  pt: "🇵🇹",
  es: "🇪🇸",
  fr: "🇫🇷",
  zh: "🇨🇳",
};

// Get browser's preferred language
export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const browserLang = navigator.language.split("-")[0];
  return locales.includes(browserLang as Locale)
    ? (browserLang as Locale)
    : defaultLocale;
}

// Get stored locale from localStorage
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("locale");
  return stored && locales.includes(stored as Locale)
    ? (stored as Locale)
    : null;
}

// Store locale in localStorage
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("locale", locale);
}

// Get the current locale (stored > browser > default)
export function getCurrentLocale(): Locale {
  return getStoredLocale() || getBrowserLocale() || defaultLocale;
}
