"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PlayerDotProps {
  x: number;
  y: number;
  position: string;
  number: number;
  name: string;
  index: number;
}

export function PlayerDot({
  x,
  y,
  position,
  number,
  name,
  index,
}: PlayerDotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      layoutId={`player-${index}`}
      className="absolute z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      whileHover={{ scale: 1.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)}
      role="button"
      aria-label={`${position} - ${name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowTooltip((prev) => !prev);
        }
      }}
    >
      {/* Player circle */}
      <div className="w-7 h-7 sm:w-8 sm:h-8 -ml-3.5 -mt-3.5 sm:-ml-4 sm:-mt-4 rounded-full bg-ai-blue border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-lg cursor-pointer select-none">
        {number}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          className="absolute left-1/2 -translate-x-1/2 -top-12 glass rounded-md px-2.5 py-1.5 whitespace-nowrap z-20 pointer-events-none border border-ai-blue/30"
        >
          <p className="text-xs font-bold text-ai-blue">{position}</p>
          <p className="text-[10px] text-muted-foreground">{name}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
