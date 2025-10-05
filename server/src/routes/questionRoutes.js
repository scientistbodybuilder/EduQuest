import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  generateQuestionsForQuiz, // call gemini + persist to db
  getQuestionsForQuiz       // return questions with specified quiz_uuid
} from "../controllers/questionController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// make questions for a quiz from uploaded file
router.post("/generate", authMiddleware, upload.single("file"), generateQuestionsForQuiz);

// return questions for a quiz with specified quiz_uuid
router.get("/:quiz_uuid", authMiddleware, getQuestionsForQuiz);

export default router;