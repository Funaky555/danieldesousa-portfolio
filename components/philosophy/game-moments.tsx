"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const gameMomentKeys = [
  "offensiveOrg",
  "defensiveOrg",
  "offensiveTrans",
  "defensiveTrans",
  "setPieces",
];

export function GameMomentsSection() {
  const t = useTranslations();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {gameMomentKeys.map((key, index) => (
        <Card
          key={key}
          className="border-border/50 hover:border-primary/50 transition-all"
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t(`philosophy.gameMomentsList.${key}`)}
              <Badge variant="outline">{index + 1}/5</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("philosophy.subtitle")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
