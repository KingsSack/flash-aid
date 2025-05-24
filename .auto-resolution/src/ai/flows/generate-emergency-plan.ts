// Implemented generateEmergencyPlan flow based on user-provided emergency scenario and location to suggest tailored actions and explanations.

'use server';

/**
 * @fileOverview Generates an emergency preparedness plan based on a given scenario and location.
 *
 * - generateEmergencyPlan - A function that generates the emergency plan.
 * - GenerateEmergencyPlanInput - The input type for the generateEmergencyPlan function.
 * - GenerateEmergencyPlanOutput - The return type for the generateEmergencyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmergencyPlanInputSchema = z.object({
  scenarioDescription: z
    .string()
    .describe('A detailed description of the emergency scenario.'),
  locationInformation: z
    .string()
    .describe('Information about the user\u2019s location.'),
});
export type GenerateEmergencyPlanInput = z.infer<
  typeof GenerateEmergencyPlanInputSchema
>;

const EmergencyActionSchema = z.object({
  action: z.string().describe('A specific action to take.'),
  explanation: z
    .string()
    .describe('The reason why this action is recommended.'),
});

const GenerateEmergencyPlanOutputSchema = z.object({
  plan: z.array(EmergencyActionSchema).describe('A list of recommended actions.'),
  supplies: z.array(z.string()).describe('A list of recommended supplies.'),
});
export type GenerateEmergencyPlanOutput = z.infer<
  typeof GenerateEmergencyPlanOutputSchema
>;

export async function generateEmergencyPlan(
  input: GenerateEmergencyPlanInput
): Promise<GenerateEmergencyPlanOutput> {
  return generateEmergencyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmergencyPlanPrompt',
  input: {schema: GenerateEmergencyPlanInputSchema},
  output: {schema: GenerateEmergencyPlanOutputSchema},
  prompt: `You are an expert in emergency preparedness. Given the following
  emergency scenario and location information, generate a list of recommended
  actions and an explanation for each action. Also, generate a list of must have supplies. The output must be in JSON format.

Scenario Description: {{{scenarioDescription}}}
Location Information: {{{locationInformation}}}

Format the actions as a list of objects with 'action' and 'explanation' fields.
Format the supplies as a list of strings.
`,
});

const generateEmergencyPlanFlow = ai.defineFlow(
  {
    name: 'generateEmergencyPlanFlow',
    inputSchema: GenerateEmergencyPlanInputSchema,
    outputSchema: GenerateEmergencyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
