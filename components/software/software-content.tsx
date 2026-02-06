"use client";

import { ToolCard } from "@/components/software/tool-card";
import { softwareTools } from "@/lib/coaching-data";
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

// Map category names to translation keys
const categoryKeyMap: Record<string, string> = {
  "Video & Match Analysis": "videoAnalysis",
  "AI & Productivity": "aiProductivity",
  "Tactical & Scouting": "tacticalScouting",
  "Office & Communication": "officeCommunication",
};

export function SoftwareContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("software.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("software.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Tool Categories */}
          {softwareTools.map((category) => {
            const categoryKey = categoryKeyMap[category.category] || "videoAnalysis";
            return (
              <section key={category.category}>
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  {t(`software.categories.${categoryKey}`)}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* How I Use AI Section */}
          <section>
            <Card className="border-border/50 glass">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-ai-blue/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600 dark:text-ai-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("software.howIUseAI")}
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("software.aiUseCases.trainingPlan.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("software.aiUseCases.trainingPlan.description")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("software.aiUseCases.reports.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("software.aiUseCases.reports.description")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("software.aiUseCases.tactical.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("software.aiUseCases.tactical.description")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("software.aiUseCases.translation.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("software.aiUseCases.translation.description")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
