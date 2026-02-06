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
          <div className="glass rounded-lg p-8 text-center border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("services.cta")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("services.pricing")}
            </p>
            <Button asChild size="lg" className="glow-border">
              <Link href="/contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("home.hero.cta.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
