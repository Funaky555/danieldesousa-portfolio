"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { coachInfo } from "@/lib/coaching-data";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useTranslations } from "@/components/providers/i18n-provider";

const navigationKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "philosophy", href: "/philosophy" },
  { key: "experience", href: "/experience" },
  { key: "services", href: "/services" },
  { key: "software", href: "/software" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — replace with signature image: <img src="/images/signature.png" alt="Daniel de Sousa" className="h-10" /> */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-football flex items-center justify-center">
              <span className="text-white font-bold text-lg">DS</span>
            </div>
            <span className="font-bold text-lg text-foreground">
              {coachInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild variant="default" className="ml-2">
              <Link href="/contact">{t("home.hero.cta.contact")}</Link>
            </Button>
          </div>

          {/* Mobile menu button + theme/language toggle */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-md text-foreground hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navigationKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Button asChild variant="default" className="w-full mt-4">
              <Link href="/contact">{t("home.hero.cta.contact")}</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
