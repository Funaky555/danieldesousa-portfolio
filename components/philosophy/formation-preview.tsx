"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formations } from "@/lib/coaching-data";
import { useTranslations } from "@/components/providers/i18n-provider";

// Map formation names to translation keys
const formationKeyMap: Record<string, string> = {
  "1-4-3-3": "433",
  "1-4-4-2": "442",
  "1-4-2-3-1": "4231",
};

export function FormationPreview() {
  const t = useTranslations();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {formations.map((formation) => {
        const formationKey = formationKeyMap[formation.name] || "433";
        return (
          <Card
            key={formation.name}
            className="border-border/50 hover:border-primary/50 transition-all hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="text-xl">{formation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mini Football Pitch Visualization */}
              <div className="aspect-[3/4] bg-football-green/5 rounded-lg border border-border/50 mb-4 relative overflow-hidden">
                {/* Field markings */}
                <div className="absolute inset-0">
                  {/* Center line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-muted-foreground/20" />
                  {/* Center circle */}
                  <div className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full border border-muted-foreground/20" />

                  {/* Player positions */}
                  {formation.positions.map((pos, idx) => (
                    <div
                      key={idx}
                      className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-ai-blue border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                      }}
                    >
                      {pos.number}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {t(`philosophy.formationDescriptions.${formationKey}`)}
              </p>

              <div>
                <p className="text-xs font-semibold text-foreground mb-2">{t("philosophy.principles")}:</p>
                <div className="flex flex-wrap gap-1">
                  {formation.strengths.slice(0, 2).map((strength, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
