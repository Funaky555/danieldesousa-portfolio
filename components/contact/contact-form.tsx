"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Loader2,
  Send,
  Mail,
  MessageCircle,
  Zap,
  Target,
  Search,
  Users,
  Activity,
  BookOpen,
  Code2,
} from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactMethod: z.enum(["email", "whatsapp", "either"]),
});

type FormData = z.infer<typeof formSchema>;

const WHATSAPP_NUMBER = "351913350837";

const serviceLabels: Record<string, string> = {
  "game-analysis": "Game Analysis",
  "scouting": "Scouting Consultancy",
  "leadership": "Leadership Courses",
  "training": "Personalized Training",
  "seminars": "Seminars & Webinars",
  "websites": "Website & CV Creation",
};

const services = [
  { value: "game-analysis", icon: Target,       color: "#0066FF", labelKey: "services.list.gameAnalysis.title" },
  { value: "scouting",      icon: Search,       color: "#00D66C", labelKey: "services.list.scouting.title" },
  { value: "leadership",    icon: Users,        color: "#8B5CF6", labelKey: "services.list.leadership.title" },
  { value: "training",      icon: Activity,     color: "#FF6B35", labelKey: "services.list.training.title" },
  { value: "seminars",      icon: BookOpen,     color: "#14B8A6", labelKey: "services.list.seminars.title" },
  { value: "websites",      icon: Code2,        color: "#F43F5E", labelKey: "services.list.websites.title" },
] as const;

const contactMethods = [
  { value: "email",    icon: Mail,          color: "#0066FF", label: "Email" },
  { value: "whatsapp", icon: MessageCircle, color: "#00D66C", label: "WhatsApp" },
  { value: "either",   icon: Zap,           color: "#8B5CF6", label: "Either" },
] as const;

function ServicePill({
  service,
  isSelected,
  onClick,
  label,
}: {
  service: (typeof services)[number];
  isSelected: boolean;
  onClick: () => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const active = isSelected || hovered;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left w-full"
      style={{
        border: `1px solid ${isSelected ? service.color : hovered ? `${service.color}50` : `${service.color}25`}`,
        color: active ? service.color : undefined,
        background: isSelected ? `${service.color}15` : hovered ? `${service.color}08` : "transparent",
        boxShadow: isSelected ? `0 0 14px ${service.color}30, 0 0 1px ${service.color}60` : "none",
        textShadow: isSelected ? `0 0 8px ${service.color}80` : "none",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="leading-tight">{label}</span>
    </button>
  );
}

function MethodButton({
  method,
  isActive,
  onClick,
}: {
  method: (typeof contactMethods)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = method.icon;
  const active = isActive || hovered;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
      style={{
        border: `1px solid ${isActive ? method.color : hovered ? `${method.color}50` : `${method.color}25`}`,
        color: active ? method.color : undefined,
        background: isActive ? `${method.color}15` : hovered ? `${method.color}08` : "transparent",
        boxShadow: isActive ? `0 0 16px ${method.color}35, 0 0 1px ${method.color}70` : "none",
        textShadow: isActive ? `0 0 8px ${method.color}90` : "none",
      }}
    >
      <Icon className="w-4 h-4" />
      {method.label}
    </button>
  );
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const t = useTranslations();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      contactMethod: "email",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setSubmitStatus("success");
      form.reset();

      if (data.contactMethod === "whatsapp" || data.contactMethod === "either") {
        const serviceName = serviceLabels[data.service] ?? data.service;
        const text = encodeURIComponent(
          `Hi Daniel! I'm ${data.name} and I contacted you through your website. I'm interested in: ${serviceName}.\n\n${data.message}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.name")} *</FormLabel>
                <FormControl>
                  <Input placeholder={t("contact.form.name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.email")} *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.phone")}</FormLabel>
                <FormControl>
                  <Input placeholder="+351 xxx xxx xxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service Interest — Grid de pills */}
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.service")} *</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {services.map((service) => (
                      <ServicePill
                        key={service.value}
                        service={service}
                        isSelected={field.value === service.value}
                        onClick={() => field.onChange(service.value)}
                        label={t(service.labelKey)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Method — Toggle buttons */}
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.contactMethod")}</FormLabel>
                <FormControl>
                  <div className="flex gap-2 mt-1">
                    {contactMethods.map((method) => (
                      <MethodButton
                        key={method.value}
                        method={method}
                        isActive={field.value === method.value}
                        onClick={() => field.onChange(method.value)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.message")} *</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={t("contact.form.message")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button com pulsing glow */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl opacity-25 blur-sm animate-pulse" />
            <Button
              type="submit"
              size="lg"
              className="relative w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-semibold rounded-xl shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:scale-[1.01]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  {t("contact.form.submit")}
                </>
              )}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 rounded-md bg-emerald-600/10 dark:bg-football-green/10 border border-emerald-600/20 dark:border-football-green/20 text-emerald-700 dark:text-football-green text-center">
              {t("contact.form.success")}
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-center">
              {t("contact.form.error")}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
