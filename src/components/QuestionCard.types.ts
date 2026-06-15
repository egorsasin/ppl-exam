import type { Question } from "../types";

export interface QuestionCardProps {
  question: Question;
  /** Called when the user picks an answer (the question becomes answered). */
  onAnswer: () => void;
}
