"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

type TrophyType = "champion" | "vice-champion" | "promotion";

interface Championship {
  id: string;
  titleKey: string;
  descKey: string;
  years: string;
  location: string;
  country: "china" | "portugal";
  type: TrophyType;
  timelineId: string;
}

const championships: Championship[] = [
  {
    id: "u15-male-vc",
    titleKey: "experience.championships.u15MaleViceChampion",
    descKey: "experience.championships.u15MaleViceChampionDesc",
    years: "2023, 2024",
    location: "Tongling, China",
    country: "china",
    type: "vice-champion",
    timelineId: "job-1",
  },
  {
    id: "u15-female-c",
    titleKey: "experience.championships.u15FemaleChampion",
    descKey: "experience.championships.u15FemaleChampionDesc",
    years: "2023",
    location: "Tongling, China",
    country: "china",
    type: "champion",
    timelineId: "job-1",
  },
  {
    id: "u18-vc-promo",
    titleKey: "experience.championships.u18ViceChampion",
    descKey: "experience.championships.u18ViceChampionDesc",
    years: "2017/2018",
    location: "Porto, Portugal",
    country: "portugal",
    type: "promotion",
    timelineId: "job-7",
  },
  {
    id: "u17-vc",
    titleKey: "experience.championships.u17ViceChampion",
    descKey: "experience.championships.u17ViceChampionDesc",
    years: "2014/2015",
    location: "Porto, Portugal",
    country: "portugal",
    type: "promotion",
    timelineId: "job-7",
  },
  {
    id: "u16-c",
    titleKey: "experience.championships.u16MaleChampion",
    descKey: "experience.championships.u16MaleChampionDesc",
    years: "2013/2014",
    location: "Porto, Portugal",
    country: "portugal",
    type: "promotion",
    timelineId: "job-7",
  },
];

const trophyColors = {
  champion: {
    icon: "text-yellow-500",
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/20",
    borderHover: "hover:border-yellow-500/40",
    bar: "bg-yellow-500",
    textHover: "hover:text-yellow-500",
  },
  "vice-champion": {
    icon: "text-slate-400",
    bg: "bg-slate-500/5",
    border: "border-slate-500/20",
    borderHover: "hover:border-slate-400/40",
    bar: "bg-slate-400",
    textHover: "hover:text-slate-300",
  },
  promotion: {
    icon: "text-football-green",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-500/40",
    bar: "bg-football-green",
    textHover: "hover:text-football-green",
  },
} as const;

function TrophyBadge({
  championship,
  index,
}: {
  championship: Championship;
  index: number;
}) {
  const t = useTranslations();
  const colors = trophyColors[championship.type];
  const Icon = championship.type === "champion" ? Medal : Award;

  const scrollToJob = () => {
    document.getElementById(championship.timelineId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.div
      id={`trophy-${championship.id}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <motion.div
        className={`rounded-lg p-2.5 border transition-all duration-300 cursor-pointer ${colors.bg} ${colors.border} ${colors.borderHover}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={scrollToJob}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-0.5 self-stretch rounded-full ${colors.bar}`} />
          <Icon className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-medium text-foreground ${colors.textHover} hover:underline transition-colors`}>
              {t(championship.titleKey)}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {championship.years}
            </div>
          </div>
          <span className="text-[11px] flex-shrink-0">
            {championship.country === "china" ? "🇨🇳" : "🇵🇹"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TrophyShowcase() {
  const t = useTranslations();

  return (
    <Card className="border-border/50 glass hover:border-yellow-500/50 transition-all">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="font-bold text-foreground flex-1">
            {t("experience.highlights.championships")}
          </h3>
        </div>

        <div className="space-y-1.5">
          {championships.map((champ, idx) => (
            <TrophyBadge
              key={champ.id}
              championship={champ}
              index={idx}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
