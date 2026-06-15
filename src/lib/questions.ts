import type { AnswerOption, Question } from "../types";
import { shuffle } from "./shuffle";

/**
 * Builds the shuffled answer options for a question. In the source data the
 * correct answer is always at index 0, so shuffling is required to avoid a
 * predictable position.
 */
export function toShuffledAnswers(question: Question): AnswerOption[] {
  const options = question.answers.map((text, index) => ({
    text,
    isCorrect: index === question.correctAnswerIndex,
  }));

  return shuffle(options);
}
