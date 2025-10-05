import { insertResult, getResultsByQuizUuid } from "../services/supabaseService.js";
import { v4 as uuidv4 } from "uuid";

export const ResultController = {
  async saveResult(req, res, next) {
    try {
      const { quiz_uuid, score, total } = req.body;
      const user_id = req.user.id;

      const result_uuid = uuidv4();
      const result = await insertResult({
        result_uuid,
        quiz_uuid,
        user_id,
        score,
        total,
      });

      res.status(201).json({ result });
    } catch (err) {
      next(err);
    }
  },

  async getResults(req, res, next) {
    try {
      const { quiz_uuid } = req.params;
      const results = await getResultsByQuizUuid(quiz_uuid);
      res.json({ results });
    } catch (err) {
      next(err);
    }
  },
};