import express from "express";
import multer from "multer";
import { QuizController } from "../controllers/quizController.js";

const router = express.Router();
const upload = multer(); // stores file in memory (buffer)

router.post("/create", upload.single("pdf"), QuizController.createQuiz);
router.get("/:quiz_uuid", QuizController.getQuizByUuid);

export default router;