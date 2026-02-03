import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart3, Search, Users, Target, Presentation,
  ArrowRight, Check
} from "lucide-react";

const iconMap: Record<string, any> = {
  BarChart3,
  Search,
  Users,
  Target,
  Presentation,
};

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    features: string[];
    deliverables: string[];
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || BarChart3;

  return (
    <Card
      id={service.id}
      className="border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] h-full flex flex-col"
    >
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">{service.title}</CardTitle>
        <CardDescription className="text-base">{service.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-6">{service.description}</p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3">Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-football-green mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3">Deliverables:</h4>
          <div className="flex flex-wrap gap-2">
            {service.deliverables.map((deliverable, index) => (
              <Badge key={index} variant="secondary">
                {deliverable}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Button asChild className="w-full">
            <Link href="/contact">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
