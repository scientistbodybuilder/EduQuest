export class Quiz {
  constructor({ quiz_uuid, user_id, title, comprehension_level, created_at }) {
    this.quiz_uuid = quiz_uuid;
    this.user_id = user_id;
    this.title = title || "Untitled Quiz";
    this.comprehension_level = comprehension_level || "medium";
    this.created_at = created_at || new Date().toISOString();
  }
}