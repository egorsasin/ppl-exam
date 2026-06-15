import { useState } from "react";

import questionsData from "../data/data.json";
import QuestionCard from "./components/QuestionCard";
import type { Question } from "./types";

const questions = questionsData as Question[];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleNext() {
    setAnswered(false);
    setCurrentIndex((index) => index + 1);
  }

  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-3xl flex-col gap-4'>
        <QuestionCard
          key={question.questionNumber}
          question={question}
          onAnswer={() => setAnswered(true)}
        />

        <button
          type='button'
          onClick={handleNext}
          disabled={!answered || isLast}
          className='cursor-pointer self-end rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50'
        >
          Dalej
        </button>
      </div>
    </main>
  );
}

export default App;
