import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServiceCard } from "@/components/services/service-card";
import { PageBackground } from "@/components/layout/page-background";
import { Button } from "@/components/ui/button";
import { services, servicePricing, coachInfo } from "@/lib/coaching-data";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: `Services | ${coachInfo.name}`,
  description: "Professional football coaching services including game analysis, scouting consultancy, leadership courses, personalized training, and seminars.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="https://images.unsplash.com/photo-1491545566848-40807b5fc71e?w=1920&q=80" />
      <main className="min-h-screen bg-background/80 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Professional Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive football coaching services tailored to your needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Pricing Note */}
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-lg p-8 text-center border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Custom Pricing
              </h3>
              <p className="text-muted-foreground mb-2">
                {servicePricing.noteEn}
              </p>
              <p className="text-muted-foreground mb-6 italic">
                {servicePricing.note}
              </p>
              <Button asChild size="lg" className="glow-border">
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Request a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
