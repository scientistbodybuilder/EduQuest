import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getResultsForUser, // get all results for the authenticated user
  getResultsForQuiz, // get all results for a specific quiz 
  addResult // add a new result 
} from "../controllers/resultController.js";

const router = express.Router();

// save result
router.post("/", authMiddleware, addResult);

// get user's results
router.get("/user", authMiddleware, getResultsForUser);

// get all results for a specific quiz
router.get("/quiz/:quiz_uuid", authMiddleware, getResultsForQuiz);

export default router;