"use client";

import Link from "next/link";
import { Mail, Phone, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { coachInfo, socialMedia } from "@/lib/coaching-data";
import { useTranslations } from "@/components/providers/i18n-provider";

const navigationKeys = {
  main: [
    { key: "about", href: "/about" },
    { key: "philosophy", href: "/philosophy" },
    { key: "experience", href: "/experience" },
    { key: "services", href: "/services" },
    { key: "software", href: "/software" },
    { key: "contact", href: "/contact" },
  ],
  services: [
    { key: "gameAnalysis", href: "/services#game-analysis" },
    { key: "scouting", href: "/services#scouting" },
    { key: "leadership", href: "/services#leadership" },
    { key: "training", href: "/services#training" },
    { key: "seminars", href: "/services#seminars" },
  ],
};

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-4">
              {coachInfo.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.tagline")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("home.bio")}
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-blue-600 dark:text-ai-blue hover:text-foreground hover:bg-primary/10 transition-colors"
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
                  className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-blue-600 dark:text-ai-blue hover:text-foreground hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-pink-500 hover:text-foreground hover:bg-primary/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-blue-500 hover:text-foreground hover:bg-primary/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("nav.home")}
            </h3>
            <ul className="space-y-2">
              {navigationKeys.main.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2">
              {navigationKeys.services.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`services.list.${item.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a
                href={`mailto:${coachInfo.contact.email}`}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                {coachInfo.contact.email}
              </a>
              <a
                href={coachInfo.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {coachInfo.contact.whatsapp}
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {coachInfo.name}. {t("footer.rights")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
