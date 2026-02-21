"use client";

import { motion } from "framer-motion";
import { EducationTimeline } from "@/components/about/timeline";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "@/components/providers/i18n-provider";
import {
  Award,
  GraduationCap,
  Brain,
  Languages as LanguagesIcon,
  Calendar,
  Globe,
  Users,
} from "lucide-react";

const tabColorMap = {
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
} as const;

const aboutTabs = [
  { key: "certificacoes", icon: Award,         color: "football-green" as const, labelKey: "about.education.certifications" as const },
  { key: "formacao",      icon: GraduationCap, color: "ai-blue" as const,        labelKey: "about.education.academic" as const },
  { key: "competencias",  icon: Brain,         color: "tech-purple" as const,    labelKey: "about.skills.title" as const },
  { key: "idiomas",       icon: LanguagesIcon, color: "energy-orange" as const,  labelKey: "about.languages.title" as const },
];

const statsConfig = [
  { value: "10+",    labelKey: "home.stats.experience" as const,    icon: Calendar },
  { value: "2",      labelKey: "home.stats.countries" as const,     icon: Globe },
  { value: "U4-U18", labelKey: "home.stats.ageGroups" as const,     icon: Users },
  { value: "UEFA B", labelKey: "home.stats.certification" as const, icon: Award },
];

export function AboutContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header animado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("about.title")}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground leading-relaxed">
            {t("about.bio")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Stats row — neutro, valor em football-green */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
            {statsConfig.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass rounded-xl p-4 border border-border/40 hover:border-football-green/40 transition-all duration-300 text-center cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-lg md:text-xl font-bold text-football-green">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t(stat.labelKey)}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs — estilo Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Tabs defaultValue="certificacoes" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {aboutTabs.map(({ key, icon: Icon, color, labelKey }) => {
                  const tc = tabColorMap[color];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`glass flex items-center gap-2 px-3 sm:px-4 py-2.5 border rounded-lg transition-all duration-300 ${tc.inactiveBorder} ${tc.inactiveBg} ${tc.inactiveText} ${tc.hoverGlow} hover:border-opacity-50 ${tc.activeBg}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline text-sm font-medium">{t(labelKey)}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {aboutTabs.map(({ key, icon: Icon, color, labelKey }) => {
                const tc = tabColorMap[color];
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="glass rounded-xl border border-border/50 overflow-hidden">
                      {/* Header colorido do content — igual ao padrão Philosophy */}
                      <div className={`flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 ${tc.inactiveBg}`}>
                        <div className={`w-9 h-9 rounded-lg ${tc.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${tc.iconText}`} />
                        </div>
                        <h2 className={`font-semibold text-base ${tc.iconText}`}>{t(labelKey)}</h2>
                      </div>
                      {/* Conteúdo */}
                      <div className="p-4 sm:p-6 md:p-8">
                        {key === "certificacoes" && <EducationTimeline filterType="certs" />}
                        {key === "formacao"      && <EducationTimeline filterType="academic" />}
                        {key === "competencias"  && <SkillsGrid variant="skills" />}
                        {key === "idiomas"       && <SkillsGrid variant="languages" />}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
