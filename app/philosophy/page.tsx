import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GameMomentsSection } from "@/components/philosophy/game-moments";
import { FormationPreview } from "@/components/philosophy/formation-preview";
import { PageBackground } from "@/components/layout/page-background";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { coachInfo, philosophy } from "@/lib/coaching-data";

export const metadata = {
  title: `Coaching Philosophy | ${coachInfo.name}`,
  description: "Football coaching philosophy focused on intelligence, intensity, and intention. Modern tactical approach with emphasis on positional play and player development.",
};

export default function PhilosophyPage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="https://images.unsplash.com/photo-1529551037515-43313edd0959?w=1920&q=80" />
      <main className="min-h-screen bg-background/80 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Coaching Philosophy
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              {philosophy.keyPrinciples.map((principle) => (
                <Badge key={principle} variant="default" className="text-base px-4 py-1">
                  {principle}
                </Badge>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Core Philosophy */}
            <section>
              <div className="glass rounded-lg p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Core Philosophy
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                  {philosophy.core}
                </p>
              </div>
            </section>

            {/* Tactical Systems */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Preferred Tactical Systems
                </h2>
                <p className="text-muted-foreground">
                  Formations adapted to player characteristics while maintaining core principles
                </p>
              </div>
              <FormationPreview />
            </section>

            <Separator />

            {/* Game Moments */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  The Five Game Moments
                </h2>
                <p className="text-muted-foreground">
                  Clear ideas for every phase of play
                </p>
              </div>
              <GameMomentsSection />
            </section>

            <Separator />

            {/* Coaching Approach */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Coaching Approach
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="glass rounded-lg p-8 border border-border/50">
                  <h3 className="text-xl font-bold text-foreground mb-4">Methodology</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.approach}
                  </p>
                </div>
                <div className="glass rounded-lg p-8 border border-border/50">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Professional Experience
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.roles}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
