import questionsData from "../../data/data.json";
import type { ExamSession, Question } from "../types";
import { shuffle } from "./shuffle";

const questions = questionsData as Question[];

const STORAGE_KEY = "ppl-exam-session";

/** Number of questions in a single exam attempt. */
export const EXAM_SIZE = 28;

/** Builds a new exam session with a random selection of questions. */
export function createExamSession(): ExamSession {
  const picked = shuffle(questions).slice(0, EXAM_SIZE);

  return {
    questionIds: picked.map((question) => question.id),
    currentIndex: 0,
    answers: Array<number | null>(picked.length).fill(null),
  };
}

/** Reads the saved exam session, or null when there is none or it is invalid. */
export function loadExamSession(): ExamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

/** Persists the exam session. */
export function saveExamSession(session: ExamSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

/** Removes the saved exam session. */
export function clearExamSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
