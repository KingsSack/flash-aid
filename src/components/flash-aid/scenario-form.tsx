"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  scenarioDescription: z
    .string()
    .min(20, { message: "Scenario description must be at least 20 characters." })
    .max(500, { message: "Scenario description must be at most 500 characters." }),
  locationInformation: z
    .string()
    .min(3, { message: "Location information must be at least 3 characters." })
    .max(100, { message: "Location information must be at most 100 characters." }),
});

export type ScenarioFormValues = z.infer<typeof formSchema>;

interface ScenarioFormProps {
  onSubmit: (values: ScenarioFormValues) => void;
  isLoading: boolean;
}

export function ScenarioForm({ onSubmit, isLoading }: ScenarioFormProps) {
  const form = useForm<ScenarioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenarioDescription: "",
      locationInformation: "",
    },
  });

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Describe Your Emergency</CardTitle>
        <CardDescription>
          Provide details about the potential emergency and your location to generate a personalized plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="scenarioDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Scenario Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Approaching hurricane, widespread power outage, earthquake warning..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Location Information</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Urban apartment, 3rd floor; Rural house near a river; Coastal town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                "Generate Emergency Plan"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
