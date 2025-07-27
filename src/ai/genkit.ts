import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { z } from 'zod';


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
