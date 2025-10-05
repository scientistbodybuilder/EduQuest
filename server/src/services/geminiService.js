import { geminiClient } from "../config/geminiClient.js";

export async function generateQuestionsFromPdf(base64Pdf, comprehensionLevel) {
    const prompt = `Generate multiple-choice questions from this PDF.
                    Comprehension level: ${comprehensionLevel}.
                    Return JSON array of {question, options, correct}.`;

    const contents = [
        {
        inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf,
        },
        },
        { text: prompt },
    ];

    const response = await GeminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
    });

    // return structured questions or empty array if parsing fails
    return response?.questions || [];
}