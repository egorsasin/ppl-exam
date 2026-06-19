import { useState } from "react";
import { Link } from "react-router-dom";

import {
  clearExamSession,
  createExamSession,
  saveExamSession,
  loadExamSession,
} from "../lib/examSession";
import type { ExamSession } from "../types";

function ExamPage() {
  const [session, setSession] = useState<ExamSession | null>(() =>
    loadExamSession(),
  );

  function handleStart() {
    const created = createExamSession();
    saveExamSession(created);
    setSession(created);
  }

  function handleAbandon() {
    clearExamSession();
    setSession(null);
  }

  return (
    <main className='flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <Link
          to='/'
          aria-label='Strona główna'
          className='cursor-pointer self-start rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm hover:bg-gray-50'
        >
          <svg
            className='h-5 w-5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              d='M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>

        {session ? (
          <div className='flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Egzamin w toku
            </h1>
            <p className='text-gray-600'>
              Pytanie {session.currentIndex + 1} / {session.questionIds.length}
            </p>

            <button
              type='button'
              onClick={handleAbandon}
              className='cursor-pointer rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100'
            >
              Przerwij
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Tryb egzaminu
            </h1>
            <p className='text-gray-600'>
              28 losowych pytań. Postęp jest zapisywany.
            </p>

            <button
              type='button'
              onClick={handleStart}
              className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
            >
              Rozpocznij egzamin
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default ExamPage;
