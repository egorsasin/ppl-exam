import type { ExamSession, Question } from "../../types";

export interface ExamResultProps {
  /** The finished exam session to summarise. */
  session: ExamSession;
  /** All questions for the section (used to look up by id). */
  questions: Question[];
  /** Starts a brand new exam attempt. */
  onRestart: () => void;
}
