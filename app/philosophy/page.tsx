import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PhilosophyContent } from "@/components/philosophy/philosophy-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Coaching Philosophy | ${coachInfo.name}`,
  description: "Football coaching philosophy focused on intelligence, intensity, and intention. Modern tactical approach with emphasis on positional play and player development.",
};

export default function PhilosophyPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/green.png" showGlowOrbs />
      <PhilosophyContent />
      <Footer />
    </>
  );
}
