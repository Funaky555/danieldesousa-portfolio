"use client";

import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/coaching-data";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

export function ServicesContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("services.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Pricing Note */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-border/50">
            {/* Borda gradiente de fundo */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00D66C]/20 via-[#0066FF]/20 to-[#8B5CF6]/20 opacity-60 pointer-events-none" />
            <div className="relative bg-background/80 backdrop-blur-sm px-8 py-12 text-center">
              {/* Ícone decorativo */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D66C]/20 to-[#0066FF]/20 flex items-center justify-center border border-[#00D66C]/30">
                <MessageCircle className="w-8 h-8 text-[#00D66C]" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {t("services.cta")}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {t("services.pricing")}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#00D66C] to-[#0066FF] hover:opacity-90 text-white border-0 px-8 font-semibold rounded-xl shadow-lg shadow-[#00D66C]/20 transition-all hover:shadow-[#00D66C]/40 hover:scale-[1.02]"
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
    </main>
  );
}
