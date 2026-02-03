import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { coachInfo } from "@/lib/coaching-data";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-football opacity-20 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-subtle" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-football-green rounded-full mr-2 animate-pulse" />
            Available for Consultations
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {coachInfo.name}
          </h1>

          {/* Tagline with gradient */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-football-green via-ai-blue to-tech-purple bg-clip-text text-transparent">
              {coachInfo.tagline}
            </span>
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Passionate about developing young talent through modern coaching methodology,
            tactical intelligence, and cultural adaptability. Specialized in youth development
            from grassroots to elite level.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

          {/* Quick Contact Links */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href={`mailto:${coachInfo.contact.email}`}
              className="flex items-center hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              {coachInfo.contact.email}
            </a>
            <span className="hidden sm:block">•</span>
            <a
              href={coachInfo.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp: {coachInfo.contact.whatsapp}
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {coachInfo.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 glass rounded-lg border border-border/50 hover:border-primary/50 transition-all"
            >
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
}
