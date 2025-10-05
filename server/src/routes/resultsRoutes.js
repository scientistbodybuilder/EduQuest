import express from "express";
import { ResultController } from "../controllers/resultController.js";

const router = express.Router();

router.post("/save", ResultController.saveResult);
router.get("/:quiz_uuid", ResultController.getResults);

export default router;