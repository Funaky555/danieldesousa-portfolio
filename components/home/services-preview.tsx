"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Search,
  Users,
  Target,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/coaching-data";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Search,
  Users,
  Target,
};

const cardColors = ["#0066FF", "#00D66C", "#8B5CF6", "#FF6B35"];

export function ServicesPreview() {
  const featured = services.slice(0, 4);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)" }}
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-[#0066FF]" />
            Services
            <span className="w-8 h-px bg-[#0066FF]" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#8B5CF6]">
              Offer
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional coaching services tailored to clubs, academies, and individual players.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] ?? BarChart3;
            const color = cardColors[i];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 overflow-hidden"
                style={{ transition: "box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px 0 ${color}25`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${color}0A, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>

                <h3 className="font-bold text-foreground text-base mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-[#0066FF]/40 text-[#0066FF] hover:bg-[#0066FF]/10 hover:border-[#0066FF] font-semibold rounded-xl px-8 transition-all"
          >
            <Link href="/services" className="flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
