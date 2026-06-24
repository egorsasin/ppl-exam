import type { AnswerOption, Question } from "../types";
import { shuffle, shuffleWithSeed } from "./shuffle";

/** Looks up a question by its unique id within a section's question list. */
export function getQuestionById(
  questions: Question[],
  id: number,
): Question | undefined {
  return questions.find((q) => q.id === id);
}

/** Builds the answer options, keeping each one's original index and correctness. */
function buildOptions(question: Question): AnswerOption[] {
  return question.answers.map((text, originalIndex) => ({
    text,
    originalIndex,
    isCorrect: originalIndex === question.correctAnswerIndex,
  }));
}

/**
 * Randomly shuffled options (review mode). In the source data the correct answer
 * is always at index 0, so shuffling is required to avoid a predictable position.
 */
export function toShuffledAnswers(question: Question): AnswerOption[] {
  return shuffle(buildOptions(question));
}

/**
 * Deterministically shuffled options (exam mode), seeded by question id so the
 * order stays stable across navigation and reloads.
 */
export function toExamAnswers(question: Question): AnswerOption[] {
  return shuffleWithSeed(buildOptions(question), question.id);
}
