import { Question } from "../models/Question.js";
import { insertQuestions, getQuestionsByQuizUuid } from "../services/supabaseService.js";
import { generateQuestionsFromPdf } from "../services/geminiService.js";

export const QuestionController = {
  async generateQuestions(req, res, next) {
    try {
      const { quiz_uuid, comprehension_level } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "PDF required" });

      const base64 = file.buffer.toString("base64");
      const questionsData = await generateQuestionsFromPdf(base64, comprehension_level);

      const questionRows = questionsData.map(q => new Question({
        quiz_uuid,
        question_text: q.question,
        option_a: q.options[0],
        option_b: q.options[1],
        option_c: q.options[2],
        option_d: q.options[3],
        correct_answer: q.correct
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
  }
};