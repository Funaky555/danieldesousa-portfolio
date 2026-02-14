"use client";

import { CareerTimeline } from "@/components/experience/career-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, Users, Medal, Award } from "lucide-react";
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
          {/* Championships Card */}
          <Card className="border-border/50 glass hover:border-yellow-500/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="font-bold text-foreground">{t("experience.highlights.championships")}</h3>
              </div>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {/* U15 Female Champion - Tongling */}
                <div className="flex items-start gap-2 p-2 rounded-md bg-yellow-500/5 border border-yellow-500/20">
                  <Medal className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-foreground">{t("experience.championships.u15FemaleChampion")}</div>
                    <div className="text-[10px] text-muted-foreground">2023 · Tongling, China</div>
                    <div className="text-[10px] text-muted-foreground/70">{t("experience.championships.u15FemaleChampionDesc")}</div>
                  </div>
                </div>
                {/* U15 Male Vice-Champion - Tongling */}
                <div className="flex items-start gap-2 p-2 rounded-md bg-slate-500/5 border border-slate-500/20">
                  <Award className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-foreground">{t("experience.championships.u15MaleViceChampion")}</div>
                    <div className="text-[10px] text-muted-foreground">2023, 2024 · Tongling, China</div>
                    <div className="text-[10px] text-muted-foreground/70">{t("experience.championships.u15MaleViceChampionDesc")}</div>
                  </div>
                </div>
                {/* U16 Male Champion - Porto */}
                <div className="flex items-start gap-2 p-2 rounded-md bg-yellow-500/5 border border-yellow-500/20">
                  <Medal className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-foreground">{t("experience.championships.u16MaleChampion")}</div>
                    <div className="text-[10px] text-muted-foreground">2013/2014 · Porto, Portugal</div>
                    <div className="text-[10px] text-muted-foreground/70">{t("experience.championships.u16MaleChampionDesc")}</div>
                  </div>
                </div>
                {/* U17 Vice-Champion - Porto */}
                <div className="flex items-start gap-2 p-2 rounded-md bg-slate-500/5 border border-slate-500/20">
                  <Award className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-foreground">{t("experience.championships.u17ViceChampion")}</div>
                    <div className="text-[10px] text-muted-foreground">2014/2015 · Porto, Portugal</div>
                    <div className="text-[10px] text-muted-foreground/70">{t("experience.championships.u17ViceChampionDesc")}</div>
                  </div>
                </div>
                {/* U18 Vice-Champion + Promotion - Porto */}
                <div className="flex items-start gap-2 p-2 rounded-md bg-slate-500/5 border border-slate-500/20">
                  <Award className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-foreground">{t("experience.championships.u18ViceChampion")}</div>
                    <div className="text-[10px] text-muted-foreground">2017/2018 · Porto, Portugal</div>
                    <div className="text-[10px] text-muted-foreground/70">{t("experience.championships.u18ViceChampionDesc")}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Card */}
          <Card className="border-border/50 glass hover:border-blue-500/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 dark:bg-ai-blue/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-ai-blue" />
                </div>
                <h3 className="font-bold text-foreground">{t("experience.highlights.international")}</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-3">
                <span className="text-3xl font-bold text-blue-600 dark:text-ai-blue">4+</span>
                <span className="text-sm text-muted-foreground">{t("experience.highlights.yearsInChina")}</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center mt-2">
                <Badge variant="outline" className="text-xs">Tongling</Badge>
                <Badge variant="outline" className="text-xs">Chizhou</Badge>
                <Badge variant="outline" className="text-xs">Dengfeng</Badge>
                <Badge variant="outline" className="text-xs">Dalian</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Elite Academies Card */}
          <Card className="border-border/50 glass hover:border-purple-500/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-purple-600/10 dark:bg-tech-purple/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-tech-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t("experience.highlights.eliteAcademies")}</h3>
                  <p className="text-[10px] text-muted-foreground">{t("experience.highlights.youthDevelopment")}</p>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 p-2 rounded-md bg-red-500/5 border border-red-500/20">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">B</div>
                  <span className="text-xs font-medium text-foreground">SL Benfica</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-emerald-500/5 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">T</div>
                  <span className="text-xs font-medium text-foreground">CD Trofense</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
