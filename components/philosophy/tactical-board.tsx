"use client";

import { useRef, useState, useCallback } from "react";
import { LayoutGroup } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formations } from "@/lib/coaching-data";
import { useTranslations, useTranslationList } from "@/components/providers/i18n-provider";
import { RotateCcw, Move } from "lucide-react";
import { PitchSVG } from "./pitch-svg";
import { PlayerDot } from "./player-dot";
import { FormationSelector } from "./formation-selector";

const formationKeyMap: Record<string, string> = {
  "1-4-3-3": "433",
  "1-4-4-2": "442",
  "1-4-2-3-1": "4231",
};

interface Position {
  x: number;
  y: number;
  position: string;
  number: number;
  name: string;
}

export function TacticalBoard() {
  const t = useTranslations();
  const tList = useTranslationList();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [customPositions, setCustomPositions] = useState<Position[] | null>(null);

  const formation = formations[activeIndex];
  const formationKey = formationKeyMap[formation.name] || "433";
  const positions = customPositions ?? formation.positions;
  const hasCustomPositions = customPositions !== null;

  const handleFormationChange = useCallback((index: number) => {
    setActiveIndex(index);
    setCustomPositions(null);
  }, []);

  const handleDragEnd = useCallback(
    (index: number, newX: number, newY: number) => {
      const base = customPositions ?? [...formation.positions];
      const updated = base.map((pos, i) =>
        i === index ? { ...pos, x: newX, y: newY } : pos
      );
      setCustomPositions(updated);
    },
    [customPositions, formation.positions]
  );

  const handleReset = useCallback(() => {
    setCustomPositions(null);
  }, []);

  return (
    <LayoutGroup>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pitch area */}
        <div className="flex-1 space-y-4">
          <FormationSelector
            formations={formations.map((f) => f.name)}
            activeIndex={activeIndex}
            onSelect={handleFormationChange}
          />

          <div
            ref={containerRef}
            className="relative aspect-[3/4.4] max-w-md mx-auto rounded-lg overflow-hidden border border-border/50"
          >
            <PitchSVG />

            {/* Players overlay */}
            <div className="absolute inset-0">
              {positions.map((pos, idx) => (
                <PlayerDot
                  key={idx}
                  index={idx}
                  x={pos.x}
                  y={pos.y}
                  position={pos.position}
                  number={pos.number}
                  name={pos.name}
                  containerRef={containerRef}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>

            {/* Drag hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 glass rounded-full px-3 py-1 opacity-60">
              <Move className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                {t("philosophy.tacticalBoard.dragHint")}
              </span>
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
              <div className="flex flex-wrap gap-1.5">
                {tList(`philosophy.formationStrengths.${formationKey}`).map(
                  (strength, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {strength}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          {hasCustomPositions && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t("philosophy.tacticalBoard.reset")}
            </Button>
          )}
        </div>
      </div>
    </LayoutGroup>
  );
}
