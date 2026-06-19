import type { AnswerOption } from "../../types";

import type { QuestionCardProps } from "./QuestionCard.types";
import { getOptionClass } from "./QuestionCard.utils";

function QuestionCard({
  question,
  options,
  selectedIndex,
  revealResult,
  onSelect,
}: QuestionCardProps) {
  // In review mode the choice is locked once made; in exam mode it can change.
  const locked = revealResult && selectedIndex !== null;

  return (
    <article className='flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
      <span className='text-xs font-medium uppercase tracking-wide text-gray-400'>
        {question.questionNumber}
      </span>

      <h2 className='whitespace-pre-line text-lg font-semibold text-gray-900'>
        {question.question}
      </h2>

      <ul className='flex flex-col gap-3'>
        {options.map((option: AnswerOption) => (
          <li key={option.originalIndex}>
            <button
              type='button'
              disabled={locked}
              onClick={() => onSelect(option.originalIndex)}
              className={getOptionClass(option, selectedIndex, revealResult)}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default QuestionCard;
