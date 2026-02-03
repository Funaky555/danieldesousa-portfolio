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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Send } from "lucide-react";

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
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
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
                <FormLabel>Email *</FormLabel>
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
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+351 xxx xxx xxx" {...field} />
                </FormControl>
                <FormDescription>
                  Include if you prefer WhatsApp contact
                </FormDescription>
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
                <FormLabel>Service Interest *</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...field}
                  >
                    <option value="">Select a service</option>
                    <option value="game-analysis">Game Analysis</option>
                    <option value="scouting">Scouting Consultancy</option>
                    <option value="leadership">Leadership Courses</option>
                    <option value="training">Personalized Training</option>
                    <option value="seminars">Seminars & Webinars</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Method */}
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="email"
                        checked={field.value === "email"}
                        onChange={() => field.onChange("email")}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="whatsapp"
                        checked={field.value === "whatsapp"}
                        onChange={() => field.onChange("whatsapp")}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">WhatsApp</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="either"
                        checked={field.value === "either"}
                        onChange={() => field.onChange("either")}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Either</span>
                    </label>
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
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tell me about your needs, goals, or questions..."
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
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 rounded-md bg-football-green/10 border border-football-green/20 text-football-green text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-center">
              Something went wrong. Please try again or contact me directly via email/WhatsApp.
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
