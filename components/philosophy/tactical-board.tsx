"use client";

import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { formations } from "@/lib/coaching-data";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";
import { PitchSVG } from "./pitch-svg";
import { PlayerDot } from "./player-dot";
import { FormationSelector } from "./formation-selector";

const formationKeyMap: Record<string, string> = {
  "1-4-3-3": "433",
  "1-4-4-2": "442",
  "1-4-2-3-1": "4231",
};

export function TacticalBoard() {
  const t = useTranslations();
  const tList = useTranslationList();
  const [activeIndex, setActiveIndex] = useState(0);

  const formation = formations[activeIndex];
  const formationKey = formationKeyMap[formation.name] || "433";

  return (
    <LayoutGroup>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pitch area */}
        <div className="flex-1 space-y-4">
          <FormationSelector
            formations={formations.map((f) => f.name)}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          <div className="relative aspect-[3/4.4] max-w-md mx-auto rounded-lg overflow-hidden border border-border/50">
            <PitchSVG />

            {/* Players overlay */}
            <div className="absolute inset-0">
              {formation.positions.map((pos, idx) => (
                <PlayerDot
                  key={idx}
                  index={idx}
                  x={pos.x}
                  y={pos.y}
                  position={pos.position}
                  number={pos.number}
                  name={pos.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:w-72 space-y-4">
          <div className="glass rounded-lg p-6 border border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-2">
              {formation.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t(`philosophy.formationDescriptions.${formationKey}`)}
            </p>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground">
                {t("philosophy.principles")}:
              </p>
              <div className="space-y-2">
                {tList(`philosophy.formationStrengths.${formationKey}`).map(
                  (strength, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-ai-blue" />
                      <p className="text-sm text-foreground/80">{strength}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}
