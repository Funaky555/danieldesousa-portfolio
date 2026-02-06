"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { experience } from "@/lib/coaching-data";
import { MapPin, Calendar, Trophy, Building, GraduationCap, Clock, Newspaper, ExternalLink, X } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

// Icon mapping for sections
const iconMap: Record<string, React.ElementType> = {
  Building: Building,
  Trophy: Trophy,
  GraduationCap: GraduationCap,
};

// Map job IDs to translation keys
const jobKeyMap: Record<number, string> = {
  1: "tongling",
  2: "chizhou",
  3: "tonglingCity",
  4: "tagou",
  5: "dalian",
  6: "benfica",
  7: "trofense",
  8: "lavrense",
};

interface ExperienceSection {
  title: string;
  icon: string;
  items: string[];
}

interface ExperienceMedia {
  interviewLink?: string;
  interviewTitle?: string;
  schoolLogo?: string;
  photos?: string[];
}

interface ExperienceItem {
  id: number;
  role: string;
  ageGroup: string;
  club: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  period: string;
  description: string;
  achievements: string[];
  images: string[];
  isGapYear?: boolean;
  isDetailed?: boolean;
  sections?: ExperienceSection[];
  media?: ExperienceMedia;
}

export function CareerTimeline() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const t = useTranslations();

  return (
    <div className="relative">
      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedPhoto}
              alt="Photo enlarged"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-football-green via-ai-blue to-tech-purple" />

      <div className="space-y-12">
        {(experience as ExperienceItem[]).map((job, index) => {
          const isLeft = index % 2 === 0;

          // Gap Year special styling
          if (job.isGapYear) {
            return (
              <div
                key={job.id}
                className={`relative flex items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-muted-foreground border-4 border-background z-10" />

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="border-border/50 border-dashed">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3" />
                          Gap Year
                        </Badge>
                        <span className="text-xs text-muted-foreground">{job.period}</span>
                      </div>
                      <CardTitle className="text-lg">{t(`experience.jobs.${jobKeyMap[job.id]}.role`) || job.role}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        {job.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{t(`experience.jobs.${jobKeyMap[job.id]}.description`) || job.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          }

          // Detailed experience card (Middle School no.2)
          if (job.isDetailed && job.sections) {
            return (
              <div
                key={job.id}
                className="relative"
              >
                {/* Timeline dot - larger for detailed entries */}
                <div className="absolute left-8 md:left-1/2 w-5 h-5 -ml-2.5 rounded-full bg-emerald-600 dark:bg-football-green border-4 border-background z-10 ring-4 ring-emerald-600/20 dark:ring-football-green/20" />

                {/* Full-width card for detailed entry */}
                <div className="ml-20 md:ml-0 md:mx-auto md:max-w-4xl md:px-8">
                  <Card className="border-emerald-600/30 dark:border-football-green/30 hover:border-emerald-600/50 dark:hover:border-football-green/50 transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <Badge className="bg-emerald-600 dark:bg-football-green text-white text-xs">
                          {job.country}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium">{job.period}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        {/* School Logo */}
                        {job.media?.schoolLogo && (
                          <button
                            onClick={() => setSelectedPhoto(job.media!.schoolLogo!)}
                            className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border hover:border-emerald-600 dark:hover:border-football-green transition-colors cursor-pointer"
                          >
                            <Image
                              src={job.media.schoolLogo}
                              alt={`${job.club} logo`}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain bg-white"
                              unoptimized
                            />
                          </button>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{t(`experience.jobs.${jobKeyMap[job.id]}.role`) || job.role}</CardTitle>
                          <div className="flex flex-col gap-1 mt-1.5">
                            <div className="flex items-center text-sm text-foreground font-medium">
                              <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-emerald-600 dark:text-football-green" />
                              {job.club}, {job.location}
                            </div>
                            {job.ageGroup && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                                {t("common.ageGroup")}: {job.ageGroup}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <p className="text-sm text-muted-foreground">{t(`experience.jobs.${jobKeyMap[job.id]}.description`) || job.description}</p>

                      {/* Media Section - Photos & Interview */}
                      {job.media && (
                        <div className="space-y-4">
                          {/* Photos */}
                          {job.media.photos && job.media.photos.length > 0 && (
                            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                              {job.media.photos.map((photo, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedPhoto(photo)}
                                  className="relative aspect-[4/3] rounded-md overflow-hidden border border-border cursor-pointer hover:border-emerald-600 dark:hover:border-football-green transition-colors hover:scale-[1.02]"
                                >
                                  <Image
                                    src={photo}
                                    alt={`${job.club} - Photo ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Interview Link */}
                          {job.media.interviewLink && (
                            <div className="bg-blue-600/10 dark:bg-ai-blue/10 border border-blue-600/20 dark:border-ai-blue/20 rounded-lg p-3">
                              <div className="flex items-start gap-3">
                                <Newspaper className="w-5 h-5 text-blue-600 dark:text-ai-blue flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <h5 className="text-sm font-semibold text-foreground mb-1">{t("experience.sections.pressCoverage")}</h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {job.media.interviewTitle || "Read the full interview"}
                                  </p>
                                  <Button asChild variant="outline" size="sm">
                                    <a
                                      href={job.media.interviewLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      {t("experience.sections.readArticle")}
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Detailed Sections - Collapsible */}
                      <Accordion type="multiple" className="w-full">
                        {job.sections.map((section, sectionIndex) => {
                          const IconComponent = iconMap[section.icon] || Building;
                          return (
                            <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                              <AccordionTrigger className="hover:no-underline py-3">
                                <h4 className="text-lg font-bold text-foreground flex items-center">
                                  <IconComponent className="w-4 h-4 mr-2 text-emerald-600 dark:text-football-green" />
                                  {section.title}
                                </h4>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-1.5 ml-1">
                                  {section.items.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className="text-sm text-muted-foreground flex items-start"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-football-green mt-1.5 mr-2 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}

                        {/* Achievements - Collapsible */}
                        {job.achievements && job.achievements.length > 0 && (
                          <AccordionItem value="achievements">
                            <AccordionTrigger className="hover:no-underline py-3">
                              <h4 className="text-lg font-bold text-foreground flex items-center">
                                <Trophy className="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-500" />
                                {t("experience.sections.achievements")}
                              </h4>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-1.5 ml-1">
                                {job.achievements.map((achievement, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-muted-foreground flex items-start"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 dark:bg-yellow-500 mt-1.5 mr-2 flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          }

          // Standard experience card
          return (
            <div
              key={job.id}
              className={`relative flex items-center ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background z-10" />

              {/* Content card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={job.country === "China" ? "default" : "secondary"} className="text-xs">
                        {job.country}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{job.period}</span>
                    </div>
                    <CardTitle className="text-lg">{t(`experience.jobs.${jobKeyMap[job.id]}.role`) || job.role}</CardTitle>
                    <div className="flex flex-col gap-1 mt-1.5">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        {job.club}, {job.location}
                      </div>
                      {job.ageGroup && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          {t("common.ageGroup")}: {job.ageGroup}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t(`experience.jobs.${jobKeyMap[job.id]}.description`) || job.description}</p>

                    {job.achievements && job.achievements.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center text-sm font-semibold text-foreground mb-1.5">
                          <Trophy className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-football-green" />
                          {t("experience.sections.achievements")}
                        </div>
                        <ul className="space-y-1">
                          {job.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-football-green mt-1.5 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
