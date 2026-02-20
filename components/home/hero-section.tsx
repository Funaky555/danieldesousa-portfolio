"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { coachInfo, heroBadges } from "@/lib/coaching-data";
import { useTranslations } from "@/components/providers/i18n-provider";

export function HeroSection() {
  const t = useTranslations();
  return (
    <section className="relative h-screen max-h-[900px] flex flex-col overflow-hidden">
      {/* ── Layer 1: AI-Generated Hero Image (Full Background) ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/daniel-ai.png"
          alt="Daniel de Sousa - Football Coach with tactical board in stadium"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Subtle AI gradient overlay for futuristic feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/10 via-transparent to-tech-purple/10" />
      </div>

      {/* ── Layer 3: AI Glow Orbs ── */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ai-blue/15 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-football-green/20 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-tech-purple/10 blur-3xl" />

      {/* ── Layer 4: Gradient overlays for text legibility ── */}
      {/* Mobile: gradient bottom-to-top so photo is visible at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/75 to-transparent md:hidden" />
      {/* Desktop: gradient left-to-right so photo shows on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:w-2/3 hidden md:block" />

      {/* ── Layer 5: Text content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end md:justify-center items-center text-center md:items-start md:text-left lg:w-1/2 px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        {/* Certifications badges with logos */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          {heroBadges.certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-600/15 dark:bg-football-green/15 border border-emerald-600/30 dark:border-football-green/30 backdrop-blur-sm"
            >
              <Image
                src={cert.logo}
                alt={cert.name}
                width={24}
                height={24}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-emerald-700 dark:text-football-green text-xs font-bold tracking-wide">
                  {cert.name}
                </span>
                {cert.validity && (
                  <span className="text-emerald-600/70 dark:text-football-green/70 text-[10px]">
                    {cert.validity}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-4">
          {coachInfo.name}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          {t("home.hero.subtitle")}
        </p>

        {/* Age groups row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          {heroBadges.ageGroups.map((group) => (
            <span
              key={group}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/80 backdrop-blur-sm border border-border/50 text-foreground"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Roles row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {["scouting", "analyst", "peTeacher"].map((roleKey) => (
            <span
              key={roleKey}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/10 dark:bg-football-green/10 backdrop-blur-sm border border-emerald-600/30 dark:border-football-green/30 text-emerald-700 dark:text-football-green"
            >
              {t(`home.hero.roles.${roleKey}`)}
            </span>
          ))}
        </div>

        {/* Location / experience tags */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600/10 dark:bg-ai-blue/10 border border-blue-600/30 dark:border-ai-blue/30 text-blue-700 dark:text-ai-blue backdrop-blur-sm">
            Portugal
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600/10 dark:bg-ai-blue/10 border border-blue-600/30 dark:border-ai-blue/30 text-blue-700 dark:text-ai-blue backdrop-blur-sm">
            China
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-600/10 dark:bg-tech-purple/10 border border-purple-600/30 dark:border-tech-purple/30 text-purple-700 dark:text-tech-purple backdrop-blur-sm">
            10+ Years
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
          <Button asChild size="lg" className="glow-border">
            <Link href="/services">
              {t("home.hero.cta.services")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="backdrop-blur-sm">
            <Link href="/contact">
              {t("home.hero.cta.contact")}
              <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Bottom stats strip (full width) ── */}
      <div className="relative z-10 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="text-center py-5 glass border-t border-border/50 hover:border-primary/50 transition-all border-r border-border/50">
            <div className="text-2xl font-bold text-foreground">10+</div>
            <div className="text-xs text-muted-foreground">{t("home.stats.experience")}</div>
          </div>
          <div className="text-center py-5 glass border-t border-border/50 hover:border-primary/50 transition-all border-r border-border/50">
            <div className="text-2xl font-bold text-foreground">Portugal & China</div>
            <div className="text-xs text-muted-foreground">{t("home.stats.countries")}</div>
          </div>
          <div className="text-center py-5 glass border-t border-border/50 hover:border-primary/50 transition-all border-r border-border/50">
            <div className="text-2xl font-bold text-foreground">U4 to U18</div>
            <div className="text-xs text-muted-foreground">{t("home.stats.ageGroups")}</div>
          </div>
          <div className="text-center py-5 glass border-t border-border/50 hover:border-primary/50 transition-all">
            <div className="text-2xl font-bold text-foreground">UEFA B</div>
            <div className="text-xs text-muted-foreground">{t("home.stats.certification")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
