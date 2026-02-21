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
    inactiveBorder: "border-football-green/20",
    inactiveBg: "bg-football-green/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,214,108,0.1)]",
    activeBg:
      "data-[state=active]:bg-football-green/20 data-[state=active]:border-football-green/50 data-[state=active]:text-football-green data-[state=active]:shadow-[0_0_30px_rgba(0,214,108,0.2)]",
  },
  "ai-blue": {
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    inactiveBorder: "border-ai-blue/20",
    inactiveBg: "bg-ai-blue/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,102,255,0.1)]",
    activeBg:
      "data-[state=active]:bg-ai-blue/20 data-[state=active]:border-ai-blue/50 data-[state=active]:text-ai-blue data-[state=active]:shadow-[0_0_30px_rgba(0,102,255,0.2)]",
  },
  "tech-purple": {
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    inactiveBorder: "border-tech-purple/20",
    inactiveBg: "bg-tech-purple/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    activeBg:
      "data-[state=active]:bg-tech-purple/20 data-[state=active]:border-tech-purple/50 data-[state=active]:text-tech-purple data-[state=active]:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
  },
  "energy-orange": {
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    inactiveBorder: "border-energy-orange/20",
    inactiveBg: "bg-energy-orange/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]",
    activeBg:
      "data-[state=active]:bg-energy-orange/20 data-[state=active]:border-energy-orange/50 data-[state=active]:text-energy-orange data-[state=active]:shadow-[0_0_30px_rgba(255,107,53,0.2)]",
  },
} as const;

const statColorMap = {
  "football-green": {
    text: "text-football-green",
    border: "border-football-green/20",
    hoverBorder: "hover:border-football-green/50",
    shadow: "hover:shadow-[0_0_20px_rgba(0,214,108,0.2)]",
    iconBg: "bg-football-green/20",
  },
  "ai-blue": {
    text: "text-ai-blue",
    border: "border-ai-blue/20",
    hoverBorder: "hover:border-ai-blue/50",
    shadow: "hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]",
    iconBg: "bg-ai-blue/20",
  },
  "tech-purple": {
    text: "text-tech-purple",
    border: "border-tech-purple/20",
    hoverBorder: "hover:border-tech-purple/50",
    shadow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    iconBg: "bg-tech-purple/20",
  },
  "energy-orange": {
    text: "text-energy-orange",
    border: "border-energy-orange/20",
    hoverBorder: "hover:border-energy-orange/50",
    shadow: "hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]",
    iconBg: "bg-energy-orange/20",
  },
} as const;

export function AboutContent() {
  const t = useTranslations();

  const aboutTabs = [
    { key: "certificacoes", icon: Award,          color: "football-green" as const, label: t("about.education.certifications") },
    { key: "formacao",      icon: GraduationCap,  color: "ai-blue" as const,        label: t("about.education.academic") },
    { key: "competencias",  icon: Brain,          color: "tech-purple" as const,    label: t("about.skills.title") },
    { key: "idiomas",       icon: LanguagesIcon,  color: "energy-orange" as const,  label: t("about.languages.title") },
  ];

  const stats = [
    { value: "10+",    labelKey: "home.stats.experience",    icon: Calendar,  color: "football-green" as const },
    { value: "2",      labelKey: "home.stats.countries",     icon: Globe,     color: "ai-blue" as const },
    { value: "U4-U18", labelKey: "home.stats.ageGroups",     icon: Users,     color: "tech-purple" as const },
    { value: "UEFA B", labelKey: "home.stats.certification", icon: Award,     color: "energy-orange" as const },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
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
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
            {stats.map((stat, idx) => {
              const sc = statColorMap[stat.color];
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.color}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`glass rounded-xl p-4 border ${sc.border} ${sc.hoverBorder} ${sc.shadow} transition-all duration-300 text-center cursor-default`}
                >
                  <div className={`w-9 h-9 rounded-lg ${sc.iconBg} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`w-5 h-5 ${sc.text}`} />
                  </div>
                  <div className={`text-lg md:text-xl font-bold ${sc.text}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t(stat.labelKey as Parameters<typeof t>[0])}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs de navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Tabs defaultValue="certificacoes" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {aboutTabs.map(({ key, icon: Icon, color, label }) => {
                  const tc = tabColorMap[color];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`glass flex items-center gap-2 px-3 sm:px-4 py-2.5 border rounded-lg transition-all duration-300 ${tc.inactiveBorder} ${tc.inactiveBg} text-muted-foreground ${tc.hoverGlow} ${tc.activeBg}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-medium">{label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value="certificacoes" className="mt-0">
                <EducationTimeline filterType="certs" />
              </TabsContent>

              <TabsContent value="formacao" className="mt-0">
                <EducationTimeline filterType="academic" />
              </TabsContent>

              <TabsContent value="competencias" className="mt-0">
                <SkillsGrid variant="skills" />
              </TabsContent>

              <TabsContent value="idiomas" className="mt-0">
                <SkillsGrid variant="languages" />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
