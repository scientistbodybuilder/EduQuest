import express from "express";
import multer from "multer";
import { QuestionController } from "../controllers/questionController.js";

const questionRouter = express.Router();
const upload = multer();

questionRouter.post("/generate", upload.single("pdf"), QuestionController.generateQuestions);
questionRouter.get("/:quiz_uuid", QuestionController.getQuestions);

export default questionRouter;