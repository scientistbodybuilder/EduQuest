# 🎮 EduQuest

**Theme:** Revolutionizing Learning

---

## 📘 **Overview**

Accessibility in education is about *understanding*, not just reading. Every student learns differently, and at a different pace, but most study tools often treat comprehension like a one-size-fits-all solution. EduQuest reimagines studying through the lens of accessibility and personalization: upload any reading and our product transforms it into an interactive quiz calibrated to your comprehension level to make learning not only inclusive, but intuitive.

**EduQuest** is a first-person fighting game where the user’s knowledge is their weapon. We transform static study materials into a dynamic and accessible battle for mastery. Users can upload PDFs of their study notes and our system instantly parses them to generate personalized multiple-choice quiz battles based on the user’s comprehension level of the subject. This allows them to adjust the complexity of the questions, making sure no one is left behind. Answering correctly deals damage to the opponent, while answering incorrectly or too slowly results in your character taking damage. The goal is to defeat the enemy before they defeat you.

---

## ⚔️ **Main Idea**

EduQuest is a **first-person, two-character fighting game** powered by **AI-generated quiz battles**.

- Users **upload PDFs of lecture notes**.
- The **Gemini API** parses and generates **questions and answers**.
- Players **select their comprehension level**, ensuring the quiz adapts to their pace and ability.
- **Correct answers** deal damage to the enemy.
- **Wrong answers or timeouts** cause the player to lose health.
- The **battle ends** when one character’s health reaches zero or the game times out.

---

## 🚀 **MVP (Minimum Viable Product)**

✅ Users can **log in** via OAuth.

✅ Users can **upload a PDF** to generate a multiple-choice quiz.

✅ Users can **set their comprehension level**.

✅ Users battle an enemy 

✅ Correct answers **damage the enemy**.

✅ Wrong or late answers **damage the player**.

✅ Quizzes are **saved** under the user’s account.

---

## 🧩 **Planned Features & Future Expansion**

- **“Learn Mode”:** Guided explanation sessions tailored to the user.
- **Accessibility Enhancements:** Quizzes tailored for various learning disabilities.
- **Quiz Configurations:** Quiz length options (short, medium, or long) and timed questions.

---

## 🧑‍💻 **Tech Stack**

| Layer | Technology |
| --- | --- |
| **Frontend** | React |
| **Backend** | Express.js |
| **AI Integration** | Google Gemini API (for file parsing and question generation) |
| **Authentication** | OAuth (Auth0) |
| **Database** | Supabase / PostgreSQL |
