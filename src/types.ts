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
