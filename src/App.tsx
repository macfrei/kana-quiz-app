import KanaQuiz from './components/KanaQuiz';
import hiragana from './assets/hiragana';
import { useState } from 'react';
import { QuizStats } from './types/kanaQuiz';

const initialResult = {
  tries: 0,
  right: 0,
  wrong: 0,
  isComplete: false,
};

function App() {
  const [result, setResult] = useState<QuizStats>(initialResult);

  function handleResult(quizStats: QuizStats) {
    setResult(quizStats);
  }

  return (
    <div>
      {result.isComplete ? (
        <>
          <h1>Kana Quiz Result</h1>
          <ul>
            <li>Tries: {result.tries}</li>
            <li>Wrong: {result.wrong}</li>
          </ul>
          <button onClick={() => setResult(initialResult)}>Try again</button>
        </>
      ) : (
        <KanaQuiz kana={hiragana} onResult={handleResult} />
      )}
    </div>
  );
}

export default App;
