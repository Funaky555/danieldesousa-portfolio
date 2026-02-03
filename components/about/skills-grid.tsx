import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { softSkills, languages } from "@/lib/coaching-data";
import {
  Users, Brain, Handshake, Target, Workflow, Ear,
  Languages as LanguagesIcon
} from "lucide-react";

const iconMap: Record<string, any> = {
  Users,
  Brain,
  Handshake,
  Target,
  Workflow,
  Ear,
};

export function SkillsGrid() {
  return (
    <div className="space-y-12">
      {/* Soft Skills */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Soft Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {softSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || Users;
            return (
              <Card
                key={skill.skill}
                className="border-border/50 hover:border-primary/50 transition-all hover:scale-105"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{skill.skill}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <LanguagesIcon className="w-6 h-6 mr-2 text-primary" />
          Languages
        </h3>
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.language} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-foreground">{lang.language}</span>
                  <Badge variant="outline">{lang.level}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{lang.proficiency}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-football-green via-ai-blue to-tech-purple transition-all duration-500"
                  style={{ width: `${lang.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
