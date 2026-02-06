import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SoftwareContent } from "@/components/software/software-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Software & Tools | ${coachInfo.name}`,
  description:
    "The software tools and platforms used by Daniel de Sousa for video analysis, AI-powered coaching, scouting, and tactical development.",
};

export default function SoftwarePage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/green.png" showGlowOrbs />
      <SoftwareContent />
      <Footer />
    </>
  );
}
