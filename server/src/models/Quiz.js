import crypto from "crypto";

export class Quiz {
  constructor(obj) {
    this.id = obj.quiz_uuid;
    this.user_id = obj.user_id;
    this.title = obj.title || "Untitled Quiz";
    this.comprehension_level = obj.comprehension_level || "medium";
    this.created_at = obj.created_at || new Date().toISOString();
  }
}