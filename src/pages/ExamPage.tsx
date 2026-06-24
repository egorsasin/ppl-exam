import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import ExamResult from "../components/ExamResult";
import QuestionCard from "../components/QuestionCard";
import QuestionMap from "../components/QuestionMap";
import { getSectionById } from "../config/sections";
import {
  clearExamSession,
  createExamSession,
  loadExamSession,
  saveExamSession,
} from "../lib/examSession";
import { getQuestionById, toExamAnswers } from "../lib/questions";
import type { ExamSession, QuestionStatus } from "../types";

function ExamStartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className='flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
      <h1 className='text-xl font-semibold text-gray-900'>Tryb egzaminu</h1>
      <p className='text-gray-600'>28 losowych pytań. Postęp jest zapisywany.</p>

      <button
        type='button'
        onClick={onStart}
        className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
      >
        Rozpocznij egzamin
      </button>
    </div>
  );
}

function ExamPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = getSectionById(sectionId ?? "");

  const [session, setSession] = useState<ExamSession | null>(() =>
    sectionId ? loadExamSession(sectionId) : null,
  );
  const [mapOpen, setMapOpen] = useState(false);

  if (!section) {
    return <Navigate to='/' replace />;
  }

  function update(next: ExamSession) {
    setSession(next);
    saveExamSession(next, section!.id);
  }

  function handleStart() {
    update(createExamSession(section!.questions, section!.examSize));
  }

  function handleAbandon() {
    clearExamSession(section!.id);
    setSession(null);
  }

  const backButton = (
    <Link
      to={`/${section.id}`}
      aria-label='Wróć do działu'
      className='inline-flex cursor-pointer rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm hover:bg-gray-50'
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
  );

  if (!session) {
    return (
      <main className='flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-6'>
        <div className='flex w-full max-w-md flex-col gap-4'>
          <div className='self-start'>{backButton}</div>
          <ExamStartScreen onStart={handleStart} />
        </div>
      </main>
    );
  }

  const { questionIds, currentIndex, answers, finished } = session;

  if (finished) {
    return (
      <main className='flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-6'>
        <div className='flex w-full max-w-3xl flex-col gap-4'>
          <div className='self-start'>{backButton}</div>
          <ExamResult
            session={session}
            questions={section.questions}
            onRestart={handleStart}
          />
        </div>
      </main>
    );
  }

  const total = questionIds.length;
  const question = getQuestionById(section.questions, questionIds[currentIndex]);
  const options = question ? toExamAnswers(question) : [];
  const selected = answers[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;
  const percent = Math.round(((currentIndex + 1) / total) * 100);

  const statuses: QuestionStatus[] = answers.map((answer) =>
    answer === null ? "unanswered" : "answered",
  );

  function goTo(index: number) {
    update({ questionIds, currentIndex: index, answers, finished });
  }

  function handleSelect(originalIndex: number) {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = originalIndex;
    update({ questionIds, currentIndex, answers: nextAnswers, finished });
  }

  function handleFinish() {
    update({ questionIds, currentIndex, answers, finished: true });
  }

  function handleTileSelect(index: number) {
    setMapOpen(false);
    goTo(index);
  }

  return (
    <main className='flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-3xl flex-col gap-4'>
        <div className='flex items-center justify-between'>
          {backButton}

          <button
            type='button'
            onClick={() => setMapOpen(true)}
            aria-label='Pokaż pytania'
            className='cursor-pointer rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm hover:bg-gray-50'
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M4 6h16M4 12h16M4 18h16' strokeLinecap='round' />
            </svg>
          </button>
        </div>

        <header className='flex flex-col gap-2'>
          <span className='text-sm text-gray-500'>
            Pytanie {currentIndex + 1} / {total}
          </span>
          <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full rounded-full bg-blue-600 transition-all'
              style={{ width: `${percent}%` }}
            />
          </div>
        </header>

        {question && (
          <QuestionCard
            question={question}
            options={options}
            selectedIndex={selected}
            revealResult={false}
            onSelect={handleSelect}
          />
        )}

        <div className='flex items-center justify-between'>
          <button
            type='button'
            onClick={() => goTo(currentIndex - 1)}
            disabled={isFirst}
            className='cursor-pointer rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Wstecz
          </button>

          <button
            type='button'
            onClick={isLast ? handleFinish : () => goTo(currentIndex + 1)}
            className='cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
          >
            {isLast ? "Zakończ" : "Dalej"}
          </button>
        </div>

        <button
          type='button'
          onClick={handleAbandon}
          className='cursor-pointer self-center text-sm text-gray-400 underline hover:text-gray-600'
        >
          Przerwij egzamin
        </button>
      </div>

      <QuestionMap
        statuses={statuses}
        currentIndex={currentIndex}
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelect={handleTileSelect}
      />
    </main>
  );
}

export default ExamPage;
