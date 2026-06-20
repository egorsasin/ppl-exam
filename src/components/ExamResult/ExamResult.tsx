import { PASS_PERCENT } from "../../lib/examSession";
import { getQuestionById, toExamAnswers } from "../../lib/questions";
import QuestionCard from "../QuestionCard";

import type { ExamResultProps } from "./ExamResult.types";

const noop = () => {};

function ExamResult({ session, onRestart }: ExamResultProps) {
  const items = session.questionIds.map((id, index) => {
    const question = getQuestionById(id);
    return {
      question,
      options: question ? toExamAnswers(question) : [],
      selected: session.answers[index],
    };
  });

  const total = session.questionIds.length;
  const correct = items.filter(
    (item) =>
      item.question != null &&
      item.selected === item.question.correctAnswerIndex,
  ).length;
  const incorrect = total - correct;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percent >= PASS_PERCENT;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            passed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {passed ? "Egzamin zdany" : "Egzamin niezdany"}
        </span>

        <h1 className='text-3xl font-bold text-gray-900'>{percent}%</h1>

        <p className='text-gray-600'>
          Poprawne: <span className='font-semibold text-green-700'>{correct}</span>
          {" · "}
          Niepoprawne: <span className='font-semibold text-red-700'>{incorrect}</span>
          {" · "}
          {total} pytań
        </p>

        <p className='text-sm text-gray-400'>Próg zaliczenia: {PASS_PERCENT}%</p>

        <button
          type='button'
          onClick={onRestart}
          className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
        >
          Nowy egzamin
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        {items.map(
          (item, index) =>
            item.question && (
              <QuestionCard
                key={index}
                question={item.question}
                options={item.options}
                selectedIndex={item.selected}
                revealResult
                onSelect={noop}
              />
            ),
        )}
      </div>
    </div>
  );
}

export default ExamResult;
