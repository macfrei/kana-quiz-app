import KanaQuiz from './components/KanaQuiz';
import hiragana from './assets/hiragana';
import { useState } from 'react';
import QuizChoice from './components/QuizChoice';
import katakana from './assets/katakana';
import filterKana from './utils/filterKana';
import { Kana } from './types/kana';
import Result from './components/Result';
import styled from 'styled-components';
import shuffle from './utils/shuffle';
import { getRandomArrayElements } from './utils/getRandom';

type QuizStats = {
  kana: Kana;
  wrongAnswers: Kana[];
  rightAnswers: Kana[];
  isRight: boolean;
};

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

function App() {
  const [result, setResult] = useState<QuizStats[]>([]);
  const [kana, setKana] = useState<QuizQuestion[]>([]);

  function handleResult(quizStats: QuizStats[]) {
    setResult(quizStats);
  }

  function chooseKana(kanaChoice: string[]) {
    const kanas = [...hiragana, ...katakana];
    const filteredKana = filterKana(kanas, kanaChoice);
    const shuffledKana = shuffle(filteredKana) as Kana[];

    const preparedKanaQuizList = shuffledKana.map((kana, index, array) => {
      const kanaWithoutCurrentKana = [
        ...array.slice(0, index),
        ...array.slice(index + 1),
      ];

      const quizQuestion = {
        question: kana,
        answers: shuffle([
          ...getRandomArrayElements(kanaWithoutCurrentKana, 3),
          kana,
        ]) as Kana[],
      };
      return quizQuestion;
    });

    setKana(preparedKanaQuizList);
  }

  return (
    <AppContainer>
      {kana.length === 0 && <QuizChoice onKanaChoice={chooseKana} />}
      {kana.length > 0 && result.length === 0 && (
        <KanaQuiz kana={kana} onResult={handleResult} />
      )}
      {result.length > 0 && (
        <Result
          result={result}
          onReset={() => {
            setKana([]);
            setResult([]);
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
