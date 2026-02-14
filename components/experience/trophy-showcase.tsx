"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, MapPin, ChevronDown, ExternalLink } from "lucide-react";
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
  mapsUrl: string;
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
    mapsUrl: "https://www.google.com/maps/place/Tongling,+Anhui,+China",
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
    mapsUrl: "https://www.google.com/maps/place/Tongling,+Anhui,+China",
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
    mapsUrl: "https://www.google.com/maps/place/Porto,+Portugal",
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
    mapsUrl: "https://www.google.com/maps/place/Porto,+Portugal",
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
    mapsUrl: "https://www.google.com/maps/place/Porto,+Portugal",
  },
];

const trophyColors = {
  champion: {
    icon: "text-yellow-500",
    bg: "bg-yellow-500/5",
    bgActive: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    borderActive: "border-yellow-500/40",
    bar: "bg-yellow-500",
    glow: "shadow-[0_0_25px_rgba(234,179,8,0.25)]",
  },
  "vice-champion": {
    icon: "text-slate-400",
    bg: "bg-slate-500/5",
    bgActive: "bg-slate-500/10",
    border: "border-slate-500/20",
    borderActive: "border-slate-400/40",
    bar: "bg-slate-400",
    glow: "shadow-[0_0_25px_rgba(148,163,184,0.2)]",
  },
  promotion: {
    icon: "text-football-green",
    bg: "bg-emerald-500/5",
    bgActive: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    borderActive: "border-emerald-500/40",
    bar: "bg-football-green",
    glow: "shadow-[0_0_25px_rgba(0,214,108,0.25)]",
  },
} as const;

function TrophyBadge({
  championship,
  index,
  isExpanded,
  onToggle,
}: {
  championship: Championship;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations();
  const colors = trophyColors[championship.type];
  const Icon = championship.type === "champion" ? Medal : Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <motion.button
        onClick={onToggle}
        className={`w-full text-left rounded-lg p-2.5 border transition-all duration-300 cursor-pointer ${
          isExpanded
            ? `${colors.bgActive} ${colors.borderActive} ${colors.glow}`
            : `${colors.bg} ${colors.border} hover:${colors.borderActive}`
        }`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-0.5 self-stretch rounded-full ${colors.bar}`} />
          <Icon className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-foreground truncate">
              {t(championship.titleKey)}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {championship.years}
            </div>
          </div>
          <span className="text-[11px] flex-shrink-0">
            {championship.country === "china" ? "🇨🇳" : "🇵🇹"}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mt-1.5 p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <button
                    onClick={() => document.getElementById(championship.timelineId)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    className="hover:text-foreground hover:underline transition-colors cursor-pointer"
                  >
                    {championship.location}
                  </button>
                  <a
                    href={championship.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-ai-blue transition-colors ml-auto flex-shrink-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Maps
                  </a>
                </div>
                <div className="text-[11px] text-muted-foreground/80">
                  {t(championship.descKey)}
                </div>
                {championship.type === "promotion" && (
                  <Badge className="text-[9px] h-5 bg-football-green/15 text-football-green border border-football-green/30 hover:bg-football-green/20">
                    PROMOTION
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TrophyShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
              isExpanded={expandedId === champ.id}
              onToggle={() =>
                setExpandedId(expandedId === champ.id ? null : champ.id)
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
