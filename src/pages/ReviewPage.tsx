import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import FinishScreen from "../components/FinishScreen";
import ProgressHeader from "../components/ProgressHeader";
import QuestionCard from "../components/QuestionCard";
import QuestionMap from "../components/QuestionMap";
import { getSectionById } from "../config/sections";
import { toShuffledAnswers } from "../lib/questions";
import { shuffle } from "../lib/shuffle";
import type { Question, QuestionStatus } from "../types";

function ReviewPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = getSectionById(sectionId ?? "");

  const [deck, setDeck] = useState<Question[]>(() =>
    section ? shuffle(section.questions) : [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [statuses, setStatuses] = useState<QuestionStatus[]>(() =>
    Array<QuestionStatus>(deck.length).fill("unanswered"),
  );
  const [finished, setFinished] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  if (!section) {
    return <Navigate to='/' replace />;
  }

  const question = deck[currentIndex];
  const options = useMemo(() => toShuffledAnswers(question), [question]);
  const isLast = currentIndex === deck.length - 1;
  const answered = selectedIndex !== null;

  function handleSelect(originalIndex: number) {
    if (answered) {
      return;
    }

    setSelectedIndex(originalIndex);

    const isCorrect = options.some(
      (option) => option.originalIndex === originalIndex && option.isCorrect,
    );

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }

    setStatuses((prev) => {
      const next = [...prev];
      next[currentIndex] = isCorrect ? "correct" : "wrong";
      return next;
    });
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setSelectedIndex(null);
    setCurrentIndex((index) => index + 1);
  }

  function handleRestart() {
    const reshuffled = shuffle(section!.questions);
    setDeck(reshuffled);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCorrectCount(0);
    setStatuses(Array<QuestionStatus>(reshuffled.length).fill("unanswered"));
    setFinished(false);
  }

  const backButton = (
    <Link
      to={`/${section.id}`}
      aria-label='Wróć do działu'
      className='cursor-pointer rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm hover:bg-gray-50'
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
              <path
                d='M4 6h16M4 12h16M4 18h16'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>

        {finished ? (
          <FinishScreen
            correct={correctCount}
            total={deck.length}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <ProgressHeader
              current={currentIndex + 1}
              total={deck.length}
              correct={correctCount}
            />

            <QuestionCard
              question={question}
              options={options}
              selectedIndex={selectedIndex}
              revealResult={answered}
              onSelect={handleSelect}
            />

            <button
              type='button'
              onClick={handleNext}
              disabled={!answered}
              className='cursor-pointer self-end rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isLast ? "Zakończ" : "Dalej"}
            </button>
          </>
        )}
      </div>

      <QuestionMap
        statuses={statuses}
        currentIndex={finished ? -1 : currentIndex}
        open={mapOpen}
        onClose={() => setMapOpen(false)}
      />
    </main>
  );
}

export default ReviewPage;
