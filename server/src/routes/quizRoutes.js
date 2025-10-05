// routes/quizRoutes.js
import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createQuiz,      //handles gemini call, saves quiz + questions
  getQuiz,         //returns quiz + questions
  listUserQuizzes, //return user's quizzes
  submitQuizResults //grade and save user results
} from "../controllers/quizController.js";

const router = express.Router();
// use memoryStorage so controllers get file buffer immediately
const upload = multer({ storage: multer.memoryStorage() });

// create quiz from uploaded file
router.post("/create", authMiddleware, upload.single("file"), createQuiz);

// list existing quizzes for user
router.get("/", authMiddleware, listUserQuizzes);

// get quiz by id
router.get("/:id", authMiddleware, getQuiz);

// submit quiz results
router.post("/submit", authMiddleware, submitQuizResults);

export default router;