"use client";

import { useState } from "react";
import type { GenerateEmergencyPlanOutput } from "@/ai/flows/generate-emergency-plan";
import { generateEmergencyPlan } from "@/ai/flows/generate-emergency-plan";
import { ScenarioForm, type ScenarioFormValues } from "@/components/flash-aid/scenario-form";
import { PlanDisplay } from "@/components/flash-aid/plan-display";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert } from "lucide-react";

export default function HomePage() {
  const [plan, setPlan] = useState<GenerateEmergencyPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (values: ScenarioFormValues) => {
    setIsLoading(true);
    setPlan(null); // Clear previous plan

    try {
      const result = await generateEmergencyPlan(values);
      setPlan(result);
      toast({
        title: "Plan Generated Successfully!",
        description: "Your personalized emergency plan is ready below.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Error Generating Plan",
        description: "Something went wrong. Please try again. If the issue persists, the AI model might be temporarily unavailable.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <ShieldAlert className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-extrabold ml-3 text-foreground">
            Flash<span className="text-primary">Aid</span>
          </h1>
        </div>
        <p className="mt-2 text-xl text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered assistant for creating tailored emergency preparedness plans. Be prepared, instantly.
        </p>
      </header>

      <main className="w-full max-w-3xl">
        <ScenarioForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        <PlanDisplay plan={plan} isLoading={isLoading && !plan} />
      </main>

      <footer className="mt-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FlashAid. Be prepared, instantly.</p>
        <p className="text-sm mt-1">
          Emergency plans are for informational purposes. Always consult official local authorities.
        </p>
      </footer>
    </div>
  );
}