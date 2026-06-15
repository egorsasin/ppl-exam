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
