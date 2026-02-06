"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coachInfo, socialMedia } from "@/lib/coaching-data";
import { Mail, MessageCircle, MapPin, Twitter, Linkedin } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

export function ContactContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("contact.title")}
              </h2>

              {/* Email Card */}
              <Card className="mb-4 border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h3>
                      <a
                        href={`mailto:${coachInfo.contact.email}`}
                        className="text-sm text-muted-foreground hover:text-foreground break-all"
                      >
                        {coachInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Card */}
              <Card className="mb-4 border-border/50 hover:border-accent/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.info.whatsapp")}</h3>
                      <a
                        href={coachInfo.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {coachInfo.contact.whatsapp}
                      </a>
                      <div className="mt-3">
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <a
                            href={coachInfo.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {t("contact.info.whatsapp")}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600/10 dark:bg-football-green/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-600 dark:text-football-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("contact.info.location")}</h3>
                      <p className="text-sm text-muted-foreground">{coachInfo.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <Card className="mb-4 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Social Media</h3>
                <div className="flex gap-4">
                  {socialMedia.twitter && (
                    <a
                      href={socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-blue-600 dark:text-ai-blue hover:text-foreground hover:bg-primary/10 transition-colors"
                      aria-label="Twitter / X"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {socialMedia.linkedin && (
                    <a
                      href={socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-blue-600 dark:text-ai-blue hover:text-foreground hover:bg-primary/10 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability Statement */}
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">{t("contact.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("contact.availability")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
