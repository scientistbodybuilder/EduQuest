import { supabase } from "../config/supabaseClient.js";
import { Result } from "../models/Result.js";
import resultRouter from "../routes/resultsRoutes.js";
import { insertResult, getResultsByQuizUuid, listUserQuizzes } from "../services/supabaseService.js";

export const ResultController = {
  async saveResult(req, res, next) {
    try {
      const { quiz_uuid, score, won, user_id } = req.body;
      // const user_id = req.user.id;

      const resultObj = new Result({ quiz_uuid, user_id, score, won });
      console.log('inserting result')
      console.log('obj: ',resultObj)
      const result = await insertResult(resultObj);
      console.log('result inserted')
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
  
  async getAllResults(req, res, next) {
    // console.log('reached get all results')
    try {
      const { userId } = req.body
      const quizzes = await listUserQuizzes(userId)
      // console.log('quizzes: ',quizzes)
      let resultsList = []
      for (let i=0; i < quizzes.length; i++) {
        const quizUid = quizzes[i].id
        const quizName = quizzes[i].title
        console.log('2')
        const quizRes = await getResultsByQuizUuid(quizUid)
        // console.log('quizRes: ', quizRes)
        let quizList = []
        for (let j=0; j < quizRes.length; j++ ) {
          quizRes[j].quiz_name = quizName
          quizRes[j].date = quizRes[j].created_at.split('T')[0]
          const { quiz_name, score, won, date, id } = quizRes[j]
          const finalRes = { quiz_name, score, won, date, id }
          quizList.push(finalRes)
        }
        
        resultsList = [...resultsList, ...quizList]
      }
      // console.log('results list: ', resultsList)

      res.json({ resultsList })
    } catch (err) {
      next(err)
    }
  }
};