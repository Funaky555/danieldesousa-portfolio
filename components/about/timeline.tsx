"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { education } from "@/lib/coaching-data";
import { Award, GraduationCap, Globe } from "lucide-react";

export function EducationTimeline() {
  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-primary" />
          Certifications
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.certifications.map((cert, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <Badge variant={cert.status === "Certified" ? "default" : "secondary"}>
                    {cert.status}
                  </Badge>
                </div>
                <CardDescription>{cert.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Degrees */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <GraduationCap className="w-6 h-6 mr-2 text-primary" />
          Academic Degrees
        </h3>
        {education.degrees.map((degree, index) => (
          <Card key={index} className="border-border/50">
            <CardHeader>
              <CardTitle>{degree.title}</CardTitle>
              <CardDescription>
                {degree.specialization && `${degree.specialization} • `}
                {degree.institution} • {degree.startYear} - {degree.endYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{degree.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Exchange Programs */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary" />
          International Exchange Programs
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.exchangePrograms.map((program, index) => (
            <Card key={index} className="border-border/50 hover:border-accent/50 transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{program.program}</CardTitle>
                <CardDescription>
                  {program.institution} • {program.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-2">{program.year}</Badge>
                <p className="text-sm text-muted-foreground">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
