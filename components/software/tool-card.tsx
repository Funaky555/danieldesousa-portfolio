"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Film,
  Play,
  Bot,
  Sparkles,
  Search,
  Target,
  FileText,
  Cloud,
} from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Film,
  Play,
  Bot,
  Sparkles,
  Search,
  Target,
  FileText,
  Cloud,
};

const levelColors: Record<string, string> = {
  "Daily Use": "bg-emerald-600/10 dark:bg-football-green/10 text-emerald-700 dark:text-football-green",
  Advanced: "bg-blue-600/10 dark:bg-ai-blue/10 text-blue-700 dark:text-ai-blue",
  Regular: "bg-purple-600/10 dark:bg-tech-purple/10 text-purple-700 dark:text-tech-purple",
  Intermediate: "bg-orange-500/10 dark:bg-energy-orange/10 text-orange-600 dark:text-energy-orange",
};

// Map tool names to translation keys
const toolKeyMap: Record<string, string> = {
  "Adobe Premiere Pro": "premiere",
  "DaVinci Resolve": "davinci",
  "Hudl": "hudl",
  "ChatGPT": "chatgpt",
  "Microsoft Copilot": "copilot",
  "Wyscout": "wyscout",
  "Football Manager": "fm",
  "Microsoft Office": "office",
  "Google Workspace": "google",
};

// Map levels to translation keys
const levelKeyMap: Record<string, string> = {
  "Daily Use": "dailyUse",
  "Advanced": "advanced",
  "Regular": "regular",
  "Intermediate": "intermediate",
};

interface Tool {
  name: string;
  description: string;
  icon: string;
  level: string;
}

export function ToolCard({ tool }: { tool: Tool }) {
  const t = useTranslations();
  const Icon = iconMap[tool.icon] || Target;
  const toolKey = toolKeyMap[tool.name] || "premiere";
  const levelKey = levelKeyMap[tool.level] || "regular";

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${levelColors[tool.level] || "bg-muted text-muted-foreground"}`}
          >
            {t(`software.levels.${levelKey}`)}
          </span>
        </div>
        <h3 className="font-bold text-foreground mb-1">{t(`software.tools.${toolKey}.name`)}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(`software.tools.${toolKey}.description`)}
        </p>
      </CardContent>
    </Card>
  );
}
