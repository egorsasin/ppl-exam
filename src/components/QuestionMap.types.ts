import type { QuestionStatus } from "../types";

export interface QuestionMapProps {
  /** Status of every question in deck order. */
  statuses: QuestionStatus[];
  /** Index of the question currently shown, or -1 when none. */
  currentIndex: number;
}
