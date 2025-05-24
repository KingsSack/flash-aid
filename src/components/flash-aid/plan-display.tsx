"use client";

import type { GenerateEmergencyPlanOutput } from "@/ai/flows/generate-emergency-plan";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle2, ListChecks, Link as LinkIcon, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PlanDisplayProps {
  plan: GenerateEmergencyPlanOutput | null;
  isLoading: boolean;
}

const ResourceLinks = [
  { name: "Ready.gov (FEMA)", url: "https://www.ready.gov" },
  { name: "American Red Cross", url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html" },
  { name: "National Weather Service", url: "https://www.weather.gov" },
];

export function PlanDisplay({ plan, isLoading }: PlanDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full mt-8 shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-1/3 mb-3" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-2 p-3 border rounded-md">
                <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-12 w-full mt-2" />
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-3" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-3/4 mb-2" />
            ))}
          </div>
          <div>
            <Skeleton className="h-6 w-1/3 mb-3" />
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-1/2 mb-2" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!plan) {
    return (
      <Alert className="mt-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Ready to Prepare?</AlertTitle>
        <AlertDescription>
          Enter your emergency scenario and location details above to generate a personalized preparedness plan.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary flex items-center">
          <AlertTriangle className="mr-3 h-8 w-8" /> Your Emergency Plan
        </CardTitle>
        <CardDescription>
          Follow these recommendations to enhance your safety and preparedness.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {plan.plan && plan.plan.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
              <CheckCircle2 className="mr-2 h-7 w-7 text-accent" /> Recommended Actions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {plan.plan.map((item, index) => (
                <AccordionItem value={`action-${index}`} key={index} className="bg-background/50 border-border rounded-md mb-2 shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                    <div className="flex items-center w-full">
                       <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-accent text-accent-foreground mr-3 shrink-0">
                         <span className="font-bold">{index + 1}</span>
                       </span>
                      <span className="font-medium text-foreground flex-1">{item.action}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-1 text-muted-foreground">
                    {item.explanation}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {plan.supplies && plan.supplies.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
              <ListChecks className="mr-2 h-7 w-7 text-accent" /> Essential Supplies
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-5 bg-secondary/30 p-4 rounded-md">
              {plan.supplies.map((supply, index) => (
                <li key={index} className="text-foreground">{supply}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
            <LinkIcon className="mr-2 h-7 w-7 text-accent" /> Additional Resources
          </h2>
          <ul className="space-y-2">
            {ResourceLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline hover:text-primary/80 transition-colors flex items-center"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {link.name}
                </a>
              </li>
            ))}
            <li className="text-muted-foreground italic">
              Always consult your local emergency management agency for location-specific guidelines.
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
