"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart3, Search, Users, Target, Presentation, Globe,
  ArrowRight, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  Search,
  Users,
  Target,
  Presentation,
  Globe,
};

const serviceColorMap: Record<string, {
  gradient: string;
  shadow: string;
  iconBg: string;
  iconText: string;
  border: string;
  topBar: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}> = {
  "game-analysis": {
    gradient: "from-blue-500/15 to-blue-600/5",
    shadow: "hover:shadow-blue-500/20",
    iconBg: "bg-blue-500/15",
    iconText: "text-blue-400",
    border: "hover:border-blue-500/60",
    topBar: "from-blue-500 to-blue-600",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/30",
  },
  "scouting": {
    gradient: "from-emerald-500/15 to-emerald-600/5",
    shadow: "hover:shadow-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconText: "text-emerald-400",
    border: "hover:border-emerald-500/60",
    topBar: "from-emerald-500 to-emerald-600",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/30",
  },
  "leadership": {
    gradient: "from-violet-500/15 to-violet-600/5",
    shadow: "hover:shadow-violet-500/20",
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-400",
    border: "hover:border-violet-500/60",
    topBar: "from-violet-500 to-violet-600",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
    badgeBorder: "border-violet-500/30",
  },
  "training": {
    gradient: "from-orange-500/15 to-orange-600/5",
    shadow: "hover:shadow-orange-500/20",
    iconBg: "bg-orange-500/15",
    iconText: "text-orange-400",
    border: "hover:border-orange-500/60",
    topBar: "from-orange-500 to-orange-600",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
    badgeBorder: "border-orange-500/30",
  },
  "seminars": {
    gradient: "from-pink-500/15 to-pink-600/5",
    shadow: "hover:shadow-pink-500/20",
    iconBg: "bg-pink-500/15",
    iconText: "text-pink-400",
    border: "hover:border-pink-500/60",
    topBar: "from-pink-500 to-pink-600",
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400",
    badgeBorder: "border-pink-500/30",
  },
  "websites": {
    gradient: "from-cyan-500/15 to-cyan-600/5",
    shadow: "hover:shadow-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconText: "text-cyan-400",
    border: "hover:border-cyan-500/60",
    topBar: "from-cyan-500 to-cyan-600",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400",
    badgeBorder: "border-cyan-500/30",
  },
};

const defaultColors = serviceColorMap["game-analysis"];

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    features: string[];
    deliverables: string[];
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations();
  const tList = useTranslationList();
  const Icon = iconMap[service.icon] || BarChart3;
  const colors = serviceColorMap[service.id] ?? defaultColors;
  const isNew = service.id === "websites";

  const serviceKeyMap: Record<string, string> = {
    "game-analysis": "gameAnalysis",
    "scouting": "scouting",
    "leadership": "leadership",
    "training": "training",
    "seminars": "seminars",
    "websites": "websites",
  };

  const translationKey = serviceKeyMap[service.id] || service.id;

  return (
    <Card
      id={service.id}
      className={cn(
        "relative border-border/40 transition-all duration-300 h-full flex flex-col overflow-hidden",
        "hover:scale-[1.02] hover:shadow-xl",
        colors.border,
        colors.shadow,
      )}
    >
      {/* Barra de gradiente no topo */}
      <div className={cn("h-1 w-full bg-gradient-to-r flex-shrink-0", colors.topBar)} />

      {/* Fundo glassmorphism subtil colorido */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none", colors.gradient)} />

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {/* Ícone com container colorido */}
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.iconBg)}>
            <Icon className={cn("w-6 h-6", colors.iconText)} />
          </div>
          {/* Badge "New" para o serviço websites */}
          {isNew && (
            <Badge className={cn("text-xs font-semibold border", colors.badgeBg, colors.badgeText, colors.badgeBorder)}>
              {t("services.new")}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {t(`services.list.${translationKey}.title`)}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {t(`services.list.${translationKey}.description`)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col relative z-10">
        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            {t("services.features")}
          </h4>
          <ul className="space-y-2">
            {tList(`services.list.${translationKey}.features`).map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-muted-foreground">
                <Check className={cn("w-4 h-4 mr-2 mt-0.5 flex-shrink-0", colors.iconText)} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            {t("services.deliverables")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {tList(`services.list.${translationKey}.deliverables`).map((deliverable, index) => (
              <Badge
                key={index}
                className={cn("text-xs border", colors.badgeBg, colors.badgeText, colors.badgeBorder)}
              >
                {deliverable}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Button
            asChild
            className={cn(
              "w-full bg-gradient-to-r text-white border-0 hover:opacity-90 transition-opacity",
              colors.topBar,
            )}
          >
            <Link href="/contact">
              {t("services.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
