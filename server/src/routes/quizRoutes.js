import express from "express";
import multer from "multer";
import { QuizController } from "../controllers/quizController.js";

const quizRouter = express.Router();
const upload = multer(); // stores file in memory (buffer)

quizRouter.post("/create", upload.single("pdf"), QuizController.createQuiz);
quizRouter.get("/:quiz_uuid", QuizController.getQuiz);

export default quizRouter;