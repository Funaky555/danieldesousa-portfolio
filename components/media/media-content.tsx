"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "@/components/providers/i18n-provider";
import { mediaContent } from "@/lib/coaching-data";
import type { MediaArticle, PressAppearance, RecommendedChannel } from "@/lib/coaching-data";
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
  PlayCircle,
  Mail,
  HardHat,
  Maximize2,
} from "lucide-react";

// ─── Color map ───────────────────────────────────────────────────────────────

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
    accent: "rgba(0,214,108,0.15)",
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
    accent: "rgba(139,92,246,0.15)",
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
    accent: "rgba(0,102,255,0.15)",
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
    accent: "rgba(255,107,53,0.15)",
  },
} as const;

const mediaTabs = [
  { key: "articles", icon: FileText, color: "football-green" as const, label: "Football Articles" },
  { key: "podcast",  icon: Mic,      color: "tech-purple" as const,    label: "Podcast"           },
  { key: "press",    icon: Newspaper, color: "ai-blue" as const,       label: "Football News"     },
  { key: "sports",   icon: Trophy,   color: "energy-orange" as const,  label: "Sports News"       },
] as const;

// ─── TiltCard ────────────────────────────────────────────────────────────────

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

// ─── Under Construction ───────────────────────────────────────────────────────

function UnderConstructionSection() {
  const t = useTranslations();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center gap-5"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-football-green/10 border border-football-green/20 flex items-center justify-center mx-auto">
          <HardHat className="w-10 h-10 text-football-green/70" />
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -top-2 -right-2 text-2xl"
        >
          🚧
        </motion.div>
      </div>
      <h3 className="text-xl font-bold text-foreground">
        {t("media.underConstruction.title")}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
        {t("media.underConstruction.subtitle")}
      </p>
    </motion.div>
  );
}

// ─── YouTube Embed ────────────────────────────────────────────────────────────

const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share";

function YoutubeEmbed({ videoId, channelUrl }: { videoId: string; channelUrl: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="glass rounded-xl border border-tech-purple/30 overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title="The Coaches Voice — Vídeo mais recente"
              allow={ALLOW}
              allowFullScreen
            />
          </div>
          <div className="px-5 py-3 flex items-center justify-between border-t border-border/30">
            <span className="text-xs text-muted-foreground">The Coaches Voice — latest video</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-1.5 text-xs text-tech-purple hover:text-tech-purple/80 font-medium transition-colors"
                title="Expand video"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </button>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-tech-purple hover:text-tech-purple/80 font-medium transition-colors"
              >
                More videos
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded modal */}
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="max-w-4xl w-full p-0 bg-background border border-tech-purple/30 overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
              title="The Coaches Voice — Expanded"
              allow={ALLOW}
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Channel Card (Podcast) ───────────────────────────────────────────────────

function ChannelCard({ channel }: { channel: RecommendedChannel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group max-w-sm mx-auto"
    >
      <TiltCard glowColor="rgba(139,92,246,0.15)" className="relative">
        <div className="glass rounded-xl border border-tech-purple/30 hover:border-tech-purple/50 transition-all duration-300 overflow-hidden">
          <div className="bg-tech-purple/10 px-6 py-5 flex items-center gap-4 border-b border-border/30">
            <div className="w-12 h-12 rounded-xl bg-tech-purple/20 flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6 text-tech-purple" />
            </div>
            <div>
              <p className="text-xs text-tech-purple/70 font-medium uppercase tracking-wide mb-0.5">YouTube</p>
              <h3 className="font-bold text-foreground text-base">{channel.name}</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {channel.description}
            </p>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tech-purple/20 text-tech-purple border border-tech-purple/30 text-sm font-medium hover:bg-tech-purple/30 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Watch on YouTube
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Podcast Coming Soon ──────────────────────────────────────────────────────

function PodcastSection({ latestVideoId }: { latestVideoId?: string }) {
  const t = useTranslations();
  const coachesVoice = mediaContent.recommendedChannels.find((c) => c.platform === "youtube");

  return (
    <div className="flex flex-col gap-8">
      {/* Vídeo mais recente do Coaches Voice */}
      {latestVideoId && coachesVoice ? (
        <YoutubeEmbed videoId={latestVideoId} channelUrl={coachesVoice.url} />
      ) : (
        <>
          {/* Banner em grande (fallback quando não há vídeo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[280px] flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/backgrounds/green.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/80" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-tech-purple/10 blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-5 py-12 text-center px-6">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-tech-purple/25 border-2 border-tech-purple/50 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              >
                <Mic className="w-12 h-12 text-tech-purple" />
              </motion.div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {t("media.podcast.comingSoon")}
              </p>
            </div>
          </motion.div>
          {/* Canal recomendado (fallback) */}
          <p className="text-center text-sm text-muted-foreground -mb-2">
            {t("media.podcast.channelCta")}
          </p>
          {mediaContent.recommendedChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

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
          <div className={`h-1 w-full ${barColor} opacity-70`} />
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <Badge className={`text-xs border ${badgeColor}`}>{typeLabel}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
              {article.excerpt}
            </p>
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

// ─── Press Card ───────────────────────────────────────────────────────────────

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
      className="relative group h-full"
    >
      <TiltCard glowColor="rgba(0,102,255,0.1)" className="relative h-full">
        <div className="glass rounded-xl border border-border/40 hover:border-ai-blue/30 transition-all duration-300 overflow-hidden flex flex-col h-full">

          {/* Image banner — shown when image is provided */}
          {appearance.image && (
            <a
              href={appearance.url !== "#" ? appearance.url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-44 overflow-hidden shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={appearance.image}
                alt={appearance.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </a>
          )}

          {/* Card body */}
          <div className="p-5 flex flex-col flex-1">
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
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3 flex-1">
              {appearance.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
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
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MediaContent({ latestVideoId }: { latestVideoId?: string }) {
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
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
                {mediaTabs.map(({ key, icon: Icon, color, label }) => {
                  const tc = tabColorMap[color];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={`glass flex flex-col items-center justify-center gap-1.5 px-4 py-2.5 border rounded-lg transition-all duration-300 ${tc.inactiveBorder} ${tc.inactiveBg} ${tc.inactiveText} ${tc.hoverGlow} ${tc.activeBg}`}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wide leading-none">{label}</span>
                      <Icon className="w-5 h-5" />
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Articles / Football */}
              <TabsContent value="articles" className="mt-0">
                <div className="glass rounded-xl border border-border/50 p-4 sm:p-6 md:p-8">
                  <UnderConstructionSection />
                </div>
              </TabsContent>

              {/* Podcast */}
              <TabsContent value="podcast" className="mt-0">
                <div className="glass rounded-xl border border-border/50 p-4 sm:p-6 md:p-8">
                  <PodcastSection latestVideoId={latestVideoId} />
                </div>
              </TabsContent>

              {/* Press */}
              <TabsContent value="press" className="mt-0">
                <div className="glass rounded-xl border border-border/50 p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mediaContent.pressAppearances.map((appearance) => (
                      <PressCard key={appearance.id} appearance={appearance} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Other Sports */}
              <TabsContent value="sports" className="mt-0">
                <div className="glass rounded-xl border border-border/50 p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mediaContent.otherSportsArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              </TabsContent>
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
                  asChild
                >
                  <a href="https://www.youtube.com/@TheCoachesVoice" target="_blank" rel="noopener noreferrer">
                    <Mic className="w-4 h-4 mr-2" />
                    {t("media.cta.podcast")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
