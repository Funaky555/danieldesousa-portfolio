import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/coaching-data";
import { MapPin, Calendar, Trophy } from "lucide-react";

export function CareerTimeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-football-green via-ai-blue to-tech-purple" />

      <div className="space-y-12">
        {experience.map((job, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={job.id}
              className={`relative flex items-center ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background z-10" />

              {/* Content card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={job.country === "China" ? "default" : "secondary"}>
                        {job.country}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{job.period}</span>
                    </div>
                    <CardTitle className="text-xl">{job.role}</CardTitle>
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        {job.club}, {job.location}
                      </div>
                      {job.ageGroup && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                          Age Group: {job.ageGroup}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                    {job.achievements && job.achievements.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center text-sm font-semibold text-foreground mb-2">
                          <Trophy className="w-4 h-4 mr-2 text-football-green" />
                          Achievements
                        </div>
                        <ul className="space-y-1.5">
                          {job.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-football-green mt-2 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
