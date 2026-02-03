import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToolCard } from "@/components/software/tool-card";
import { PageBackground } from "@/components/layout/page-background";
import { coachInfo, softwareTools } from "@/lib/coaching-data";
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

export const metadata = {
  title: `Software & Tools | ${coachInfo.name}`,
  description:
    "The software tools and platforms used by Daniel de Sousa for video analysis, AI-powered coaching, scouting, and tactical development.",
};

export default function SoftwarePage() {
  return (
    <>
      <Header />
      <PageBackground imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" />
      <main className="min-h-screen bg-background/80 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Software & Tools
            </h1>
            <p className="text-xl text-muted-foreground">
              The platforms and technologies I use to analyse, develop, and improve football performance
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Tool Categories */}
            {softwareTools.map((category) => (
              <section key={category.category}>
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  {category.category}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            ))}

            {/* How I Use AI Section */}
            <section>
              <Card className="border-border/50 glass">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-ai-blue/10 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-ai-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      How I Use AI in Coaching
                    </h2>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Training Plan Generation
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        AI tools help me rapidly draft and iterate on training session plans, adapting exercises to specific tactical objectives and player profiles.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Report Writing
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Match reports, scouting evaluations, and player assessments are drafted with AI assistance, ensuring consistency and professional quality.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Tactical Brainstorming
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Using AI as a tactical sounding board — exploring formation variations, set-piece routines, and pressing triggers through structured prompts.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Communication & Translation
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Critical for cross-cultural coaching — AI assists with translating tactical concepts and team communications across language barriers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
