import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coachInfo } from "@/lib/coaching-data";
import { Mail, MessageCircle, MapPin, Copy } from "lucide-react";

export const metadata = {
  title: `Contact ${coachInfo.name} | Get in Touch`,
  description: `Contact ${coachInfo.name} for football coaching consultations, seminars, scouting services, and training programs. Available via email and WhatsApp.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to work together? Send me a message and let's discuss how I can help achieve your football development goals.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                {/* Email Card */}
                <Card className="mb-4 border-border/50 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
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
                        <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
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
                              Open WhatsApp
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
                      <div className="w-10 h-10 rounded-lg bg-football-green/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-football-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-sm text-muted-foreground">{coachInfo.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Availability Statement */}
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Availability</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-football-green mt-2 mr-2 flex-shrink-0" />
                      Open to partnerships
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-blue mt-2 mr-2 flex-shrink-0" />
                      International opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-tech-purple mt-2 mr-2 flex-shrink-0" />
                      Speaking engagements
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-energy-orange mt-2 mr-2 flex-shrink-0" />
                      Consulting projects
                    </li>
                  </ul>
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
      <Footer />
    </>
  );
}
