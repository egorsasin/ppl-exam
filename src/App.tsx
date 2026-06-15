import { useState } from "react";

import questionsData from "../data/data.json";

import FinishScreen from "./components/FinishScreen";
import QuestionCard from "./components/QuestionCard";
import { shuffle } from "./lib/shuffle";
import type { Question } from "./types";

const questions = questionsData as Question[];

function App() {
  // Shuffle the deck once on start; reshuffled on restart.
  const [deck, setDeck] = useState<Question[]>(() => shuffle(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = deck[currentIndex];
  const isLast = currentIndex === deck.length - 1;

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
    setFinished(false);
  }

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-3xl flex-col gap-4'>
        {finished ? (
          <FinishScreen onRestart={handleRestart} />
        ) : (
          <>
            <QuestionCard
              key={question.questionNumber}
              question={question}
              onAnswer={() => setAnswered(true)}
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
    </main>
  );
}

export default App;
