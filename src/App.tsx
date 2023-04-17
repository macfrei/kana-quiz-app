import KanaQuiz from './components/KanaQuiz';
import hiragana from './assets/hiragana';
import { useState } from 'react';
import { QuizStats } from './types/kanaQuiz';
import QuizChoice from './components/QuizChoice';
import katakana from './assets/katakana';
import filterKana from './utils/filterKana';
import { Kana } from './types/kana';
import Result from './components/Result';
import styled from 'styled-components';

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
    <AppContainer>
      {kana.length === 0 && <QuizChoice onKanaChoice={chooseKana} />}
      {kana.length > 0 && !result.isComplete && (
        <KanaQuiz kana={kana} onResult={handleResult} />
      )}
      {result.isComplete && (
        <Result
          result={result}
          onReset={() => {
            setKana([]);
            setResult(initialResult);
          }}
        />
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  max-width: 600px;
  max-height: 800px;
  margin: 0 auto;
`;
