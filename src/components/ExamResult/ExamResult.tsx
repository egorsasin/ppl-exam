import type { ExamResultProps } from "./ExamResult.types";

function ExamResult({ onRestart }: ExamResultProps) {
  return (
    <div className='flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
      <h1 className='text-xl font-semibold text-gray-900'>Egzamin zakończony</h1>

      {/* Result details will go here. */}

      <button
        type='button'
        onClick={onRestart}
        className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
      >
        Nowy egzamin
      </button>
    </div>
  );
}

export default ExamResult;
