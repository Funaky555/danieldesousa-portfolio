"use client";

import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { TacticalBoard } from "@/components/philosophy/tactical-board";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";
import {
  GraduationCap,
  Target,
  Brain,
  Flame,
  Heart,
  Users,
  Quote,
  Zap,
  Focus,
  Gamepad2,
  BarChart3,
  Settings2,
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
  { key: "learningEnvironment", icon: GraduationCap, color: "toasted-yellow" },
  { key: "trainingMethodology", icon: Target, color: "ai-blue" },
  { key: "integratedTraining", icon: Brain, color: "tech-purple" },
  { key: "playingStyle", icon: Flame, color: "energy-red" },
  { key: "thePlayerAsAPerson", icon: Heart, color: "energy-orange" },
  { key: "theTeam", icon: Users, color: "football-green" },
] as const;

const topicColorMap = {
  "football-green": {
    iconBg: "bg-football-green/20",
    iconText: "text-football-green",
    inactiveText: "text-football-green/60",
    inactiveBorder: "border-football-green/20",
    inactiveBg: "bg-football-green/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,214,108,0.1)]",
    activeBg: "data-[state=active]:bg-football-green/20 data-[state=active]:border-football-green/50 data-[state=active]:text-football-green data-[state=active]:shadow-[0_0_30px_rgba(0,214,108,0.2)]",
  },
  "ai-blue": {
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    inactiveText: "text-ai-blue/60",
    inactiveBorder: "border-ai-blue/20",
    inactiveBg: "bg-ai-blue/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,102,255,0.1)]",
    activeBg: "data-[state=active]:bg-ai-blue/20 data-[state=active]:border-ai-blue/50 data-[state=active]:text-ai-blue data-[state=active]:shadow-[0_0_30px_rgba(0,102,255,0.2)]",
  },
  "tech-purple": {
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    inactiveText: "text-tech-purple/60",
    inactiveBorder: "border-tech-purple/20",
    inactiveBg: "bg-tech-purple/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    activeBg: "data-[state=active]:bg-tech-purple/20 data-[state=active]:border-tech-purple/50 data-[state=active]:text-tech-purple data-[state=active]:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
  },
  "energy-orange": {
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    inactiveText: "text-energy-orange/60",
    inactiveBorder: "border-energy-orange/20",
    inactiveBg: "bg-energy-orange/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]",
    activeBg: "data-[state=active]:bg-energy-orange/20 data-[state=active]:border-energy-orange/50 data-[state=active]:text-energy-orange data-[state=active]:shadow-[0_0_30px_rgba(255,107,53,0.2)]",
  },
  "toasted-yellow": {
    iconBg: "bg-toasted-yellow/20",
    iconText: "text-toasted-yellow",
    inactiveText: "text-toasted-yellow/60",
    inactiveBorder: "border-toasted-yellow/20",
    inactiveBg: "bg-toasted-yellow/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(204,138,0,0.1)]",
    activeBg: "data-[state=active]:bg-toasted-yellow/20 data-[state=active]:border-toasted-yellow/50 data-[state=active]:text-toasted-yellow data-[state=active]:shadow-[0_0_30px_rgba(204,138,0,0.2)]",
  },
  "energy-red": {
    iconBg: "bg-energy-red/20",
    iconText: "text-energy-red",
    inactiveText: "text-energy-red/60",
    inactiveBorder: "border-energy-red/20",
    inactiveBg: "bg-energy-red/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    activeBg: "data-[state=active]:bg-energy-red/20 data-[state=active]:border-energy-red/50 data-[state=active]:text-energy-red data-[state=active]:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
  },
} as const;

const approachIcons = [Zap, Focus, Gamepad2, BarChart3, Settings2];
const approachColors = ["toasted-yellow", "ai-blue", "tech-purple", "energy-red", "energy-orange"] as const;

const approachColorMap = {
  "football-green": { dot: "bg-football-green", text: "text-football-green", bg: "bg-football-green/10", border: "border-football-green/20" },
  "ai-blue": { dot: "bg-ai-blue", text: "text-ai-blue", bg: "bg-ai-blue/10", border: "border-ai-blue/20" },
  "tech-purple": { dot: "bg-tech-purple", text: "text-tech-purple", bg: "bg-tech-purple/10", border: "border-tech-purple/20" },
  "energy-orange": { dot: "bg-energy-orange", text: "text-energy-orange", bg: "bg-energy-orange/10", border: "border-energy-orange/20" },
  "toasted-yellow": { dot: "bg-toasted-yellow", text: "text-toasted-yellow", bg: "bg-toasted-yellow/10", border: "border-toasted-yellow/20" },
  "energy-red": { dot: "bg-energy-red", text: "text-energy-red", bg: "bg-energy-red/10", border: "border-energy-red/20" },
} as const;

export function PhilosophyContent() {
  const t = useTranslations();
  const tList = useTranslationList();

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
                      className={`glass flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-all duration-300 ${colors.inactiveBorder} ${colors.inactiveBg} ${colors.inactiveText} ${colors.hoverGlow} hover:border-opacity-50 ${colors.activeBg}`}
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
            <div className="max-w-4xl mx-auto glass rounded-xl p-8 md:p-10 border border-border/50">
              <div className="grid gap-4">
                {tList("philosophy.approachPoints").map((point, idx) => {
                  const Icon = approachIcons[idx] || Zap;
                  const color = approachColors[idx] || "toasted-yellow";
                  const ac = approachColorMap[color];
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-lg border ${ac.border} ${ac.bg} transition-all duration-300 hover:scale-[1.01]`}
                    >
                      <div className={`shrink-0 w-9 h-9 rounded-lg ${ac.bg} flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${ac.text}`} />
                      </div>
                      <p className="text-sm md:text-base text-foreground/85 leading-relaxed pt-1.5">
                        {point}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
