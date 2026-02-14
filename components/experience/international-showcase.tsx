"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Briefcase, Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

interface CityExperience {
  id: string;
  nameKey: string;
  roleKey: string;
  descKey: string;
  periodKey: string;
  province: string;
}

const cities: CityExperience[] = [
  {
    id: "tongling",
    nameKey: "experience.international.tongling",
    roleKey: "experience.international.tonglingRole",
    descKey: "experience.international.tonglingDesc",
    periodKey: "experience.international.tonglingPeriod",
    province: "Anhui",
  },
  {
    id: "chizhou",
    nameKey: "experience.international.chizhou",
    roleKey: "experience.international.chizhouRole",
    descKey: "experience.international.chizhouDesc",
    periodKey: "experience.international.chizhouPeriod",
    province: "Anhui",
  },
  {
    id: "dengfeng",
    nameKey: "experience.international.dengfeng",
    roleKey: "experience.international.dengfengRole",
    descKey: "experience.international.dengfengDesc",
    periodKey: "experience.international.dengfengPeriod",
    province: "Henan",
  },
  {
    id: "dalian",
    nameKey: "experience.international.dalian",
    roleKey: "experience.international.dalianRole",
    descKey: "experience.international.dalianDesc",
    periodKey: "experience.international.dalianPeriod",
    province: "Liaoning",
  },
];

function CityBadge({
  city,
  index,
  isExpanded,
  onToggle,
}: {
  city: CityExperience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations();

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
            ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_25px_rgba(0,102,255,0.2)]"
            : "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40"
        }`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-0.5 self-stretch rounded-full bg-blue-500" />
          <MapPin className="w-4 h-4 text-blue-600 dark:text-ai-blue flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-foreground truncate">
              {t(city.nameKey)}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {city.province}
            </div>
          </div>
          <span className="text-[11px] flex-shrink-0">🇨🇳</span>
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
            <div className="mt-1.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {t(city.periodKey)}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-ai-blue font-medium">
                  <Briefcase className="w-3 h-3 flex-shrink-0" />
                  {t(city.roleKey)}
                </div>
                <div className="text-[11px] text-muted-foreground/80">
                  {t(city.descKey)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function InternationalShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = useTranslations();

  return (
    <Card className="border-border/50 glass hover:border-blue-500/50 transition-all">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600/10 dark:bg-ai-blue/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600 dark:text-ai-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">
              {t("experience.highlights.international")}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              4+ {t("experience.highlights.yearsInChina")}
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] h-5 text-blue-600 dark:text-ai-blue border-blue-500/30"
          >
            {cities.length} {t("experience.highlights.cities")}
          </Badge>
        </div>

        <div className="space-y-1.5">
          {cities.map((city, idx) => (
            <CityBadge
              key={city.id}
              city={city}
              index={idx}
              isExpanded={expandedId === city.id}
              onToggle={() =>
                setExpandedId(expandedId === city.id ? null : city.id)
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
