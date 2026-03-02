// Supported locales
// To add more languages: add locale codes here
export const locales = ["pt", "en", "es", "fr", "ar", "zh"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "pt";

// Locale metadata for display
export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  pt: "🇵🇹",
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  ar: "🇸🇦",
  zh: "🇨🇳",
};

export const localeCodes: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
  fr: "FR",
  ar: "AR",
  zh: "ZH",
};

// Vibrant color per locale (for hover/active states)
export const localeColors: Record<Locale, string> = {
  pt: "#00D66C",
  en: "#0066FF",
  es: "#FF6B35",
  fr: "#8B5CF6",
  ar: "#14B8A6",
  zh: "#F43F5E",
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
