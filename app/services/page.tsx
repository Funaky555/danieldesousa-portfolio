import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServicesContent } from "@/components/services/services-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Services | ${coachInfo.name}`,
  description: "Professional football coaching services including game analysis, scouting consultancy, leadership courses, personalized training, and seminars.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/green.png" showGlowOrbs />
      <ServicesContent />
      <Footer />
    </>
  );
}
