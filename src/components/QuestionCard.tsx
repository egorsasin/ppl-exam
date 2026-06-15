import type { QuestionCardProps } from './QuestionCard.types';

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {question.questionNumber}
      </span>

      <h2 className="whitespace-pre-line text-lg font-semibold text-gray-900">
        {question.question}
      </h2>

      <ul className="flex flex-col gap-3">
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-base text-gray-800 transition-colors active:bg-gray-100"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default QuestionCard;
