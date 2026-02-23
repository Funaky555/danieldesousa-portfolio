import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MediaContent } from "@/components/media/media-content";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `Analysis & Media | ${coachInfo.name}`,
  description:
    "Football analysis articles, opinions, podcast episodes and press appearances by Daniel de Sousa, UEFA B Football Coach.",
};

export default function MediaPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="/images/backgrounds/bench.png" showGlowOrbs />
      <MediaContent />
      <Footer />
    </>
  );
}
