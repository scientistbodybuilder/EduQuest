// import { GoogleGenAI } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// console.log('apikey: ',process.env.GEMINI_API_KEY)
// export const geminiClient = new GoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export async function generateContent(model, contents) {
//   const response = await geminiClient.models.generateContent({ model, contents });
//   return response;
// }
import 'dotenv/config'; 
import { GoogleGenAI } from "@google/genai";
console.log('API KEY: ', process.env.GEMINI_API_KEY)
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });