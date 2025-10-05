import { Result } from "../models/Result.js";
import { insertResult, getResultsByQuizUuid } from "../services/supabaseService.js";

export const ResultController = {
  async saveResult(req, res, next) {
    try {
      const { quiz_uuid, score, duration_seconds, won } = req.body;
      const user_id = req.user.id;

      const resultObj = new Result({ quiz_uuid, user_id, score, duration_seconds, won });

      const result = await insertResult(resultObj);
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
  }
};