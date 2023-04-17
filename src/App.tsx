import KanaQuiz from './components/KanaQuiz';
import hiragana from './assets/hiragana';
import { useState } from 'react';
import { QuizStats } from './types/kanaQuiz';
import QuizChoice from './components/QuizChoice';
import katakana from './assets/katakana';
import filterKana from './utils/filterKana';
import { Kana } from './types/kana';

const initialResult = {
  tries: 0,
  right: 0,
  wrong: 0,
  isComplete: false,
};

function App() {
  const [result, setResult] = useState<QuizStats>(initialResult);
  const [kana, setKana] = useState<Kana[]>([]);

  function handleResult(quizStats: QuizStats) {
    setResult(quizStats);
  }

  function chooseKana(kanaChoice: string[]) {
    const kanas = [...hiragana, ...katakana];
    const filteredKana = filterKana(kanas, kanaChoice);
    setKana(filteredKana);
  }

  return (
    <div>
      {kana.length === 0 && <QuizChoice onKanaChoice={chooseKana} />}
      {kana.length > 0 && !result.isComplete && (
        <KanaQuiz kana={kana} onResult={handleResult} />
      )}
      {result.isComplete && (
        <>
          <h1>Kana Quiz Result</h1>
          <ul>
            <li>Tries: {result.tries}</li>
            <li>Wrong: {result.wrong}</li>
          </ul>
          <button
            onClick={() => {
              setResult(initialResult);
              setKana([]);
            }}
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}

export default App;
