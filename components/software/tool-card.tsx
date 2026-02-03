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
  "Daily Use": "bg-football-green/10 text-football-green",
  Advanced: "bg-ai-blue/10 text-ai-blue",
  Regular: "bg-tech-purple/10 text-tech-purple",
  Intermediate: "bg-energy-orange/10 text-energy-orange",
};

interface Tool {
  name: string;
  description: string;
  icon: string;
  level: string;
}

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = iconMap[tool.icon] || Target;

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
            {tool.level}
          </span>
        </div>
        <h3 className="font-bold text-foreground mb-1">{tool.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </CardContent>
    </Card>
  );
}
