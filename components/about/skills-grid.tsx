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

const languageFlags: Record<string, string> = {
  Portuguese: "🇵🇹",
  English: "🇬🇧",
  Spanish: "🇪🇸",
  French: "🇫🇷",
  Chinese: "🇨🇳",
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "" });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform: tiltStyle.transform }}
    >
      {children}
    </div>
  );
}

function AnimatedBar({ proficiency }: { proficiency: number }) {
  const [go, setGo] = useState(false);
  return (
    <motion.div
      className="w-full h-2 bg-muted rounded-full overflow-hidden"
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
              return (
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <TiltCard className="h-full">
                    <div className="glass rounded-xl p-5 border border-border/40 hover:border-border/70 transition-all duration-300 cursor-default flex flex-col items-center justify-center text-center h-full">
                      <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="font-semibold text-sm text-foreground">{t(`about.skills.${skill.key}`)}</p>
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
              <LanguagesIcon className="w-6 h-6 mr-2 text-muted-foreground" />
              {t("about.languages.title")}
            </h3>
          )}
          <div className="space-y-4 max-w-2xl mx-auto">
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
