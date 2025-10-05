import { Quiz } from "../models/Quiz.js";
import { Question } from "../models/Question.js";
import { createQuiz, getQuizByUuid, insertQuestions, getQuestionsByQuizUuid } from "../services/supabaseService.js";
import { generateQuestionsFromPdf } from "../services/geminiService.js";

export const QuizController = {
  async createQuiz(req, res, next) {
    try {
      const { title, comprehension_level } = req.body;
      const file = req.file;
      const userId = req.user.id;

      if (!file) return res.status(400).json({ error: "PDF required" });

      const quizObj = new Quiz({ user_id: userId, title, comprehension_level });

      const quiz = await createQuiz(quizObj);

      const base64 = file.buffer.toString("base64");
      const questionsData = await generateQuestionsFromPdf(base64, comprehension_level);

      // Mmap AI-generated questions to separate options
      const questionRows = questionsData.map(q => new Question({
        quiz_uuid: quiz.quiz_uuid,
        question_text: q.question,
        option_a: q.options[0],
        option_b: q.options[1],
        option_c: q.options[2],
        option_d: q.options[3],
        correct_answer: q.correct
      }));

      await insertQuestions(questionRows);
      res.status(201).json({ quiz, questions: questionRows });
    } catch (err) {
      next(err);
    }
  },

  async getQuiz(req, res, next) {
    try {
      const { quiz_uuid } = req.params;
      const quiz = await getQuizByUuid(quiz_uuid);
      const questions = await getQuestionsByQuizUuid(quiz_uuid);
      res.json({ quiz, questions });
    } catch (err) {
      next(err);
    }
  }
};