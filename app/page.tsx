import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { PhilosophyTeaser } from "@/components/home/philosophy-teaser";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-16">
        <HeroSection />
        <AboutPreview />
        <ServicesPreview />
        <PhilosophyTeaser />
      </main>
      <Footer />
    </>
  );
}
