"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, Target } from "lucide-react";
import { philosophy } from "@/lib/coaching-data";

const principleIcons = [Brain, Zap, Target];
const principleColors = ["#8B5CF6", "#0066FF", "#00D66C"];
const principleDescriptions = [
  "Reading the game, making smart decisions under pressure",
  "High energy, aggressive pressing, relentless work rate",
  "Every action with a clear purpose — organized, deliberate play",
];

export function PhilosophyTeaser() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-[#8B5CF6]" />
            Philosophy
            <span className="w-8 h-px bg-[#8B5CF6]" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Way I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#0066FF]">
              Coach
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {philosophy.core}
          </p>
        </motion.div>

        {/* Three principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {philosophy.keyPrinciples.map((principle, i) => {
            const Icon = principleIcons[i];
            const color = principleColors[i];
            return (
              <motion.div
                key={principle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-8 text-center overflow-hidden"
                style={{ transition: "box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px 0 ${color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 60%)` }}
                />

                {/* Number */}
                <div
                  className="text-6xl font-black opacity-[0.06] absolute top-4 right-5 select-none"
                  style={{ color }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color }}
                >
                  {principle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principleDescriptions[i]}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] font-semibold rounded-xl px-8 transition-all"
          >
            <Link href="/philosophy" className="flex items-center gap-2">
              Explore My Philosophy <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
