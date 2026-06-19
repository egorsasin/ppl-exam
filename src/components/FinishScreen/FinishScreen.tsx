import type { FinishScreenProps } from "./FinishScreen.types";

function FinishScreen({ correct, total, onRestart }: FinishScreenProps) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <article className='flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
      <h2 className='text-xl font-semibold text-gray-900'>Test ukończony</h2>

      <p className='text-base text-gray-600'>
        Wynik:{" "}
        <span className='font-semibold text-gray-900'>
          {correct} / {total}
        </span>{" "}
        ({percent}%)
      </p>

      <button
        type='button'
        onClick={onRestart}
        className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
      >
        Zacznij od nowa
      </button>
    </article>
  );
}

export default FinishScreen;
