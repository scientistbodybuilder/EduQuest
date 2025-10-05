import { createQuiz, getQuizByUuid, insertQuestions, getQuestionsByQuizUuid } from "../services/supabaseService.js";
import { generateQuestionsFromPdf } from "../services/geminiService.js";
import { v4 as uuidv4 } from "uuid";

export const QuizController = {
  async createQuiz(req, res, next) {
    try {
      const { title, comprehension_level } = req.body;
      const file = req.file;
      const userId = req.user.id;

      if (!file) return res.status(400).json({ error: "PDF required" });

      const quiz_uuid = uuidv4();

      // create quiz
      const quiz = await createQuiz({
        quiz_uuid,
        user_id: userId,
        title: title || "Untitled Quiz",
        comprehension_level,
      });

      // call gemini service to generate questions
      const base64 = file.buffer.toString("base64");
      const questions = await generateQuestionsFromPdf(base64, comprehension_level);

      // put question into db
      const questionRows = questions.map(q => ({
        quiz_uuid,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correct,
      }));
      await insertQuestions(questionRows);

      res.status(201).json({ quiz, questions: questionRows });
    } catch (err) {
      next(err);
    }
  },

  // grab quiz questions
  async getQuiz(req, res, next) {
    try {
      const { quiz_uuid } = req.params;
      const quiz = await getQuizByUuid(quiz_uuid);
      const questions = await getQuestionsByQuizUuid(quiz_uuid);
      res.json({ quiz, questions });
    } catch (err) {
      next(err);
    }
  },
};