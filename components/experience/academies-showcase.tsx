"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const academies = [
  {
    id: "benfica",
    name: "SL Benfica",
    initial: "B",
    bar: "bg-red-500",
    bg: "bg-red-500/5",
    border: "border-red-500/20",
    borderHover: "hover:border-red-500/40",
    badge: "bg-red-600",
  },
  {
    id: "trofense",
    name: "CD Trofense",
    initial: "T",
    bar: "bg-emerald-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    borderHover: "hover:border-emerald-500/40",
    badge: "bg-emerald-600",
  },
];

export function AcademiesShowcase() {
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
        </div>

        <div className="space-y-1.5">
          {academies.map((academy, idx) => (
            <motion.div
              key={academy.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
            >
              <motion.div
                className={`rounded-lg p-2.5 border ${academy.bg} ${academy.border} ${academy.borderHover} transition-all duration-300`}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-0.5 self-stretch rounded-full ${academy.bar}`} />
                  <div
                    className={`w-6 h-6 rounded-full ${academy.badge} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {academy.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground">
                      {academy.name}
                    </div>
                  </div>
                  <span className="text-[11px] flex-shrink-0">🇵🇹</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
