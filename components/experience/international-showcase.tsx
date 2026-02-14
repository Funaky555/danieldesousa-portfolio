"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const cities = [
  { id: "tongling", name: "Tongling", province: "Anhui" },
  { id: "chizhou", name: "Chizhou", province: "Anhui" },
  { id: "dengfeng", name: "Dengfeng", province: "Henan" },
  { id: "dalian", name: "Dalian", province: "Liaoning" },
];

export function InternationalShowcase() {
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
        </div>

        <div className="space-y-1.5">
          {cities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
            >
              <motion.div
                className="rounded-lg p-2.5 border bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-0.5 self-stretch rounded-full bg-blue-500" />
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-ai-blue flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground">
                      {city.name}, {city.province}, CN
                    </div>
                  </div>
                  <span className="text-[11px] flex-shrink-0">🇨🇳</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
