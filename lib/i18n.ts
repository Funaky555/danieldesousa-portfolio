// Supported locales
// To add more languages: add locale codes here (e.g., ["en", "pt", "es"])
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "en";

// Locale metadata for display
// To add more languages: add display names and flags here
export const localeNames: Record<Locale, string> = {
  en: "English",
  // pt: "Português",
  // es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  // pt: "🇵🇹",
  // es: "🇪🇸",
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
