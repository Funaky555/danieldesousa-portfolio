"use client";

import { motion } from "framer-motion";

const COACHLAB_URL = "https://coachlab-six.vercel.app";

export function CoachLabFAB() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.5 }}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50"
    >
      {/* Pulsing glow */}
      <div
        className="absolute -inset-0.5 rounded-full opacity-40 blur-sm animate-pulse"
        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
      />
      <a
        href={COACHLAB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]"
        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
        title="Abrir Coach Lab"
      >
        <span className="text-base leading-none">⚽</span>
        <span className="hidden sm:inline tracking-wide">Coach Lab</span>
      </a>
    </motion.div>
  );
}
