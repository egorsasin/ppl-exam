import questionsData from '../data/data.json'
import type { Question } from './types'

const questions = questionsData as Question[]

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="app-title text-3xl font-bold">
        Załadowano {questions.length} pytań
      </h1>
    </div>
  )
}

export default App
