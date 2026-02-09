"use client";

import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { FormationPreview } from "@/components/philosophy/formation-preview";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";
import {
  GraduationCap,
  Target,
  Brain,
  Flame,
  CheckCircle2,
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
  const tList = useTranslationList();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === 1. HERO SECTION WITH PYRAMID === */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-12">
            {t("philosophy.title")}
          </h1>

          {/* Pyramid Visual */}
          <div className="max-w-lg mx-auto relative">
            {/* Decorative SVG Triangle */}
            <svg
              className="absolute inset-0 w-full h-full -z-10 opacity-15"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="pyramidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D66C" />
                  <stop offset="50%" stopColor="#0066FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M 200 30 L 50 260 L 350 260 Z"
                stroke="url(#pyramidGradient)"
                strokeWidth="2"
                fill="none"
              />
              {/* Inner lines connecting to center */}
              <path
                d="M 200 30 L 200 180 M 50 260 L 200 180 M 350 260 L 200 180"
                stroke="url(#pyramidGradient)"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>

            {/* Row 1: Top of pyramid */}
            <div className="flex justify-center mb-6">
              <PyramidCard {...pyramidWords[0]} />
            </div>

            {/* Row 2: Bottom of pyramid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <PyramidCard {...pyramidWords[1]} />
              <PyramidCard {...pyramidWords[2]} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* === 2. QUOTE SECTION === */}
          <section>
            <div className="glass rounded-lg p-8 md:p-10 border border-border/50 glow-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-football-green via-ai-blue to-tech-purple" />
              <div className="flex gap-4 pl-4">
                <Quote className="w-10 h-10 text-football-green/40 shrink-0 mt-1" />
                <blockquote className="text-lg md:text-xl text-foreground italic leading-relaxed">
                  {t("philosophy.coreClosing")}
                </blockquote>
              </div>
            </div>
          </section>

          {/* === 3. CORE VALUES SECTION === */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {t("philosophy.coreValuesTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("philosophy.coreValuesIntro")}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {tList("philosophy.coreValuesList").map((value, idx) => (
                <div
                  key={idx}
                  className="glass rounded-lg p-5 md:p-6 border border-border/50 hover:border-football-green/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-football-green/20 flex items-center justify-center shrink-0 group-hover:bg-football-green/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-football-green" />
                    </div>
                    <p className="text-foreground leading-relaxed pt-1.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* === 4. PHILOSOPHY TOPICS (TABS) === */}
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
            <FormationPreview />
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

          {/* === 7. COACHING APPROACH (existing) === */}
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

function PyramidCard({
  word,
  icon: Icon,
  color,
}: {
  word: string;
  icon: React.ComponentType<{ className?: string }>;
  color: keyof typeof pyramidColorMap;
}) {
  const colors = pyramidColorMap[color];

  return (
    <div
      className={`glass rounded-xl p-5 md:p-7 border ${colors.border} ${colors.bg} ${colors.glow} hover:scale-105 transition-all duration-300 cursor-default group relative overflow-hidden`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <span className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.text}`}>
          {word}
        </span>
      </div>
    </div>
  );
}
