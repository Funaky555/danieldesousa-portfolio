import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExperienceContent } from "@/components/experience/experience-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Experience | ${coachInfo.name}`,
  description: "Professional coaching experience across Portugal and China, from grassroots to elite youth development. 10+ years coaching U4 to U18 teams.",
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/green.png" showGlowOrbs />
      <ExperienceContent />
      <Footer />
    </>
  );
}
