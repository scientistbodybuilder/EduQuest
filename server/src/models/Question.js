export class Question {
  constructor({ question_uuid, quiz_uuid, question_text, option_a, option_b, option_c, option_d, correct_answer, created_at }) {
    this.question_uuid = question_uuid || crypto.randomUUID();
    this.quiz_uuid = quiz_uuid;
    this.question_text = question_text;
    this.option_a = option_a;
    this.option_b = option_b;
    this.option_c = option_c;
    this.option_d = option_d;
    this.correct_answer = correct_answer;
    this.created_at = created_at || new Date().toISOString();
  }
}