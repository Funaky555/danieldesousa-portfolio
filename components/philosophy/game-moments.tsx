"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Swords,
  Shield,
  Zap,
  ShieldAlert,
  Flag,
  Sparkles,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";

interface GameMoment {
  key: string;
  icon: LucideIcon;
  color: "football-green" | "ai-blue" | "tech-purple" | "energy-orange" | "energy-red";
  badge: string;
}

const gameMoments: GameMoment[] = [
  { key: "offensiveOrg", icon: Swords, color: "football-green", badge: "WITH BALL" },
  { key: "defensiveOrg", icon: Shield, color: "ai-blue", badge: "WITHOUT BALL" },
  { key: "offensiveTrans", icon: Zap, color: "tech-purple", badge: "BALL WON" },
  { key: "defensiveTrans", icon: ShieldAlert, color: "energy-orange", badge: "BALL LOST" },
  { key: "setPieces", icon: Flag, color: "energy-red", badge: "DEAD BALL" },
  { key: "creativity", icon: Sparkles, color: "football-green", badge: "THE 6TH" },
];

const colorMap = {
  "football-green": {
    bg: "bg-football-green/10",
    border: "border-football-green/30",
    activeBorder: "border-football-green/70",
    text: "text-football-green",
    textInactive: "text-football-green/50",
    iconBg: "bg-football-green/20",
    glow: "shadow-[0_0_30px_rgba(0,214,108,0.15)]",
    activeGlow: "shadow-[0_0_50px_rgba(0,214,108,0.3)]",
    dot: "bg-football-green",
    badgeBg: "bg-football-green/15 text-football-green border-football-green/30",
    badgeBgInactive: "text-football-green/40 border-football-green/15",
  },
  "ai-blue": {
    bg: "bg-ai-blue/10",
    border: "border-ai-blue/30",
    activeBorder: "border-ai-blue/70",
    text: "text-ai-blue",
    textInactive: "text-ai-blue/50",
    iconBg: "bg-ai-blue/20",
    glow: "shadow-[0_0_30px_rgba(0,102,255,0.15)]",
    activeGlow: "shadow-[0_0_50px_rgba(0,102,255,0.3)]",
    dot: "bg-ai-blue",
    badgeBg: "bg-ai-blue/15 text-ai-blue border-ai-blue/30",
    badgeBgInactive: "text-ai-blue/40 border-ai-blue/15",
  },
  "tech-purple": {
    bg: "bg-tech-purple/10",
    border: "border-tech-purple/30",
    activeBorder: "border-tech-purple/70",
    text: "text-tech-purple",
    textInactive: "text-tech-purple/50",
    iconBg: "bg-tech-purple/20",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    activeGlow: "shadow-[0_0_50px_rgba(139,92,246,0.3)]",
    dot: "bg-tech-purple",
    badgeBg: "bg-tech-purple/15 text-tech-purple border-tech-purple/30",
    badgeBgInactive: "text-tech-purple/40 border-tech-purple/15",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    activeBorder: "border-energy-orange/70",
    text: "text-energy-orange",
    textInactive: "text-energy-orange/50",
    iconBg: "bg-energy-orange/20",
    glow: "shadow-[0_0_30px_rgba(255,107,53,0.15)]",
    activeGlow: "shadow-[0_0_50px_rgba(255,107,53,0.3)]",
    dot: "bg-energy-orange",
    badgeBg: "bg-energy-orange/15 text-energy-orange border-energy-orange/30",
    badgeBgInactive: "text-energy-orange/40 border-energy-orange/15",
  },
  "energy-red": {
    bg: "bg-energy-red/10",
    border: "border-energy-red/30",
    activeBorder: "border-energy-red/70",
    text: "text-energy-red",
    textInactive: "text-energy-red/50",
    iconBg: "bg-energy-red/20",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    activeGlow: "shadow-[0_0_50px_rgba(239,68,68,0.3)]",
    dot: "bg-energy-red",
    badgeBg: "bg-energy-red/15 text-energy-red border-energy-red/30",
    badgeBgInactive: "text-energy-red/40 border-energy-red/15",
  },
} as const;

export function GameMomentsSection() {
  const t = useTranslations();
  const tList = useTranslationList();
  const [activeIndex, setActiveIndex] = useState(0);

  const active = gameMoments[activeIndex];
  const colors = colorMap[active.color];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Selector list */}
      <div className="lg:w-80 shrink-0 space-y-2">
        {gameMoments.map((moment, idx) => {
          const mc = colorMap[moment.color];
          const isActive = idx === activeIndex;
          const Icon = moment.icon;

          return (
            <button
              key={moment.key}
              onClick={() => setActiveIndex(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 text-left group ${
                isActive
                  ? `glass ${mc.activeBorder} ${mc.bg} ${mc.activeGlow}`
                  : "border-border/30 hover:border-border/60 hover:bg-secondary/30"
              }`}
            >
              <div
                className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isActive ? mc.iconBg : "bg-secondary/50"
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 transition-colors duration-300 ${
                    isActive ? mc.text : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate transition-colors duration-300 ${
                    isActive ? mc.text : mc.textInactive
                  }`}
                >
                  {t(`philosophy.gameMomentsList.${moment.key}`)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 font-mono tracking-wider transition-all duration-300 ${
                    isActive ? mc.badgeBg : mc.badgeBgInactive
                  }`}
                >
                  {moment.badge}
                </Badge>
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isActive
                      ? `${mc.text} translate-x-0 opacity-100`
                      : "text-muted-foreground -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: Detail panel */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className={`glass rounded-xl p-8 border ${colors.border} ${colors.glow} relative overflow-hidden h-full`}
          >
            {/* Accent line */}
            <div
              className={`absolute top-0 left-0 w-1 h-full ${colors.dot}`}
            />

            <div className="pl-4">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}
                >
                  <active.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t(`philosophy.gameMomentsList.${active.key}`)}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`mt-1 text-[10px] font-mono tracking-wider ${colors.badgeBg}`}
                  >
                    {active.badge}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(`philosophy.gameMomentsDescriptions.${active.key}`)}
              </p>

              {/* Principles */}
              <div className="space-y-2.5">
                {tList(`philosophy.gameMomentsPrinciples.${active.key}`).map(
                  (principle, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${colors.dot}`}
                      />
                      <p className="text-sm text-foreground/80">
                        {principle}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
