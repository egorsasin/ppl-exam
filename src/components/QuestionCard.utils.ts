import type { AnswerOption } from "../types";

const BASE_OPTION_CLASS =
  "w-full rounded-xl border px-4 py-3 text-left text-base transition-colors";

/**
 * Returns the Tailwind classes for an answer button based on the current
 * selection. Before answering every option is interactive; after answering the
 * correct option turns green and a wrong selection turns red.
 */
export function getOptionClass(
  option: AnswerOption,
  index: number,
  selectedIndex: number | null,
): string {
  const isAnswered = selectedIndex !== null;

  if (!isAnswered) {
    return `${BASE_OPTION_CLASS} cursor-pointer border-gray-200 text-gray-800 hover:bg-gray-50 active:bg-gray-100`;
  }
  if (option.isCorrect) {
    return `${BASE_OPTION_CLASS} border-green-500 bg-green-50 text-green-900`;
  }
  if (index === selectedIndex) {
    return `${BASE_OPTION_CLASS} border-red-500 bg-red-50 text-red-900`;
  }
  return `${BASE_OPTION_CLASS} border-gray-200 text-gray-400`;
}
