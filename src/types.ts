export interface Question {
  /** Unique identifier (questionNumber is not unique). */
  id: number;
  /** Question number label (not unique). */
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
  /** Ids of the selected questions, in fixed order. */
  questionIds: number[];
  /** Index of the question the user is currently on. */
  currentIndex: number;
}
