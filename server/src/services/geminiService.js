import { ai } from "../config/geminiClient.js";

export async function generateQuestionsFromPdf(base64Pdf, comprehensionLevel) {
    const prompt = `Generate multiple-choice questions from this PDF.
                    Comprehension level: ${comprehensionLevel}.
                    Return JSON array of {question, options, correct}. 
                    Strictly limit the 'correct' json field to one uppercase character.
                    Strictly include the options as an array.`;

    const contents = [
        {
        inlineData: {
            mimeType: "application/pdf",
            data: base64Pdf,
        },
        },
        { text: prompt },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
    });

    const textContent = response.candidates[0].content.parts[0].text;
    // console.log('textContent: ', textContent)
    try {
        const cleanText = textContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
        // console.log('cleaned text: ',cleanText)

        const questions = JSON.parse(cleanText);
        // console.log('parsed questions: ',questions)
        return questions;
    } catch (e) {
        console.error("Failed to parse questions:", e);
        return [];
    }
    // return response?.questions || [];
}
// export async function generateQuestionsFromPdf() {
//     const pdfResp = await fetch('https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf')
//         .then((response) => response.arrayBuffer());

//     const contents = [
//         { text: "Generate 10 4-option multiple choice questions from the document with comprehension level of grade 7 student and include answer key at the end listed as just the letter. Give just the questions and answers, no other text or punctuation." },
//         {
//             inlineData: {
//                 mimeType: 'application/pdf',
//                 data: Buffer.from(pdfResp).toString("base64")
//             }
//         }
//     ];

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: contents
//     });
//     console.log(response.text);
// }