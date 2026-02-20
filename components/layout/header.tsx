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
      className={`relative ${mobile ? "flex items-center" : ""} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group`}
      style={{
        color: hovered ? color : undefined,
        backgroundColor: hovered ? `${color}12` : undefined,
      }}
    >
      {children}
      {/* Underline indicator colorido */}
      {!mobile && (
        <span
          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-200 origin-left"
          style={{
            backgroundColor: color,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            opacity: hovered ? 1 : 0,
          }}
        />
      )}
      {/* Dot indicator para mobile */}
      {mobile && (
        <span
          className="ml-auto w-2 h-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: color,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0)",
          }}
        />
      )}
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      {/* Linha gradiente arco-íris no topo */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#0066FF] via-[#00D66C] via-[#8B5CF6] via-[#FF6B35] via-[#14B8A6] to-[#F43F5E]" />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo com glow */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className="w-9 h-9 rounded-full bg-gradient-football flex items-center justify-center transition-all duration-300"
              style={{
                boxShadow: "0 0 0 0 rgba(0, 214, 108, 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 16px 4px rgba(0, 214, 108, 0.4), 0 0 32px 8px rgba(0, 102, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0 rgba(0, 214, 108, 0)";
              }}
            >
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-bold text-base text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00D66C] group-hover:to-[#0066FF] transition-all duration-300">
              {coachInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5">
            {navigationKeys.map((item) => (
              <NavLink key={item.key} href={item.href} color={item.color}>
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <ThemeToggle />
            <Button
              asChild
              className="ml-2 relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 px-4 font-semibold rounded-xl shadow-md shadow-red-500/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-red-500/50 hover:shadow-lg"
            >
              <Link href="/contact">{t("home.hero.cta.contact")}</Link>
            </Button>
          </div>

          {/* Mobile menu button + theme toggle */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-0.5 border-t border-border/30 mt-1">
            {navigationKeys.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                color={item.color}
                mobile
                onClick={() => setMobileMenuOpen(false)}
              >
                <span
                  className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <div className="pt-2 pb-1">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-semibold rounded-xl shadow-md shadow-red-500/25"
              >
                <Link href="/contact">{t("home.hero.cta.contact")}</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
