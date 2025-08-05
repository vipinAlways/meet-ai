import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

export const client = new OpenAI({
  baseURL: "https://api.sambanova.ai/v1",
  apiKey: process.env.OPENAI_API_KEY!,
});

// ===================================


export interface StreamTransriptItem {
  speaker_id: string;
  text: string;
  timestamp?: number;
  // Add other properties as needed
}
