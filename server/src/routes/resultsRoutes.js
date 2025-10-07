import express from "express";
import { ResultController } from "../controllers/resultsController.js";

const resultRouter = express.Router();

resultRouter.post("/save", ResultController.saveResult);
resultRouter.get("/:quiz_uuid", ResultController.getResults);
resultRouter.post("/all", ResultController.getAllResults);

export default resultRouter;