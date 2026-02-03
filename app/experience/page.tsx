import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CareerTimeline } from "@/components/experience/career-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { coachInfo } from "@/lib/coaching-data";
import { Trophy, Globe, Users } from "lucide-react";

export const metadata = {
  title: `Experience | ${coachInfo.name}`,
  description: "Professional coaching experience across Portugal and China, from grassroots to elite youth development. 10+ years coaching U4 to U18 teams.",
};

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Professional Experience
            </h1>
            <p className="text-xl text-muted-foreground">
              A decade of youth football development across two continents
            </p>
          </div>

          {/* Highlights */}
          <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
            <Card className="border-border/50 glass">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-football-green/10 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-football-green" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Championships</h3>
                <p className="text-sm text-muted-foreground">
                  U15 Women's City Champion (2024)
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 glass">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-ai-blue/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-ai-blue" />
                </div>
                <h3 className="font-bold text-foreground mb-2">International</h3>
                <p className="text-sm text-muted-foreground">
                  4+ years coaching in China
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 glass">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-tech-purple/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-tech-purple" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Elite Academy</h3>
                <p className="text-sm text-muted-foreground">
                  SL Benfica Youth Development
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Career Timeline
              </h2>
              <p className="text-muted-foreground">
                From grassroots to elite youth development
              </p>
            </div>
            <CareerTimeline />
          </div>

          {/* China Highlight */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="border-border/50 glass">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge variant="default" className="mr-3">China Experience</Badge>
                  <h3 className="text-2xl font-bold text-foreground">
                    International Coaching Journey
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Over 4 years coaching in China across multiple cities (Tongling, Chizhou, Dengfeng, Dalian),
                  I developed a deep understanding of cultural adaptation in football coaching. Working with
                  diverse teams from U6 grassroots to U18 competitive levels, I successfully integrated
                  modern European coaching methodologies with local football culture.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notable achievements include coordinating entire football departments, winning city
                  championships, and developing players who competed at provincial level. This international
                  experience strengthened my flexibility, cultural sensitivity, and ability to communicate
                  across language barriers - skills that continue to define my coaching approach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
