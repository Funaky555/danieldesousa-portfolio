"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function CoachLabFAB() {
  const pathname = usePathname();

  if (pathname === "/coach-lab") return null;

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
      <Link
        href="/coach-lab"
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]"
        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
        title="Abrir Coach Lab"
      >
        <span className="text-base leading-none">⚽</span>
        <span className="hidden sm:inline tracking-wide">Coach Lab</span>
      </Link>
    </motion.div>
  );
}
