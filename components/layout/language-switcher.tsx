"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/components/providers/i18n-provider";
import {
  localeFlags,
  localeNames,
  localeCodes,
  localeColors,
  type Locale,
} from "@/lib/i18n";

const orderedLocales: Locale[] = ["pt", "en", "es", "fr", "ar", "zh"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const activeColor = localeColors[locale];

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-border/70"
        style={{
          color: open ? activeColor : undefined,
          boxShadow: open ? `0 0 8px ${activeColor}40` : undefined,
        }}
      >
        <span className="text-base leading-none">{localeFlags[locale]}</span>
        <span className="font-semibold tracking-wider text-xs">{localeCodes[locale]}</span>
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full right-0 mt-1.5 z-50 glass rounded-xl p-1 min-w-[168px] shadow-xl"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)" }}
        >
          {orderedLocales.map((loc) => {
            const color = localeColors[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 text-left"
                style={{
                  color: isActive ? color : undefined,
                  backgroundColor: isActive ? `${color}18` : undefined,
                  textShadow: isActive ? `0 0 8px ${color}80` : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = color;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${color}12`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "";
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
                  }
                }}
              >
                {/* Active indicator */}
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? color : "transparent",
                    boxShadow: isActive ? `0 0 6px ${color}` : "none",
                  }}
                />
                <span className="text-base leading-none flex-shrink-0">{localeFlags[loc]}</span>
                <span className="flex-1 font-medium">{localeNames[loc]}</span>
                <span
                  className="text-xs font-bold tracking-wider opacity-50"
                  style={{ opacity: isActive ? 0.8 : 0.4 }}
                >
                  {localeCodes[loc]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
