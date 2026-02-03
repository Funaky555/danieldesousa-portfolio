"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current locale from pathname
  const currentLocale = languages.find((l) => pathname.startsWith(`/${l.code}`))?.code ?? "en";
  const current = languages.find((l) => l.code === currentLocale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLanguage = (code: string) => {
    // Replace current locale prefix or add new one
    const locales = languages.map((l) => l.code);
    let newPath = pathname;
    const matched = locales.find((l) => pathname.startsWith(`/${l}`));
    if (matched) {
      newPath = pathname.replace(`/${matched}`, `/${code}`);
    } else {
      newPath = `/${code}${pathname}`;
    }
    setOpen(false);
    router.push(newPath);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Language switcher"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                lang.code === currentLocale
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
