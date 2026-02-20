"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languages } from "@/lib/coaching-data";
import {
  Users, Brain, Handshake, Target, Workflow, Ear,
  Languages as LanguagesIcon
} from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const skillKeys = [
  { key: "leadership", icon: Users },
  { key: "criticalThinking", icon: Brain },
  { key: "collaboration", icon: Handshake },
  { key: "decisionMaking", icon: Target },
  { key: "flexibility", icon: Workflow },
  { key: "activeListening", icon: Ear },
];

export function SkillsGrid() {
  const t = useTranslations();

  return (
    <div className="space-y-12">
      {/* Soft Skills */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6">{t("about.skills.title")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skillKeys.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.key}
                className="border-border/50 hover:border-primary/50 transition-all hover:scale-105"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{t(`about.skills.${skill.key}`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
          <LanguagesIcon className="w-6 h-6 mr-2 text-primary" />
          {t("about.languages.title")}
        </h3>
        <div className="space-y-4">
          {languages.map((lang) => {
            const levelKey = lang.level === "Native" ? "native" : lang.level === "Proficient" ? "proficient" : "basic";
            return (
              <div key={lang.language} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-foreground">{lang.language}</span>
                    <Badge variant="outline">{t(`about.languages.${levelKey}`)}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{lang.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-football-green via-ai-blue to-tech-purple transition-all duration-500"
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
