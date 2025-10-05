import express from "express";
import multer from "multer";
import { QuestionController } from "../controllers/questionController.js";

const router = express.Router();
const upload = multer();

router.post("/generate", upload.single("pdf"), QuestionController.generateQuestions);
router.get("/:quiz_uuid", QuestionController.getQuestions);

export default router;