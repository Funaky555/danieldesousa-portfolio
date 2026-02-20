"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { coachInfo, socialMedia } from "@/lib/coaching-data";
import { Mail, MessageCircle, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const EMAIL_COLOR = "#00D66C";
const WHATSAPP_COLOR = "#0066FF";
const LOCATION_COLOR = "#8B5CF6";
const TWITTER_COLOR = "#1DA1F2";
const LINKEDIN_COLOR = "#0A66C2";
const INSTAGRAM_COLOR = "#E4405F";
const FACEBOOK_COLOR = "#1877F2";

function GlowCard({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl p-6 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "hsl(var(--card))",
        border: `1px solid ${hovered ? `${color}50` : `${color}20`}`,
        boxShadow: hovered ? `0 0 20px ${color}25, 0 0 1px ${color}50` : "none",
      }}
    >
      {children}
    </div>
  );
}

function SocialButton({
  href,
  color,
  icon: Icon,
  label,
}: {
  href: string;
  color: string;
  icon: React.ElementType;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        border: `1px solid ${hovered ? `${color}60` : `${color}25`}`,
        color: hovered ? color : undefined,
        background: hovered ? `${color}12` : `${color}08`,
        boxShadow: hovered ? `0 0 14px ${color}40` : "none",
        textShadow: hovered ? `0 0 8px ${color}80` : "none",
      }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

export function ContactContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background/80 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-3">
          {/* Coluna esquerda — Info */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {t("contact.title")}
            </h2>

            {/* Email */}
            <GlowCard color={EMAIL_COLOR}>
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${EMAIL_COLOR}15` }}
                >
                  <Mail className="w-5 h-5" style={{ color: EMAIL_COLOR }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h3>
                  <a
                    href={`mailto:${coachInfo.contact.email}`}
                    className="text-sm text-muted-foreground hover:text-foreground break-all transition-colors"
                  >
                    {coachInfo.contact.email}
                  </a>
                </div>
              </div>
            </GlowCard>

            {/* WhatsApp */}
            <GlowCard color={WHATSAPP_COLOR}>
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${WHATSAPP_COLOR}15` }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: WHATSAPP_COLOR }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.whatsapp")}</h3>
                  <a
                    href={coachInfo.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {coachInfo.contact.whatsapp}
                  </a>
                  <div className="mt-3">
                    <SocialButton
                      href={coachInfo.contact.whatsappLink}
                      color={WHATSAPP_COLOR}
                      icon={MessageCircle}
                      label={t("contact.info.whatsapp")}
                    />
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Location */}
            <GlowCard color={LOCATION_COLOR}>
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${LOCATION_COLOR}15` }}
                >
                  <MapPin className="w-5 h-5" style={{ color: LOCATION_COLOR }} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.info.location")}</h3>
                  <p className="text-sm text-muted-foreground">{coachInfo.location}</p>
                </div>
              </div>
            </GlowCard>

            {/* Social Media */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="font-semibold text-foreground mb-4">Social Media</h3>
              <div className="flex flex-col gap-2">
                {socialMedia.twitter && (
                  <SocialButton
                    href={socialMedia.twitter}
                    color={TWITTER_COLOR}
                    icon={Twitter}
                    label="X / Twitter"
                  />
                )}
                {socialMedia.linkedin && (
                  <SocialButton
                    href={socialMedia.linkedin}
                    color={LINKEDIN_COLOR}
                    icon={Linkedin}
                    label="LinkedIn"
                  />
                )}
                {socialMedia.instagram && (
                  <SocialButton
                    href={socialMedia.instagram}
                    color={INSTAGRAM_COLOR}
                    icon={Instagram}
                    label="Instagram"
                  />
                )}
                {socialMedia.facebook && (
                  <SocialButton
                    href={socialMedia.facebook}
                    color={FACEBOOK_COLOR}
                    icon={Facebook}
                    label="Facebook"
                  />
                )}
              </div>
            </div>

            {/* Availability — gradient border */}
            <div
              style={{
                padding: "1px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0066FF, #00D66C, #8B5CF6)",
              }}
            >
              <div
                className="rounded-[11px] p-6"
                style={{ background: "hsl(var(--card))" }}
              >
                <h3 className="font-semibold text-foreground mb-3">Disponibilidade</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("contact.availability")}
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita — Formulário */}
          <div className="lg:col-span-2">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Linha gradient animada no topo (igual ao header) */}
              <div
                className="h-[2px] w-full animate-gradient-slide"
                style={{
                  background: "linear-gradient(90deg, #0066FF, #00D66C, #8B5CF6, #FF6B35, #14B8A6, #F43F5E, #0066FF)",
                  backgroundSize: "200% 100%",
                }}
              />
              <div className="p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
