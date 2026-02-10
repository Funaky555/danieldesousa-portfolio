"use client";

import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { TacticalBoard } from "@/components/philosophy/tactical-board";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "@/components/providers/i18n-provider";
import {
  GraduationCap,
  Target,
  Brain,
  Flame,
  Heart,
  Users,
  Quote,
} from "lucide-react";

const pyramidWords = [
  { word: "Intelligence", icon: Brain, color: "football-green" },
  { word: "Intensity", icon: Flame, color: "ai-blue" },
  { word: "Intention", icon: Target, color: "tech-purple" },
] as const;

const pyramidColorMap = {
  "football-green": {
    bg: "bg-football-green/10",
    border: "border-football-green/30",
    text: "text-football-green",
    glow: "hover:shadow-[0_0_30px_rgba(0,214,108,0.3)]",
    iconBg: "bg-football-green/20",
  },
  "ai-blue": {
    bg: "bg-ai-blue/10",
    border: "border-ai-blue/30",
    text: "text-ai-blue",
    glow: "hover:shadow-[0_0_30px_rgba(0,102,255,0.3)]",
    iconBg: "bg-ai-blue/20",
  },
  "tech-purple": {
    bg: "bg-tech-purple/10",
    border: "border-tech-purple/30",
    text: "text-tech-purple",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    iconBg: "bg-tech-purple/20",
  },
} as const;

const philosophyTopics = [
  { key: "learningEnvironment", icon: GraduationCap, color: "football-green" },
  { key: "trainingMethodology", icon: Target, color: "ai-blue" },
  { key: "integratedTraining", icon: Brain, color: "tech-purple" },
  { key: "playingStyle", icon: Flame, color: "energy-orange" },
  { key: "thePlayerAsAPerson", icon: Heart, color: "tech-purple" },
  { key: "theTeam", icon: Users, color: "football-green" },
] as const;

const topicColorMap = {
  "football-green": {
    iconBg: "bg-football-green/20",
    iconText: "text-football-green",
    activeBg: "data-[state=active]:bg-football-green/20 data-[state=active]:border-football-green/50 data-[state=active]:text-football-green",
  },
  "ai-blue": {
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    activeBg: "data-[state=active]:bg-ai-blue/20 data-[state=active]:border-ai-blue/50 data-[state=active]:text-ai-blue",
  },
  "tech-purple": {
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    activeBg: "data-[state=active]:bg-tech-purple/20 data-[state=active]:border-tech-purple/50 data-[state=active]:text-tech-purple",
  },
  "energy-orange": {
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    activeBg: "data-[state=active]:bg-energy-orange/20 data-[state=active]:border-energy-orange/50 data-[state=active]:text-energy-orange",
  },
} as const;

export function PhilosophyContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === 1. HERO SECTION === */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
            {t("philosophy.title")}
          </h1>

          {/* 3 I's - Horizontal */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {pyramidWords.map(({ word, icon: Icon, color }) => {
              const colors = pyramidColorMap[color];
              return (
                <div
                  key={word}
                  className={`glass rounded-lg px-5 py-3 sm:px-8 sm:py-4 border ${colors.border} ${colors.bg} ${colors.glow} hover:scale-105 transition-all duration-300 cursor-default group`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text} group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`text-base sm:text-lg md:text-xl font-bold ${colors.text}`}>
                      {word}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* === 2. QUOTE SECTION === */}
          <section>
            <div className="glass rounded-lg p-8 md:p-10 border border-border/50 glow-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-football-green via-ai-blue to-tech-purple" />
              <div className="flex gap-4 pl-4">
                <Quote className="w-10 h-10 text-football-green/40 shrink-0 mt-1" />
                <div>
                  <blockquote className="text-lg md:text-xl text-foreground italic leading-relaxed">
                    &ldquo;{t("philosophy.coreClosing")}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm text-muted-foreground font-medium">
                    &mdash; Daniel de Sousa
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === 3. PHILOSOPHY TOPICS (TABS) === */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {t("philosophy.core")}
              </h2>
              <p className="text-muted-foreground">
                {t("philosophy.subtitle")}
              </p>
            </div>

            <Tabs defaultValue="learningEnvironment" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {philosophyTopics.map(({ key, icon: Icon, color }) => {
                  const colors = topicColorMap[color];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`glass flex items-center gap-2 px-4 py-2.5 border border-border/50 rounded-lg transition-all duration-300 text-muted-foreground hover:text-foreground hover:border-foreground/30 ${colors.activeBg}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {t(`philosophy.coreBeliefs.${key}.title`)}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {philosophyTopics.map(({ key, icon: Icon, color }) => {
                const colors = topicColorMap[color];
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="glass rounded-lg p-8 md:p-10 border border-border/50">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`shrink-0 w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${colors.iconText}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground pt-2">
                          {t(`philosophy.coreBeliefs.${key}.title`)}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t(`philosophy.coreBeliefs.${key}.text`)}
                      </p>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </section>

          <Separator />

          {/* === 5. TACTICAL SYSTEMS (existing) === */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("philosophy.formations")}
              </h2>
              <p className="text-muted-foreground">
                {t("philosophy.subtitle")}
              </p>
            </div>
            <TacticalBoard />
          </section>

          <Separator />

          {/* === 6. GAME MOMENTS (existing) === */}
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

          {/* === 7. TRAINING APPROACH === */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("philosophy.approach")}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto glass rounded-lg p-8 md:p-10 border border-border/50">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("philosophy.approachText")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
