import type { QuestionStatus } from "../types";

const BASE_TILE_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium";

/**
 * Returns the Tailwind classes for a question tile: transparent when not yet
 * answered, green when correct, red when wrong. The current question gets a ring.
 */
export function getTileClass(
  status: QuestionStatus,
  isCurrent: boolean,
): string {
  const current = isCurrent ? " ring-2 ring-blue-600 ring-offset-2" : "";

  if (status === "correct") {
    return `${BASE_TILE_CLASS} border-green-600 bg-green-600 text-white${current}`;
  }

  if (status === "wrong") {
    return `${BASE_TILE_CLASS} border-red-600 bg-red-600 text-white${current}`;
  }

  return `${BASE_TILE_CLASS} border-gray-600 bg-transparent text-gray-600${current}`;
}
