import type { AnswerOption } from "../../types";

const BASE_OPTION_CLASS =
  "w-full rounded-xl border px-4 py-3 text-left text-base transition-colors";

/**
 * Returns the Tailwind classes for an answer button.
 *
 * - Before answering (or in exam mode), the selected option is highlighted
 *   neutrally (blue) and options stay interactive.
 * - When `revealResult` is set and an answer is chosen, the correct option turns
 *   green and a wrong selection turns red.
 */
export function getOptionClass(
  option: AnswerOption,
  selectedIndex: number | null,
  revealResult: boolean,
): string {
  const isSelected = option.originalIndex === selectedIndex;
  const isAnswered = selectedIndex !== null;

  if (revealResult && isAnswered) {
    if (option.isCorrect) {
      return `${BASE_OPTION_CLASS} border-green-500 bg-green-50 text-green-900`;
    }
    if (isSelected) {
      return `${BASE_OPTION_CLASS} border-red-500 bg-red-50 text-red-900`;
    }
    return `${BASE_OPTION_CLASS} border-gray-200 text-gray-400`;
  }

  if (isSelected) {
    return `${BASE_OPTION_CLASS} cursor-pointer border-blue-500 bg-blue-50 text-blue-900`;
  }
  return `${BASE_OPTION_CLASS} cursor-pointer border-gray-200 text-gray-800 hover:bg-gray-50`;
}
