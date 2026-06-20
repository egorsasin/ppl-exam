import type { ExamSession } from "../../types";

export interface ExamResultProps {
  /** The finished exam session to summarise. */
  session: ExamSession;
  /** Starts a brand new exam attempt. */
  onRestart: () => void;
}
