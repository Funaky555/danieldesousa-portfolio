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
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("services.title")}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Pricing / CTA */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/5 pointer-events-none" />
            <div className="relative bg-background/80 backdrop-blur-sm px-8 py-10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                {/* Texto esticado */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t("services.cta")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("services.pricing")}
                  </p>
                </div>

                {/* Botão */}
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
