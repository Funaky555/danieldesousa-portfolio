"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { education } from "@/lib/coaching-data";
import { Award, GraduationCap, Globe } from "lucide-react";
import { useTranslations } from "@/components/providers/i18n-provider";

// Map education data to translation keys
const certKeyMap: Record<string, string> = {
  "UEFA B License": "uefaB",
  "IPDJ Football Coach Level 2": "ipdj",
  "UEFA A License": "uefaA",
};

const degreeKeyMap: Record<string, string> = {
  "Master's Degree in Sports Sciences": "masters",
  "Computer Management Equipment": "computer",
};

const exchangeKeyMap: Record<string, string> = {
  "Erasmus Exchange": "erasmus",
  "University Project (IMPAS)": "impas",
};

export function EducationTimeline() {
  const t = useTranslations();

  const getStatusTranslation = (status: string) => {
    if (status === "Certified") return t("about.education.certified");
    if (status === "In Progress") return t("about.education.inProgress");
    return status;
  };

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-primary" />
          {t("about.education.certifications")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.certifications.map((cert, index) => {
            const certKey = certKeyMap[cert.title] || "uefaB";
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{t(`about.certs.${certKey}.title`)}</CardTitle>
                    <Badge variant={cert.status === "Certified" ? "default" : "secondary"}>
                      {getStatusTranslation(cert.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{t(`about.certs.${certKey}.institution`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t(`about.certs.${certKey}.description`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {education.degrees.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-primary" />
              {t("about.education.academic")}
            </h3>
            <div className="space-y-4">
              {education.degrees.map((degree, index) => {
                const degreeKey = degreeKeyMap[degree.title] || "masters";
                return (
                  <Card key={index} className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base">{t(`about.degrees.${degreeKey}.title`)}</CardTitle>
                      <CardDescription className="text-sm">
                        {degree.specialization && `${t(`about.degrees.${degreeKey}.specialization`)} • `}
                        {degree.institution} • {degree.startYear} - {degree.endYear}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{t(`about.degrees.${degreeKey}.description`)}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Exchange Programs */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary" />
          {t("about.education.exchange")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.exchangePrograms.map((program, index) => {
            const exchangeKey = exchangeKeyMap[program.program] || "erasmus";
            return (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-base">{t(`about.exchanges.${exchangeKey}.program`)}</CardTitle>
                  <CardDescription className="text-sm">
                    {program.specialization && `${t(`about.exchanges.${exchangeKey}.specialization`)} • `}
                    {program.institution}, {program.location} • {program.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t(`about.exchanges.${exchangeKey}.description`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
