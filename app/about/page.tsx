import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";
import { coachInfo } from "@/lib/coaching-data";

export const metadata = {
  title: `About ${coachInfo.name} | Professional Football Coach`,
  description: `Learn about ${coachInfo.name}'s background, education, certifications, and professional journey in football coaching across Portugal and China.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="fixed inset-0 -z-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/backgrounds/green.png')" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/80" />
        {/* AI Glow Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ai-blue/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-football-green/15 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-tech-purple/10 blur-3xl" />
      </div>
      <AboutContent />
      <Footer />
    </>
  );
}
