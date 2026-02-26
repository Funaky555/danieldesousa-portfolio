"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Film,
  Bot,
  Sparkles,
  Search,
  Target,
  FileText,
  MessageSquare,
  Mic,
  BarChart,
} from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Film,
  Bot,
  Sparkles,
  Search,
  Target,
  FileText,
  MessageSquare,
  Mic,
  BarChart,
};

const levelColors: Record<string, string> = {
  "Daily Use": "bg-emerald-600/10 dark:bg-football-green/10 text-emerald-700 dark:text-football-green",
  Advanced: "bg-blue-600/10 dark:bg-ai-blue/10 text-blue-700 dark:text-ai-blue",
  Regular: "bg-purple-600/10 dark:bg-tech-purple/10 text-purple-700 dark:text-tech-purple",
  Intermediate: "bg-orange-500/10 dark:bg-energy-orange/10 text-orange-600 dark:text-energy-orange",
};

// Map tool names to translation keys
const toolKeyMap: Record<string, string> = {
  "LongoMatch": "longomatch",
  "Coach Paint": "coachpaint",
  "ChatGPT": "chatgpt",
  "Claude AI": "claude",
  "eASYmUSIC ai": "easymusicai",
  "Wyscout": "wyscout",
  "Instat": "instat",
  "Football Manager": "fm",
  "Microsoft Office": "office",
  "Discord": "discord",
  "TeamSpeak": "teamspeak",
  "Skype": "skype",
};

// Colored initials for tools without logos
const toolInitials: Record<string, { letters: string; bg: string; text: string }> = {
  "LongoMatch": { letters: "LM", bg: "bg-energy-orange/20", text: "text-energy-orange" },
  "Coach Paint": { letters: "CP", bg: "bg-orange-500/20", text: "text-orange-400" },
  "eASYmUSIC ai": { letters: "eM", bg: "bg-tech-purple/20", text: "text-tech-purple" },
  "Wyscout": { letters: "WS", bg: "bg-football-green/20", text: "text-football-green" },
  "Instat": { letters: "IN", bg: "bg-ai-blue/20", text: "text-ai-blue" },
  "Football Manager": { letters: "FM", bg: "bg-emerald-500/20", text: "text-emerald-400" },
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
  logo?: string | null;
}

export function ToolCard({ tool }: { tool: Tool }) {
  const t = useTranslations();
  const Icon = iconMap[tool.icon] || Target;
  const toolKey = toolKeyMap[tool.name] || "office";
  const levelKey = levelKeyMap[tool.level] || "regular";
  const initials = toolInitials[tool.name];

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
            {tool.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.logo}
                alt={tool.name}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            ) : initials ? (
              <span className={`text-xs font-bold ${initials.text}`}>
                {initials.letters}
              </span>
            ) : (
              <Icon className="w-5 h-5 text-primary" />
            )}
          </div>
          <Badge
            variant="outline"
            className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${levelColors[tool.level] || "bg-muted text-muted-foreground"}`}
          >
            {t(`software.levels.${levelKey}`)}
          </Badge>
        </div>
        <h3 className="font-bold text-foreground mb-1">{t(`software.tools.${toolKey}.name`)}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(`software.tools.${toolKey}.description`)}
        </p>
      </CardContent>
    </Card>
  );
}
