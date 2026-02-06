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
import { Loader2, Send } from "lucide-react";
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
      // In a real implementation, this would send to an API endpoint
      console.log("Form data:", data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
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

          {/* Service Interest */}
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.form.service")} *</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...field}
                  >
                    <option value="">{t("contact.form.service")}</option>
                    <option value="game-analysis">{t("services.list.gameAnalysis.title")}</option>
                    <option value="scouting">{t("services.list.scouting.title")}</option>
                    <option value="leadership">{t("services.list.leadership.title")}</option>
                    <option value="training">{t("services.list.training.title")}</option>
                    <option value="seminars">{t("services.list.seminars.title")}</option>
                  </select>
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

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {t("contact.form.submit")}
              </>
            )}
          </Button>

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
