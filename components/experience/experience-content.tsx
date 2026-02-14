"use client";

import { CareerTimeline } from "@/components/experience/career-timeline";
import { TrophyShowcase } from "@/components/experience/trophy-showcase";
import { InternationalShowcase } from "@/components/experience/international-showcase";
import { AcademiesShowcase } from "@/components/experience/academies-showcase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/providers/i18n-provider";

export function ExperienceContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("experience.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Highlights */}
        <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-3 mb-16">
          <TrophyShowcase />
          <InternationalShowcase />
          <AcademiesShowcase />
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("experience.timeline")}
            </h2>
            <p className="text-muted-foreground">
              {t("experience.timelineSubtitle")}
            </p>
          </div>
          <CareerTimeline />
        </div>

        {/* China Highlight */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="border-border/50 glass">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Badge variant="default" className="mr-3">{t("experience.china.badge")}</Badge>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("experience.china.title")}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("experience.china.description1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("experience.china.description2")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
