// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const geminiClient = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateContent(model, contents) {
  const response = await geminiClient.models.generateContent({ model, contents });
  return response;
}