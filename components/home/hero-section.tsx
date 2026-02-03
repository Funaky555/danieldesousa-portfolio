import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { coachInfo, heroBadges } from "@/lib/coaching-data";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Right side: stadium / pitch photo with AI glow effects ── */}
      <div className="absolute inset-0 lg:inset-y-0 lg:left-1/2 lg:w-1/2">
        {/* Base photo — placeholder Unsplash stadium (replace with Daniel's photo) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540975646-4295a3bbff41?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark vignette so text on the left stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        {/* AI glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-ai-blue opacity-10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-football-green opacity-15 blur-3xl" />
        <div className="absolute top-1/2 right-1/6 w-56 h-56 rounded-full bg-tech-purple opacity-10 blur-3xl" />
      </div>

      {/* ── Left side: text content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center lg:w-1/2 px-6 sm:px-10 lg:px-16 py-32">
        {/* UEFA B badge — prominent vertical-ish pill */}
        <div className="inline-flex items-center gap-2 w-fit mb-6">
          <div className="flex items-center px-4 py-2 rounded-full bg-football-green/15 border border-football-green/30">
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
          <span className="text-muted-foreground font-normal ml-2">Youth Development Specialist</span>
        </p>

        {/* Age groups row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {heroBadges.ageGroups.map((group) => (
            <span
              key={group}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary border border-border/50 text-foreground"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Location / experience tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ai-blue/10 border border-ai-blue/30 text-ai-blue">
            Portugal
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ai-blue/10 border border-ai-blue/30 text-ai-blue">
            China
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-tech-purple/10 border border-tech-purple/30 text-tech-purple">
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
          <Button asChild size="lg" variant="outline">
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
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
