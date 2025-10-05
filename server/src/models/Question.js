import crypto from "crypto";

export class Question {
  constructor({ question_uuid, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, created_at }) {
    this.id = question_uuid || crypto.randomUUID();
    this.quiz_id = quiz_id;
    this.question_text = question_text;
    this.option_a = option_a;
    this.option_b = option_b;
    this.option_c = option_c;
    this.option_d = option_d;
    this.correct_option = correct_option;
    this.created_at = created_at || new Date().toISOString();
  }
}