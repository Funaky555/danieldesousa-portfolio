import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { coachInfo, heroBadges } from "@/lib/coaching-data";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Layer 1: Stadium background with AI overlay ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 blur-sm saturate-50 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* AI gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/20 via-football-green/10 to-tech-purple/20" />
      </div>

      {/* ── Layer 2: Daniel's photo with vignette mask ── */}
      <div className="absolute inset-0 lg:left-1/4">
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 85% 95% at 55% 45%, black 25%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 95% at 55% 45%, black 25%, transparent 65%)",
          }}
        >
          <Image
            src="/images/hero/daniel-tactical.jpg"
            alt="Daniel de Sousa holding tactical board"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Layer 3: AI Glow Orbs ── */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ai-blue/15 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-football-green/20 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-tech-purple/10 blur-3xl" />

      {/* ── Layer 4: Left side gradient for text legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:w-2/3" />

      {/* ── Layer 5: Text content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center lg:w-1/2 px-6 sm:px-10 lg:px-16 py-32">
        {/* UEFA B badge */}
        <div className="inline-flex items-center gap-2 w-fit mb-6">
          <div className="flex items-center px-4 py-2 rounded-full bg-football-green/15 border border-football-green/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-football-green rounded-full mr-2 animate-pulse" />
            <span className="text-football-green text-sm font-bold tracking-wide">
              {heroBadges.certification}
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4">
          {coachInfo.name}
        </h1>

        {/* Subtitle with gradient */}
        <p className="text-xl sm:text-2xl font-semibold mb-6">
          <span className="bg-gradient-to-r from-football-green via-ai-blue to-tech-purple bg-clip-text text-transparent">
            Football Coach
          </span>
          <span className="text-muted-foreground font-normal ml-2">•</span>
          <span className="text-muted-foreground font-normal ml-2">
            Youth Development Specialist
          </span>
        </p>

        {/* Age groups row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {heroBadges.ageGroups.map((group) => (
            <span
              key={group}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/80 backdrop-blur-sm border border-border/50 text-foreground"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Location / experience tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ai-blue/10 border border-ai-blue/30 text-ai-blue backdrop-blur-sm">
            Portugal
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ai-blue/10 border border-ai-blue/30 text-ai-blue backdrop-blur-sm">
            China
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-tech-purple/10 border border-tech-purple/30 text-tech-purple backdrop-blur-sm">
            10+ Years
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="glow-border">
            <Link href="/services">
              View Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="backdrop-blur-sm">
            <Link href="/contact">
              Get in Touch
              <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Bottom stats strip (full width) ── */}
      <div className="relative z-10 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {coachInfo.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-5 glass border-t border-border/50 hover:border-primary/50 transition-all ${
                i < 3 ? "border-r border-border/50" : ""
              }`}
            >
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
