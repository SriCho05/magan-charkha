'use server';

/**
 * @fileOverview Product suggestion AI agent.
 *
 * - suggestProducts - A function that handles the product suggestion process.
 * - SuggestProductsInput - The input type for the suggestProducts function.
 * - SuggestProductsOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductsInputSchema = z.object({
  productDescription: z.string().describe('The description of the product.'),
  userHistory: z.string().optional().describe('The user purchase history.'),
});
export type SuggestProductsInput = z.infer<typeof SuggestProductsInputSchema>;

const SuggestProductsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('List of suggested products.'),
});
export type SuggestProductsOutput = z.infer<typeof SuggestProductsOutputSchema>;

export async function suggestProducts(input: SuggestProductsInput): Promise<SuggestProductsOutput> {
  return suggestProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductsPrompt',
  input: {schema: SuggestProductsInputSchema},
  output: {schema: SuggestProductsOutputSchema},
  prompt: `You are a shopping assistant. Based on the product description and user history, suggest related products.

Product Description: {{{productDescription}}}
User History: {{{userHistory}}}

Suggestions:`,
});

const suggestProductsFlow = ai.defineFlow(
  {
    name: 'suggestProductsFlow',
    inputSchema: SuggestProductsInputSchema,
    outputSchema: SuggestProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
