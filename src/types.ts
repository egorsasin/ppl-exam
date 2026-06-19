export interface Question {
  /** Question identifier */
  questionNumber: string;
  /** Question text */
  question: string;
  /** Answer options. */
  answers: string[];
  /** Index of the correct answer in `answers` */
  correctAnswerIndex: number;
}

/** A single answer option after shuffling, carrying whether it is the correct one. */
export interface AnswerOption {
  text: string;
  isCorrect: boolean;
}

/** Per-question progress state shown in the question map sidebar. */
export type QuestionStatus = "unanswered" | "correct" | "wrong";

/** A persisted exam attempt: the fixed set of questions and current progress. */
export interface ExamSession {
  /** Identifiers of the selected questions, in fixed order. */
  questionNumbers: string[];
  /** Index of the question the user is currently on. */
  currentIndex: number;
}
