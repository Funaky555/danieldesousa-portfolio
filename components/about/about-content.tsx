"use client";

import { EducationTimeline } from "@/components/about/timeline";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "@/components/providers/i18n-provider";

export function AboutContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("about.bio")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Education & Certifications */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("about.education.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("about.subtitle")}
              </p>
            </div>
            <EducationTimeline />
          </section>

          <Separator className="my-16" />

          {/* Skills & Languages */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("about.skills.title")} & {t("about.languages.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("about.subtitle")}
              </p>
            </div>
            <SkillsGrid />
          </section>
        </div>
      </div>
    </main>
  );
}
