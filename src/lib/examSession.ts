import type { ExamSession, Question } from "../types";
import { shuffle } from "./shuffle";

const STORAGE_KEY_PREFIX = "ppl-exam-session";

/** Minimum percentage of correct answers required to pass the exam. */
export const PASS_PERCENT = 75;

function storageKey(sectionId: string): string {
  return `${STORAGE_KEY_PREFIX}-${sectionId}`;
}

/** Builds a new exam session with a random selection of questions. */
export function createExamSession(questions: Question[], examSize: number): ExamSession {
  const picked = shuffle(questions).slice(0, examSize);

  return {
    questionIds: picked.map((question) => question.id),
    currentIndex: 0,
    answers: Array<number | null>(picked.length).fill(null),
    finished: false,
  };
}

/** Reads the saved exam session for a section, or null when there is none or it is invalid. */
export function loadExamSession(sectionId: string): ExamSession | null {
  try {
    const raw = localStorage.getItem(storageKey(sectionId));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<ExamSession>;
    const isValid =
      Array.isArray(parsed.questionIds) &&
      typeof parsed.currentIndex === "number" &&
      Array.isArray(parsed.answers);

    return isValid ? (parsed as ExamSession) : null;
  } catch {
    return null;
  }
}

/** Persists the exam session for a section. */
export function saveExamSession(
  session: ExamSession,
  sectionId: string,
): void {
  localStorage.setItem(storageKey(sectionId), JSON.stringify(session));
}

/** Removes the saved exam session for a section. */
export function clearExamSession(sectionId: string): void {
  localStorage.removeItem(storageKey(sectionId));
}
