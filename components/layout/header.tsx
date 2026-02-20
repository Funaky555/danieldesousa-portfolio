"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { coachInfo } from "@/lib/coaching-data";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTranslations } from "@/components/providers/i18n-provider";

const navigationKeys = [
  { key: "home", href: "/", color: "#0066FF" },
  { key: "about", href: "/about", color: "#00D66C" },
  { key: "philosophy", href: "/philosophy", color: "#8B5CF6" },
  { key: "experience", href: "/experience", color: "#FF6B35" },
  { key: "services", href: "/services", color: "#14B8A6" },
  { key: "software", href: "/software", color: "#F43F5E" },
  { key: "contact", href: "/contact", color: "#EF4444" },
];

function NavLink({
  href,
  color,
  children,
  onClick,
  mobile,
}: {
  href: string;
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${mobile ? "block" : ""} px-3 py-2 rounded-md text-sm font-medium transition-all duration-150`}
      style={{
        color: hovered ? color : undefined,
        backgroundColor: hovered ? `${color}15` : undefined,
      }}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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
              <NavLink key={item.key} href={item.href} color={item.color}>
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <ThemeToggle />
            <Button
              asChild
              className="ml-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 px-4 font-semibold rounded-xl shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] hover:shadow-red-500/40"
            >
              <Link href="/contact">{t("home.hero.cta.contact")}</Link>
            </Button>
          </div>

          {/* Mobile menu button + theme toggle */}
          <div className="md:hidden flex items-center gap-1">
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
              <NavLink
                key={item.key}
                href={item.href}
                color={item.color}
                mobile
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-semibold rounded-xl"
            >
              <Link href="/contact">{t("home.hero.cta.contact")}</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
