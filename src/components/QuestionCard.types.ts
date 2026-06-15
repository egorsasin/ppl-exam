import type { Question } from "../types";

export interface QuestionCardProps {
  question: Question;
  /** Called when the user picks an answer, with whether it was correct. */
  onAnswer: (isCorrect: boolean) => void;
}
