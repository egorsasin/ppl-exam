import { useMemo, useState } from "react";

import type { AnswerOption } from "../types";
import { toShuffledAnswers } from "../lib/questions";

import type { QuestionCardProps } from "./QuestionCard.types";
import { getOptionClass } from "./QuestionCard.utils";

function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  // Shuffle once per question so the order is stable across re-renders.
  const options: AnswerOption[] = useMemo(
    () => toShuffledAnswers(question),
    [question],
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isAnswered = selectedIndex !== null;

  function handleSelect(index: number) {
    setSelectedIndex(index);
    onAnswer();
  }

  return (
    <article className='flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
      <span className='text-xs font-medium uppercase tracking-wide text-gray-400'>
        {question.questionNumber}
      </span>

      <h2 className='whitespace-pre-line text-lg font-semibold text-gray-900'>
        {question.question}
      </h2>

      <ul className='flex flex-col gap-3'>
        {options.map((option: AnswerOption, index: number) => (
          <li key={index}>
            <button
              type='button'
              disabled={isAnswered}
              onClick={() => handleSelect(index)}
              className={getOptionClass(option, index, selectedIndex)}
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
