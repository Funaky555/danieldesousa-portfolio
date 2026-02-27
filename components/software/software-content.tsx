"use client";

import { motion } from "framer-motion";
import { ToolCard } from "@/components/software/tool-card";
import { softwareTools } from "@/lib/coaching-data";
import { Video, Bot, Search, Briefcase } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

// Map category names to translation keys
const categoryKeyMap: Record<string, string> = {
  "Video & Match Analysis": "videoAnalysis",
  "AI & Productivity": "aiProductivity",
  "Tactical & Scouting": "tacticalScouting",
  "Office & Communication": "officeCommunication",
};

// Category color and icon configuration
const categoryConfig: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconText: string;
    border: string;
    bg: string;
    text: string;
    glow: string;
    gradientFrom: string;
  }
> = {
  "Video & Match Analysis": {
    icon: Video,
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    border: "border-energy-orange/40",
    bg: "bg-energy-orange/5",
    text: "text-energy-orange",
    glow: "shadow-[0_0_30px_rgba(255,107,53,0.2)]",
    gradientFrom: "from-energy-orange/10",
  },
  "AI & Productivity": {
    icon: Bot,
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    border: "border-ai-blue/40",
    bg: "bg-ai-blue/5",
    text: "text-ai-blue",
    glow: "shadow-[0_0_30px_rgba(0,102,255,0.2)]",
    gradientFrom: "from-ai-blue/10",
  },
  "Tactical & Scouting": {
    icon: Search,
    iconBg: "bg-football-green/20",
    iconText: "text-football-green",
    border: "border-football-green/40",
    bg: "bg-football-green/5",
    text: "text-football-green",
    glow: "shadow-[0_0_30px_rgba(0,214,108,0.2)]",
    gradientFrom: "from-football-green/10",
  },
  "Office & Communication": {
    icon: Briefcase,
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    border: "border-tech-purple/40",
    bg: "bg-tech-purple/5",
    text: "text-tech-purple",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    gradientFrom: "from-tech-purple/10",
  },
};

export function SoftwareContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("software.title")}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground">
            {t("software.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Tool Categories */}
          {softwareTools.map((category, categoryIndex) => {
            const categoryKey = categoryKeyMap[category.category] || "videoAnalysis";
            const config = categoryConfig[category.category];
            const CategoryIcon = config?.icon || Video;

            return (
              <motion.section
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {/* Colorful Category Header */}
                <div className="flex justify-center mb-8">
                  <div
                    className={`
                      inline-flex items-center gap-3 px-6 py-3 rounded-2xl min-w-[320px] justify-center
                      border ${config?.border ?? "border-border/50"}
                      ${config?.bg ?? "bg-secondary"}
                      ${config?.glow ?? ""}
                      bg-gradient-to-r ${config?.gradientFrom ?? "from-secondary"} to-transparent
                    `}
                  >
                    <div className={`w-8 h-8 rounded-lg ${config?.iconBg ?? "bg-secondary"} flex items-center justify-center`}>
                      <CategoryIcon className={`w-4 h-4 ${config?.iconText ?? "text-foreground"}`} />
                    </div>
                    <h2 className={`text-lg sm:text-xl font-bold ${config?.text ?? "text-foreground"}`}>
                      {t(`software.categories.${categoryKey}`)}
                    </h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config?.iconBg ?? "bg-secondary"} ${config?.text ?? "text-foreground"}`}>
                      {category.tools.length} {category.tools.length === 1 ? "tool" : "tools"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + toolIndex * 0.07,
                      }}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
