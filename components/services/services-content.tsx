"use client";

import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/coaching-data";
import Link from "next/link";
import { MessageCircle, Trophy, Code2 } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const footballServiceIds = ["game-analysis", "scouting", "leadership", "training", "seminars"];
const techServiceIds = ["websites", "business-tech"];

const footballServices = services.filter((s) => footballServiceIds.includes(s.id));
const techServices = services.filter((s) => techServiceIds.includes(s.id));

export function ServicesContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("services.title")}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          {/* ── Separador Football Coaching ── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-[#00D66C]/50 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D66C]/30 bg-[#00D66C]/10">
              <Trophy className="w-4 h-4 text-[#00D66C]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#00D66C]">
                Football Coaching
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-[#00D66C]/50 to-transparent" />
          </div>

          {/* Football — linha 1: 3 cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {footballServices.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Football — linha 2: 2 cards centrados */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto mt-8">
            {footballServices.slice(3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* ── Separador Digital & Tech ── */}
          <div className="flex items-center gap-4 mb-10 mt-16">
            <div className="h-px flex-1 bg-gradient-to-r from-[#8B5CF6]/50 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10">
              <Code2 className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
                Digital & Tech
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-[#8B5CF6]/50 to-transparent" />
          </div>

          {/* Tech — 2 cards lado a lado, mais largos */}
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {techServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Pricing / CTA */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/5 pointer-events-none" />
            <div className="relative bg-background/80 backdrop-blur-sm px-8 py-10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t("services.cta")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("services.pricing")}
                  </p>
                </div>
                <div className="shrink-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 px-8 font-semibold rounded-xl shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:scale-[1.02]"
                  >
                    <Link href="/contact">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t("home.hero.cta.contact")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
