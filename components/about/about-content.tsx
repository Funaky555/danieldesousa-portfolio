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

const aboutTabs = [
  { key: "certificacoes", icon: Award,         labelKey: "about.education.certifications" },
  { key: "formacao",      icon: GraduationCap, labelKey: "about.education.academic" },
  { key: "competencias",  icon: Brain,         labelKey: "about.skills.title" },
  { key: "idiomas",       icon: LanguagesIcon, labelKey: "about.languages.title" },
] as const;

const statsConfig = [
  { value: "10+",    labelKey: "home.stats.experience",    icon: Calendar },
  { value: "2",      labelKey: "home.stats.countries",     icon: Globe },
  { value: "U4-U18", labelKey: "home.stats.ageGroups",     icon: Users },
  { value: "UEFA B", labelKey: "home.stats.certification", icon: Award },
] as const;

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
          {/* Stats row — neutro, apenas o valor em football-green */}
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

          {/* Tabs de navegação — estilo pill neutro, ativo em football-green */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Tabs defaultValue="certificacoes" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="inline-flex flex-wrap justify-center gap-1 bg-muted/30 p-1 rounded-xl border border-football-green/20 h-auto shadow-[0_0_30px_rgba(0,214,108,0.06)]">
                  {aboutTabs.map(({ key, icon: Icon, labelKey }) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground transition-all duration-200 data-[state=active]:bg-football-green/15 data-[state=active]:text-football-green data-[state=active]:border data-[state=active]:border-football-green/30"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{t(labelKey)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

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
