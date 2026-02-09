"use client";

import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { FormationPreview } from "@/components/philosophy/formation-preview";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";
import {
  GraduationCap,
  Target,
  Brain,
  Flame,
  CheckCircle2,
  Heart,
  BookOpen,
  Quote,
} from "lucide-react";

const beliefCards = [
  { key: "learningEnvironment", icon: GraduationCap, color: "football-green" },
  { key: "trainingMethodology", icon: Target, color: "ai-blue" },
  { key: "integratedTraining", icon: Brain, color: "tech-purple" },
  { key: "playingStyle", icon: Flame, color: "energy-orange" },
] as const;

const colorMap = {
  "football-green": {
    iconBg: "bg-football-green/20",
    iconText: "text-football-green",
    hoverBorder: "hover:border-football-green/50",
    topBorder: "border-t-football-green",
  },
  "ai-blue": {
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    hoverBorder: "hover:border-ai-blue/50",
    topBorder: "border-t-ai-blue",
  },
  "tech-purple": {
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    hoverBorder: "hover:border-tech-purple/50",
    topBorder: "border-t-tech-purple",
  },
  "energy-orange": {
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    hoverBorder: "hover:border-energy-orange/50",
    topBorder: "border-t-energy-orange",
  },
} as const;

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
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t("philosophy.core")}
            </h2>

            <div className="space-y-12">
              {/* A. Hero Intro */}
              <div className="glass rounded-lg p-8 md:p-10 border border-border/50 border-l-4 border-l-football-green">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  {t("philosophy.coreIntro")}
                </p>
              </div>

              {/* B. Beliefs Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {beliefCards.map(({ key, icon: Icon, color }) => {
                  const colors = colorMap[color];
                  return (
                    <div
                      key={key}
                      className={`glass rounded-lg p-6 md:p-8 border border-border/50 transition-colors duration-300 ${colors.hoverBorder}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${colors.iconText}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {t(`philosophy.coreBeliefs.${key}.title`)}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {t(`philosophy.coreBeliefs.${key}.text`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* C. Core Values Strip */}
              <div className="glass rounded-lg p-6 md:p-8 border border-border/50 text-center">
                <p className="text-lg text-foreground font-medium mb-6">
                  {t("philosophy.coreValuesIntro")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {tList("philosophy.coreValuesList").map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-2 glass rounded-full px-5 py-2.5 border border-football-green/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-football-green shrink-0" />
                      <span className="text-sm md:text-base text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* D. Personal & Professional */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass rounded-lg p-6 md:p-8 border border-border/50 border-t-4 border-t-tech-purple">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-tech-purple" />
                    <h3 className="text-lg font-bold text-foreground">
                      {t("philosophy.corePersonalTitle")}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("philosophy.corePersonal")}
                  </p>
                </div>
                <div className="glass rounded-lg p-6 md:p-8 border border-border/50 border-t-4 border-t-ai-blue">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-ai-blue" />
                    <h3 className="text-lg font-bold text-foreground">
                      {t("philosophy.coreProfessionalTitle")}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("philosophy.coreProfessional")}
                  </p>
                </div>
              </div>

              {/* E. Closing Quote */}
              <div className="glass rounded-lg p-8 md:p-10 border border-border/50 glow-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-football-green to-ai-blue" />
                <div className="flex gap-4 pl-4">
                  <Quote className="w-10 h-10 text-football-green/40 shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
                    {t("philosophy.coreClosing")}
                  </p>
                </div>
              </div>
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
