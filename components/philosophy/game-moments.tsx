import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { philosophy } from "@/lib/coaching-data";
import { Check } from "lucide-react";

export function GameMomentsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {philosophy.gameMoments.map((moment, index) => (
        <Card
          key={index}
          className="border-border/50 hover:border-primary/50 transition-all"
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {moment.title}
              <Badge variant="outline">{index + 1}/5</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {moment.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Key Principles:</p>
              <ul className="space-y-1.5">
                {moment.principles.map((principle, pIndex) => (
                  <li key={pIndex} className="flex items-start text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-football-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
