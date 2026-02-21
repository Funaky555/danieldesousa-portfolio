"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/coaching-data";
import { Award, GraduationCap, Globe } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const certKeyMap: Record<string, string> = {
  "UEFA B License": "uefaB",
  "IPDJ Football Coach Level 2": "ipdj",
  "UEFA A License": "uefaA",
};

const degreeKeyMap: Record<string, string> = {
  "Master's Degree in Sports Sciences": "masters",
  "Computer Management Equipment": "computer",
};

const exchangeKeyMap: Record<string, string> = {
  "Erasmus Exchange": "erasmus",
  "University Project (IMPAS)": "impas",
};

interface EducationTimelineProps {
  filterType?: "certs" | "academic" | "all";
}

export function EducationTimeline({ filterType = "all" }: EducationTimelineProps) {
  const t = useTranslations();

  const getStatusTranslation = (status: string) => {
    if (status === "Certified") return t("about.education.certified");
    if (status === "In Progress") return t("about.education.inProgress");
    return status;
  };

  const showCerts = filterType === "certs" || filterType === "all";
  const showAcademic = filterType === "academic" || filterType === "all";

  type TimelineItem =
    | { type: "section-header"; sectionType: "cert" | "degree" | "exchange"; label: string }
    | { type: "cert-item"; index: number; globalIdx: number }
    | { type: "degree-item"; index: number; globalIdx: number }
    | { type: "exchange-item"; index: number; globalIdx: number };

  const items: TimelineItem[] = [];
  let globalIdx = 0;

  if (showCerts && education.certifications.length > 0) {
    items.push({ type: "section-header", sectionType: "cert", label: t("about.education.certifications") });
    education.certifications.forEach((_, i) => {
      items.push({ type: "cert-item", index: i, globalIdx: globalIdx++ });
    });
  }

  if (showAcademic) {
    if (education.degrees.length > 0) {
      items.push({ type: "section-header", sectionType: "degree", label: t("about.education.academic") });
      education.degrees.forEach((_, i) => {
        items.push({ type: "degree-item", index: i, globalIdx: globalIdx++ });
      });
    }
    if (education.exchangePrograms.length > 0) {
      items.push({ type: "section-header", sectionType: "exchange", label: t("about.education.exchange") });
      education.exchangePrograms.forEach((_, i) => {
        items.push({ type: "exchange-item", index: i, globalIdx: globalIdx++ });
      });
    }
  }

  return (
    <div className="relative">
      {/* Linha vertical gradient — subtil */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-football-green via-ai-blue to-tech-purple opacity-30" />

      <div className="space-y-2">
        {items.map((item, listIdx) => {
          if (item.type === "section-header") {
            const SectionIcon = item.sectionType === "cert" ? Award : item.sectionType === "degree" ? GraduationCap : Globe;
            return (
              <div key={`header-${listIdx}`} className="relative flex items-center gap-3 pl-14 md:pl-16 py-4">
                <div className="absolute left-[10px] w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center z-10 border-2 border-background">
                  <SectionIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{item.label}</h3>
              </div>
            );
          }

          if (item.type === "cert-item") {
            const cert = education.certifications[item.index];
            const certKey = certKeyMap[cert.title] || "uefaB";
            return (
              <motion.div
                key={`cert-${item.index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.globalIdx * 0.1, duration: 0.4 }}
                className="relative flex items-start gap-4 pl-14 md:pl-16"
              >
                <div className="absolute left-[20px] top-5 w-3 h-3 rounded-full bg-border border-2 border-background z-10" />
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full glass rounded-xl p-4 md:p-5 border border-border/40 hover:border-border/70 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                        <Award className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm leading-tight">{t(`about.certs.${certKey}.title`)}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {getStatusTranslation(cert.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-11">{t(`about.certs.${certKey}.institution`)}</p>
                  <p className="text-sm text-muted-foreground mt-2 ml-11 leading-relaxed">{t(`about.certs.${certKey}.description`)}</p>
                </motion.div>
              </motion.div>
            );
          }

          if (item.type === "degree-item") {
            const degree = education.degrees[item.index];
            const degreeKey = degreeKeyMap[degree.title] || "masters";
            return (
              <motion.div
                key={`degree-${item.index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.globalIdx * 0.1, duration: 0.4 }}
                className="relative flex items-start gap-4 pl-14 md:pl-16"
              >
                <div className="absolute left-[20px] top-5 w-3 h-3 rounded-full bg-border border-2 border-background z-10" />
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full glass rounded-xl p-4 md:p-5 border border-border/40 hover:border-border/70 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm leading-tight">{t(`about.degrees.${degreeKey}.title`)}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {degree.startYear} – {degree.endYear}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-11">
                    {degree.specialization && `${t(`about.degrees.${degreeKey}.specialization`)} · `}
                    {degree.institution}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 ml-11 leading-relaxed">{t(`about.degrees.${degreeKey}.description`)}</p>
                </motion.div>
              </motion.div>
            );
          }

          if (item.type === "exchange-item") {
            const program = education.exchangePrograms[item.index];
            const exchangeKey = exchangeKeyMap[program.program] || "erasmus";
            return (
              <motion.div
                key={`exchange-${item.index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.globalIdx * 0.1, duration: 0.4 }}
                className="relative flex items-start gap-4 pl-14 md:pl-16"
              >
                <div className="absolute left-[20px] top-5 w-3 h-3 rounded-full bg-border border-2 border-background z-10" />
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full glass rounded-xl p-4 md:p-5 border border-border/40 hover:border-border/70 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm leading-tight">{t(`about.exchanges.${exchangeKey}.program`)}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {program.year}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-11">
                    {program.specialization && `${t(`about.exchanges.${exchangeKey}.specialization`)} · `}
                    {program.institution}, {program.location}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 ml-11 leading-relaxed">{t(`about.exchanges.${exchangeKey}.description`)}</p>
                </motion.div>
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
