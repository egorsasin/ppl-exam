export interface FinishScreenProps {
  /** Number of correctly answered questions. */
  correct: number;
  /** Total number of questions. */
  total: number;
  /** Restarts the quiz with a freshly shuffled deck. */
  onRestart: () => void;
}
