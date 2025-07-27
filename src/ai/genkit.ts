import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { defineDotprompt } from '@genkit-ai/dotprompt';
import { z } from 'zod';

// Note: These prompts are defined in the Dotprompt format.
// For more information, see: https://genkit.dev/docs/prompting/dotprompt
//
// You can run the Genkit Developer UI to test these prompts:
//
//   npm run genkit:watch
//

defineDotprompt(
    {
        name: 'productSuggestionPrompt',
        model: 'googleai/gemini-1.5-flash',
        input: {
            schema: z.object({
                productDescription: z.string(),
                userHistory: z.string().optional(),
            }),
        },
        output: {
            schema: z.object({
                suggestions: z.array(z.string()),
            }),
        },
        config: {
            temperature: 0.8,
        },
    },
    `
You are an expert at product recommendations for an online Khadi store.
Your goal is to provide a list of 3-5 products that are relevant to the product being viewed.
You should consider the product type, color, and other attributes to make your recommendations.
If user purchase history is provided, you can use that to further tailor the recommendations.

## Product Description
{{productDescription}}

## User Purchase History
{{userHistory}}

## Recommendations
`
);

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GEMINI_API_KEY || "",
  })],
  logSinks: [],
  openApi: {
    address: 'localhost',
    port: 3200,
  },
});
