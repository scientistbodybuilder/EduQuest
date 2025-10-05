import { Quiz } from "../models/Quiz.js";
import { Question } from "../models/Question.js";
import { createQuiz, getQuizByUuid, insertQuestions, getQuestionsByQuizUuid } from "../services/supabaseService.js";
import { generateQuestionsFromPdf } from "../services/geminiService.js";

export const QuizController = {
  async createQuiz(req, res, next) {
    console.log('reached 1 createQuiz')
    try {
      console.log('req body',req.body)
      const { title, comprehension_level, userId } = req.body;
      // const file = pdf;
      const pdf = req.file;
      console.log('pdf:', pdf)
      // const userId = req.user.id;
      // expects title, comprehension level, file, and userID
      // console.log('pdf: ',pdf)
      if (!pdf) return res.status(400).json({ error: "PDF required" });

      const quizObj = new Quiz({ user_id: userId, title, comprehension_level });

      const quiz = await createQuiz(quizObj);

      const base64 = pdf.buffer.toString("base64");
      console.log('reached 2 quiz')
      const questionsData = await generateQuestionsFromPdf(base64, comprehension_level);
      console.log('reached 3 quiz')
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
      console.log('reached 5 quiz')
      res.status(201).json({ quiz, questions: questionRows });
    } catch (err) {
      console.log('Errored out: ',err)
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