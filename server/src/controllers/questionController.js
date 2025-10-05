import { insertQuestions, getQuestionsByQuizUuid } from "../services/supabaseService.js";
import { generateQuestionsFromPdf } from "../services/geminiService.js";

export const QuestionController = {
  async generateQuestions(req, res, next) {
    try {
      const { quiz_uuid, comprehension_level } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "PDF required" });

      const base64 = file.buffer.toString("base64");
      const questions = await generateQuestionsFromPdf(base64, comprehension_level);

      const questionRows = questions.map(q => ({
        quiz_uuid,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correct,
      }));

      const savedQuestions = await insertQuestions(questionRows);
      res.status(201).json({ questions: savedQuestions });
    } catch (err) {
      next(err);
    }
  },

  async getQuestions(req, res, next) {
    try {
      const { quiz_uuid } = req.params;
      const questions = await getQuestionsByQuizUuid(quiz_uuid);
      res.json({ questions });
    } catch (err) {
      next(err);
    }
  },
};