import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/contact/contact-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Contact ${coachInfo.name} | Get in Touch`,
  description: `Contact ${coachInfo.name} for football coaching consultations, seminars, scouting services, and training programs. Available via email and WhatsApp.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/green.png" showGlowOrbs />
      <ContactContent />
      <Footer />
    </>
  );
}
