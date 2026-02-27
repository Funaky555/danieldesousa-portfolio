"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Users, Award, ArrowRight } from "lucide-react";
import { coachInfo } from "@/lib/coaching-data";

const stats = [
  { value: "10+", label: "Years Experience", icon: Calendar, color: "#0066FF" },
  { value: "2", label: "Countries", icon: Globe, color: "#00D66C" },
  { value: "U4–U18", label: "Age Groups", icon: Users, color: "#8B5CF6" },
  { value: "UEFA B", label: "Certification", icon: Award, color: "#FF6B35" },
];

export function AboutPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,214,108,0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00D66C] mb-4 tracking-widest uppercase">
              <span className="w-8 h-px bg-[#00D66C]" />
              About
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
              Shaping Players,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D66C] to-[#0066FF]">
                Building Champions
              </span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {coachInfo.bio}
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-[#00D66C] to-[#0066FF] hover:opacity-90 text-white border-0 font-semibold rounded-xl px-6 py-2.5 shadow-lg shadow-[#00D66C]/25 transition-all hover:scale-[1.03]"
            >
              <Link href="/about" className="flex items-center gap-2">
                My Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative group rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 0 ${stat.color}00`,
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px 0 ${stat.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${stat.color}00`;
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top left, ${stat.color}08, transparent 60%)` }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
