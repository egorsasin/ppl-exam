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
