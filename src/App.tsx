import { useState } from "react";

import questionsData from "../data/data.json";

import FinishScreen from "./components/FinishScreen";
import ProgressHeader from "./components/ProgressHeader";
import QuestionCard from "./components/QuestionCard";
import QuestionMap from "./components/QuestionMap";
import { shuffle } from "./lib/shuffle";
import type { Question, QuestionStatus } from "./types";

const questions = questionsData as Question[];

function createStatuses(): QuestionStatus[] {
  return Array<QuestionStatus>(questions.length).fill("unanswered");
}

function App() {
  // Shuffle the deck once on start; reshuffled on restart.
  const [deck, setDeck] = useState<Question[]>(() => shuffle(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [statuses, setStatuses] = useState<QuestionStatus[]>(createStatuses);
  const [finished, setFinished] = useState(false);

  const question = deck[currentIndex];
  const isLast = currentIndex === deck.length - 1;

  function handleAnswer(isCorrect: boolean) {
    setAnswered(true);
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
    setAnswered(false);
    setCurrentIndex((index) => index + 1);
  }

  function handleRestart() {
    setDeck(shuffle(questions));
    setCurrentIndex(0);
    setAnswered(false);
    setCorrectCount(0);
    setStatuses(createStatuses());
    setFinished(false);
  }

  return (
    <main className='flex min-h-dvh w-full justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-5xl flex-col gap-4 lg:flex-row lg:items-start'>
        <div className='flex flex-1 flex-col gap-4'>
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
                key={question.questionNumber}
                question={question}
                onAnswer={handleAnswer}
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
        />
      </div>
    </main>
  );
}

export default App;
