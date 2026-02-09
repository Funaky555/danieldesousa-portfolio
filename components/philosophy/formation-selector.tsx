"use client";

import { motion } from "framer-motion";

interface FormationSelectorProps {
  formations: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function FormationSelector({ formations, activeIndex, onSelect }: FormationSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {formations.map((name, idx) => (
        <button
          key={name}
          onClick={() => onSelect(idx)}
          className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-200 ${
            idx === activeIndex
              ? "text-football-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {name}
          {idx === activeIndex && (
            <motion.div
              layoutId="formation-indicator"
              className="absolute inset-0 rounded-lg border border-football-green/50 bg-football-green/10"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
