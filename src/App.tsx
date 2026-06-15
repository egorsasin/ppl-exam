import questionsData from '../data/data.json';
import QuestionCard from './components/QuestionCard';
import type { Question } from './types';

const questions = questionsData as Question[];

function App() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-3xl">
        <QuestionCard question={questions[0]} />
      </div>
    </main>
  );
}

export default App;
