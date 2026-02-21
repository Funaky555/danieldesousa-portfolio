"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { languages } from "@/lib/coaching-data";
import {
  Users, Brain, Handshake, Target, Workflow, Ear,
  Languages as LanguagesIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/providers/i18n-provider";

const skillKeys = [
  { key: "leadership", icon: Users },
  { key: "criticalThinking", icon: Brain },
  { key: "collaboration", icon: Handshake },
  { key: "decisionMaking", icon: Target },
  { key: "flexibility", icon: Workflow },
  { key: "activeListening", icon: Ear },
];

const skillColors = [
  { bg: "bg-football-green/10", border: "border-football-green/30", text: "text-football-green", iconBg: "bg-football-green/20", glowRgba: "rgba(0,214,108,0.15)" },
  { bg: "bg-ai-blue/10",        border: "border-ai-blue/30",        text: "text-ai-blue",        iconBg: "bg-ai-blue/20",        glowRgba: "rgba(0,102,255,0.15)" },
  { bg: "bg-tech-purple/10",    border: "border-tech-purple/30",    text: "text-tech-purple",    iconBg: "bg-tech-purple/20",    glowRgba: "rgba(139,92,246,0.15)" },
  { bg: "bg-energy-orange/10",  border: "border-energy-orange/30",  text: "text-energy-orange",  iconBg: "bg-energy-orange/20",  glowRgba: "rgba(255,107,53,0.15)" },
  { bg: "bg-football-green/10", border: "border-football-green/30", text: "text-football-green", iconBg: "bg-football-green/20", glowRgba: "rgba(0,214,108,0.15)" },
  { bg: "bg-ai-blue/10",        border: "border-ai-blue/30",        text: "text-ai-blue",        iconBg: "bg-ai-blue/20",        glowRgba: "rgba(0,102,255,0.15)" },
] as const;

const languageFlags: Record<string, string> = {
  Portuguese: "🇵🇹",
  English: "🇬🇧",
  Spanish: "🇪🇸",
  French: "🇫🇷",
  Chinese: "🇨🇳",
};

function TiltCard({ children, glowColor, className }: { children: React.ReactNode; glowColor: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "", glowBg: "" });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      glowBg: `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "", glowBg: "" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform: tiltStyle.transform }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: tiltStyle.glowBg }}
      />
      {children}
    </div>
  );
}

function AnimatedBar({ proficiency }: { proficiency: number }) {
  const [go, setGo] = useState(false);
  return (
    <motion.div
      className="w-full h-2.5 bg-muted rounded-full overflow-hidden"
      onViewportEnter={() => setGo(true)}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-football-green via-ai-blue to-tech-purple rounded-full"
        initial={{ width: 0 }}
        animate={{ width: go ? `${proficiency}%` : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </motion.div>
  );
}

interface SkillsGridProps {
  variant?: "skills" | "languages" | "all";
}

export function SkillsGrid({ variant = "all" }: SkillsGridProps) {
  const t = useTranslations();

  return (
    <div className="space-y-10">
      {/* Soft Skills */}
      {(variant === "skills" || variant === "all") && (
        <div>
          {variant === "all" && (
            <h3 className="text-lg font-bold text-foreground mb-6">{t("about.skills.title")}</h3>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skillKeys.map((skill, idx) => {
              const Icon = skill.icon;
              const sc = skillColors[idx];
              return (
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="relative group"
                >
                  <TiltCard glowColor={sc.glowRgba} className="relative">
                    <div
                      className={`glass rounded-xl p-5 border ${sc.border} ${sc.bg} transition-all duration-300 cursor-default flex flex-col items-center justify-center text-center`}
                    >
                      <div className={`w-12 h-12 rounded-full ${sc.iconBg} flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 ${sc.text}`} />
                      </div>
                      <p className={`font-semibold text-sm ${sc.text}`}>{t(`about.skills.${skill.key}`)}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Languages */}
      {(variant === "languages" || variant === "all") && (
        <div>
          {variant === "all" && (
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
              <LanguagesIcon className="w-6 h-6 mr-2 text-primary" />
              {t("about.languages.title")}
            </h3>
          )}
          <div className="space-y-5 max-w-2xl mx-auto">
            {languages.map((lang, idx) => {
              const levelKey = lang.level === "Native" ? "native" : lang.level === "Proficient" ? "proficient" : "basic";
              const flag = languageFlags[lang.language] ?? "🌐";
              return (
                <motion.div
                  key={lang.language}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.4 }}
                  className="glass rounded-xl p-4 border border-border/40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{flag}</span>
                      <span className="font-semibold text-foreground">{lang.language}</span>
                      <Badge variant="outline" className="text-xs">{t(`about.languages.${levelKey}`)}</Badge>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">{lang.proficiency}%</span>
                  </div>
                  <AnimatedBar proficiency={lang.proficiency} />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
