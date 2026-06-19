import type { AnswerOption, Question } from "../../types";

export interface QuestionCardProps {
  question: Question;
  /** The (already shuffled) answer options to render. */
  options: AnswerOption[];
  /** Original index of the chosen answer, or null when unanswered. */
  selectedIndex: number | null;
  /**
   * When true, reveals correct/wrong after answering and locks the choice
   * (review mode). When false, only the selection is highlighted and it can be
   * changed (exam mode).
   */
  revealResult: boolean;
  /** Records the user's choice by its original answer index. */
  onSelect: (originalIndex: number) => void;
}
