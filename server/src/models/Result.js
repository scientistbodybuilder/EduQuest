import crypto from "crypto";

export class Result {
  constructor({ result_uuid, quiz_uuid, user_id, score, duration_seconds, won, created_at }) {
    this.result_uuid = result_uuid || crypto.randomUUID();
    this.quiz_uuid = quiz_uuid;
    this.user_id = user_id;
    this.score = score;
    this.duration_seconds = duration_seconds;
    this.won = won;
    this.created_at = created_at || new Date().toISOString();
  }
}