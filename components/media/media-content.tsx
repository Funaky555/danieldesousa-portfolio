"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/providers/i18n-provider";
import { mediaContent } from "@/lib/coaching-data";
import type { MediaArticle, PodcastEpisode, PressAppearance } from "@/lib/coaching-data";
import {
  FileText,
  Mic,
  Newspaper,
  Trophy,
  ExternalLink,
  Clock,
  Calendar,
  Radio,
  Tv,
  Play,
  Mail,
} from "lucide-react";

// ─── Color map (same pattern as about-content.tsx / philosophy-content.tsx) ──

const tabColorMap = {
  "football-green": {
    iconBg: "bg-football-green/20",
    iconText: "text-football-green",
    inactiveText: "text-football-green/60",
    inactiveBorder: "border-football-green/20",
    inactiveBg: "bg-football-green/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,214,108,0.1)]",
    activeBg:
      "data-[state=active]:bg-football-green/20 data-[state=active]:border-football-green/50 data-[state=active]:text-football-green data-[state=active]:shadow-[0_0_30px_rgba(0,214,108,0.2)]",
    barFrom: "from-football-green",
    accent: "rgba(0,214,108,0.15)",
    hex: "#00D66C",
  },
  "tech-purple": {
    iconBg: "bg-tech-purple/20",
    iconText: "text-tech-purple",
    inactiveText: "text-tech-purple/60",
    inactiveBorder: "border-tech-purple/20",
    inactiveBg: "bg-tech-purple/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    activeBg:
      "data-[state=active]:bg-tech-purple/20 data-[state=active]:border-tech-purple/50 data-[state=active]:text-tech-purple data-[state=active]:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    barFrom: "from-tech-purple",
    accent: "rgba(139,92,246,0.15)",
    hex: "#8B5CF6",
  },
  "ai-blue": {
    iconBg: "bg-ai-blue/20",
    iconText: "text-ai-blue",
    inactiveText: "text-ai-blue/60",
    inactiveBorder: "border-ai-blue/20",
    inactiveBg: "bg-ai-blue/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,102,255,0.1)]",
    activeBg:
      "data-[state=active]:bg-ai-blue/20 data-[state=active]:border-ai-blue/50 data-[state=active]:text-ai-blue data-[state=active]:shadow-[0_0_30px_rgba(0,102,255,0.2)]",
    barFrom: "from-ai-blue",
    accent: "rgba(0,102,255,0.15)",
    hex: "#0066FF",
  },
  "energy-orange": {
    iconBg: "bg-energy-orange/20",
    iconText: "text-energy-orange",
    inactiveText: "text-energy-orange/60",
    inactiveBorder: "border-energy-orange/20",
    inactiveBg: "bg-energy-orange/5",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]",
    activeBg:
      "data-[state=active]:bg-energy-orange/20 data-[state=active]:border-energy-orange/50 data-[state=active]:text-energy-orange data-[state=active]:shadow-[0_0_30px_rgba(255,107,53,0.2)]",
    barFrom: "from-energy-orange",
    accent: "rgba(255,107,53,0.15)",
    hex: "#FF6B35",
  },
} as const;

const mediaTabs = [
  { key: "articles", icon: FileText, color: "football-green" as const },
  { key: "podcast",  icon: Mic,      color: "tech-purple" as const  },
  { key: "press",    icon: Newspaper, color: "ai-blue" as const     },
  { key: "sports",   icon: Trophy,   color: "energy-orange" as const },
] as const;

// ─── TiltCard ───────────────────────────────────────────────────────────────

function TiltCard({
  children,
  glowColor,
  className,
}: {
  children: React.ReactNode;
  glowColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "", glowBg: "" });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      glowBg: `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => setTiltStyle({ transform: "", glowBg: "" });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform: tiltStyle.transform }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: tiltStyle.glowBg }}
      />
      {children}
    </div>
  );
}

// ─── Article Card ────────────────────────────────────────────────────────────

const articleTypeColors: Record<string, string> = {
  opinion:     "bg-football-green/15 text-football-green border-football-green/25",
  analysis:    "bg-ai-blue/15 text-ai-blue border-ai-blue/25",
  tactics:     "bg-tech-purple/15 text-tech-purple border-tech-purple/25",
  development: "bg-energy-orange/15 text-energy-orange border-energy-orange/25",
};

const articleTopBars: Record<string, string> = {
  opinion:     "bg-football-green",
  analysis:    "bg-ai-blue",
  tactics:     "bg-tech-purple",
  development: "bg-energy-orange",
};

function ArticleCard({ article }: { article: MediaArticle }) {
  const t = useTranslations();
  const typeLabel = t(`media.article.${article.type}`);
  const barColor = articleTopBars[article.type] ?? "bg-muted";
  const badgeColor = articleTypeColors[article.type] ?? "bg-muted/20 text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group h-full"
    >
      <TiltCard glowColor="rgba(0,214,108,0.1)" className="relative h-full">
        <div className="glass rounded-xl border border-border/40 hover:border-border/70 transition-all duration-300 overflow-hidden flex flex-col h-full">
          {/* Top color bar */}
          <div className={`h-1 w-full ${barColor} opacity-70`} />
          <div className="p-5 flex flex-col flex-1">
            {/* Type badge + date */}
            <div className="flex items-center justify-between mb-3">
              <Badge className={`text-xs border ${badgeColor}`}>{typeLabel}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
            {/* Title */}
            <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">
              {article.title}
            </h3>
            {/* Excerpt */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
              {article.excerpt}
            </p>
            {/* Tags + read time */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {article.readTime} {t("media.article.readTime")}
              </span>
            </div>
            {/* Link */}
            {article.url !== "#" && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1 text-xs text-football-green hover:text-football-green/80 transition-colors"
              >
                {t("media.article.readMore")}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Podcast Card ────────────────────────────────────────────────────────────

function PodcastCard({ episode }: { episode: PodcastEpisode }) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      <TiltCard glowColor="rgba(139,92,246,0.12)" className="relative">
        <div className="glass rounded-xl border border-border/40 hover:border-tech-purple/30 transition-all duration-300 overflow-hidden">
          {/* Play visual header */}
          <div className="relative bg-tech-purple/10 px-5 pt-5 pb-4 border-b border-border/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tech-purple/20 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 text-tech-purple ml-0.5" />
              </div>
              <div>
                <p className="text-xs text-tech-purple/70 font-medium uppercase tracking-wide">
                  {t("media.podcast.episode")} {episode.episodeNumber}
                </p>
                <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 mt-0.5">
                  {episode.title}
                </h3>
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {episode.description}
            </p>
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {episode.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {episode.date}
              </span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {episode.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            {/* Platforms */}
            {episode.platforms.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">{t("media.podcast.platforms")}:</p>
                <div className="flex flex-wrap gap-2">
                  {episode.platforms.map((p) => (
                    p.url !== "#" ? (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1 rounded-full bg-tech-purple/15 text-tech-purple border border-tech-purple/25 hover:bg-tech-purple/25 transition-colors flex items-center gap-1"
                      >
                        {p.name}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span
                        key={p.name}
                        className="text-xs px-3 py-1 rounded-full bg-muted/40 text-muted-foreground border border-border/30"
                      >
                        {p.name}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Press Card ──────────────────────────────────────────────────────────────

const pressTypeIcons: Record<string, React.ElementType> = {
  newspaper:  Newspaper,
  television: Tv,
  online:     ExternalLink,
  radio:      Radio,
};

const pressTypeColors: Record<string, string> = {
  newspaper:  "bg-ai-blue/15 text-ai-blue border-ai-blue/25",
  television: "bg-energy-orange/15 text-energy-orange border-energy-orange/25",
  online:     "bg-football-green/15 text-football-green border-football-green/25",
  radio:      "bg-tech-purple/15 text-tech-purple border-tech-purple/25",
};

function PressCard({ appearance }: { appearance: PressAppearance }) {
  const t = useTranslations();
  const TypeIcon = pressTypeIcons[appearance.type] ?? ExternalLink;
  const typeLabel = t(`media.press.${appearance.type}`);
  const badgeColor = pressTypeColors[appearance.type] ?? "bg-muted/20 text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      <TiltCard glowColor="rgba(0,102,255,0.1)" className="relative">
        <div className="glass rounded-xl border border-border/40 hover:border-ai-blue/30 transition-all duration-300 p-5">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-ai-blue/15 flex items-center justify-center shrink-0">
              <TypeIcon className="w-5 h-5 text-ai-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-semibold text-foreground">{appearance.outlet}</span>
                <Badge className={`text-xs border ${badgeColor}`}>{typeLabel}</Badge>
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                {appearance.title}
              </h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
            {appearance.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {appearance.date}
            </span>
            {appearance.url !== "#" && (
              <a
                href={appearance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ai-blue hover:text-ai-blue/80 flex items-center gap-1 transition-colors"
              >
                {t("media.press.readArticle")}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function MediaContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header animado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("media.title")}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground leading-relaxed mb-6">
            {t("media.subtitle")}
          </p>
          {/* Category badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {(["football", "sports", "podcast", "press"] as const).map((badge, i) => {
              const colors = [
                "bg-football-green/15 text-football-green border-football-green/30",
                "bg-energy-orange/15 text-energy-orange border-energy-orange/30",
                "bg-tech-purple/15 text-tech-purple border-tech-purple/30",
                "bg-ai-blue/15 text-ai-blue border-ai-blue/30",
              ];
              return (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`text-xs px-3 py-1 rounded-full border ${colors[i]}`}
                >
                  {t(`media.badges.${badge}`)}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {mediaTabs.map(({ key, icon: Icon, color }) => {
                  const tc = tabColorMap[color];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`glass flex items-center gap-2 px-3 sm:px-4 py-2.5 border rounded-lg transition-all duration-300 ${tc.inactiveBorder} ${tc.inactiveBg} ${tc.inactiveText} ${tc.hoverGlow} hover:border-opacity-50 ${tc.activeBg}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline text-sm font-medium">
                        {t(`media.tabs.${key}`)}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {mediaTabs.map(({ key, icon: Icon, color }) => {
                const tc = tabColorMap[color];
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="glass rounded-xl border border-border/50 overflow-hidden">
                      {/* Colored header */}
                      <div className={`flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border/40 ${tc.inactiveBg}`}>
                        <div className={`w-9 h-9 rounded-lg ${tc.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${tc.iconText}`} />
                        </div>
                        <h2 className={`font-semibold text-base ${tc.iconText}`}>
                          {t(`media.tabs.${key}`)}
                        </h2>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 md:p-8">
                        {key === "articles" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaContent.featuredArticles.map((article) => (
                              <ArticleCard key={article.id} article={article} />
                            ))}
                          </div>
                        )}

                        {key === "podcast" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaContent.podcastEpisodes.map((episode) => (
                              <PodcastCard key={episode.id} episode={episode} />
                            ))}
                          </div>
                        )}

                        {key === "press" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mediaContent.pressAppearances.map((appearance) => (
                              <PressCard key={appearance.id} appearance={appearance} />
                            ))}
                          </div>
                        )}

                        {key === "sports" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mediaContent.otherSportsArticles.map((article) => (
                              <ArticleCard key={article.id} article={article} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl overflow-hidden border border-border/40"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(0,214,108,0.15) 100%)",
            }}
          >
            <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {t("media.cta.title")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                {t("media.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-football-green hover:bg-football-green/90 text-black font-semibold rounded-xl"
                >
                  <a href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    {t("media.cta.contact")}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-tech-purple/40 text-tech-purple hover:bg-tech-purple/10 rounded-xl"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {t("media.cta.podcast")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
