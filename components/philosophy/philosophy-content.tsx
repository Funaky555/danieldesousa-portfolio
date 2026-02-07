"use client";

import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { FormationPreview } from "@/components/philosophy/formation-preview";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";

export function PhilosophyContent() {
  const t = useTranslations();
  const tList = useTranslationList();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("philosophy.title")}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            {tList("philosophy.keyPrinciplesList").map((principle) => (
              <Badge key={principle} variant="default" className="text-base px-4 py-1">
                {principle}
              </Badge>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Core Philosophy */}
          <section>
            <div className="glass rounded-lg p-8 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t("philosophy.core")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                {t("philosophy.coreText")}
              </p>
            </div>
          </section>

          {/* Tactical Systems */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("philosophy.formations")}
              </h2>
              <p className="text-muted-foreground">
                {t("philosophy.subtitle")}
              </p>
            </div>
            <FormationPreview />
          </section>

          <Separator />

          {/* Game Moments */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("philosophy.gameMoments")}
              </h2>
              <p className="text-muted-foreground">
                {t("philosophy.subtitle")}
              </p>
            </div>
            <GameMomentsSection />
          </section>

          <Separator />

          {/* Coaching Approach */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("philosophy.approach")}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="glass rounded-lg p-8 border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-4">{t("philosophy.approach")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("philosophy.approachText")}
                </p>
              </div>
              <div className="glass rounded-lg p-8 border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {t("philosophy.roles")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("philosophy.rolesText")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
