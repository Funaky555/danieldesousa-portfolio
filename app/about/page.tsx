import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EducationTimeline } from "@/components/about/timeline";
import { SkillsGrid } from "@/components/about/skills-grid";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo } from "@/lib/coaching-data";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: `About ${coachInfo.name} | Professional Football Coach`,
  description: `Learn about ${coachInfo.name}'s background, education, certifications, and professional journey in football coaching across Portugal and China.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="https://images.unsplash.com/photo-1544975641-3a2ca7d4ea4a?w=1920&q=80" />
      <main className="min-h-screen bg-background/80 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {coachInfo.bio}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Education & Certifications */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Education & Certifications
                </h2>
                <p className="text-muted-foreground">
                  Academic background and professional qualifications
                </p>
              </div>
              <EducationTimeline />
            </section>

            <Separator className="my-16" />

            {/* Skills & Languages */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Skills & Languages
                </h2>
                <p className="text-muted-foreground">
                  Core competencies and multilingual capabilities
                </p>
              </div>
              <SkillsGrid />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
