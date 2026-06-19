export interface ProgressHeaderProps {
  /** 1-based index of the current question. */
  current: number;
  /** Total number of questions in the deck. */
  total: number;
  /** Number of correctly answered questions so far. */
  correct: number;
}
