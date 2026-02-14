"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

interface Academy {
  id: string;
  nameKey: string;
  roleKey: string;
  descKey: string;
  periodKey: string;
  initial: string;
  color: {
    bg: string;
    bgActive: string;
    border: string;
    borderActive: string;
    bar: string;
    glow: string;
    badge: string;
    text: string;
  };
}

const academies: Academy[] = [
  {
    id: "benfica",
    nameKey: "experience.academies.benfica",
    roleKey: "experience.academies.benficaRole",
    descKey: "experience.academies.benficaDesc",
    periodKey: "experience.academies.benficaPeriod",
    initial: "B",
    color: {
      bg: "bg-red-500/5",
      bgActive: "bg-red-500/10",
      border: "border-red-500/20",
      borderActive: "border-red-500/40",
      bar: "bg-red-500",
      glow: "shadow-[0_0_25px_rgba(239,68,68,0.2)]",
      badge: "bg-red-600",
      text: "text-red-500",
    },
  },
  {
    id: "trofense",
    nameKey: "experience.academies.trofense",
    roleKey: "experience.academies.trofenseRole",
    descKey: "experience.academies.trofenseDesc",
    periodKey: "experience.academies.trofensePeriod",
    initial: "T",
    color: {
      bg: "bg-emerald-500/5",
      bgActive: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      borderActive: "border-emerald-500/40",
      bar: "bg-emerald-500",
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.2)]",
      badge: "bg-emerald-600",
      text: "text-emerald-500",
    },
  },
];

function AcademyBadge({
  academy,
  index,
  isExpanded,
  onToggle,
}: {
  academy: Academy;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations();
  const c = academy.color;

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
            ? `${c.bgActive} ${c.borderActive} ${c.glow}`
            : `${c.bg} ${c.border} hover:${c.borderActive}`
        }`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-0.5 self-stretch rounded-full ${c.bar}`} />
          <div
            className={`w-6 h-6 rounded-full ${c.badge} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
          >
            {academy.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-foreground truncate">
              {t(academy.nameKey)}
            </div>
            <div className="text-[10px] text-muted-foreground truncate">
              {t(academy.roleKey)}
            </div>
          </div>
          <span className="text-[11px] flex-shrink-0">🇵🇹</span>
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
            <div className={`mt-1.5 p-3 rounded-lg ${c.bg} border ${c.border}`}>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {t(academy.periodKey)}
                </div>
                <div className={`flex items-center gap-1.5 text-[11px] ${c.text} font-medium`}>
                  <Briefcase className="w-3 h-3 flex-shrink-0" />
                  {t(academy.roleKey)}
                </div>
                <div className="text-[11px] text-muted-foreground/80">
                  {t(academy.descKey)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AcademiesShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = useTranslations();

  return (
    <Card className="border-border/50 glass hover:border-purple-500/50 transition-all">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-600/10 dark:bg-tech-purple/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600 dark:text-tech-purple" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">
              {t("experience.highlights.eliteAcademies")}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {t("experience.highlights.youthDevelopment")}
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] h-5 text-purple-600 dark:text-tech-purple border-purple-500/30"
          >
            {academies.length}
          </Badge>
        </div>

        <div className="space-y-1.5">
          {academies.map((academy, idx) => (
            <AcademyBadge
              key={academy.id}
              academy={academy}
              index={idx}
              isExpanded={expandedId === academy.id}
              onToggle={() =>
                setExpandedId(expandedId === academy.id ? null : academy.id)
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
