import { GoogleGenAI } from "@google/genai";

export const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateContent(model, contents) {
  const response = await geminiClient.models.generateContent({ model, contents });
  return response;
}