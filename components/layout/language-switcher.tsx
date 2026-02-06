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
