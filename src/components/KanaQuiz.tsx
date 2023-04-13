import { useState } from 'react';
import { type KanaType } from '../types/kana';
import {
  getRandomArrayElement,
  getRandomArrayElements,
} from '../lib/getRandom';
import shuffle from '../lib/shuffle';

type KanaQuizProps = {
  kana: KanaType[];
};

type CurrentQuestion = {
  question: KanaType;
  answers: KanaType[];
};

type QuizStats = {
  tries: number;
  right: number;
  wrong: number;
};

export default function KanaQuiz({ kana }: KanaQuizProps) {
  const [quizKana, setQuizKana] = useState<KanaType[]>(kana);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(
    createNewQuestion(quizKana, kana)
  );
  const [quizStats, setQuizStats] = useState<QuizStats>({
    tries: 0,
    right: 0,
    wrong: 0,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  function createNewQuestion(
    quizList: KanaType[],
    originalList: KanaType[]
  ): CurrentQuestion {
    const question = getRandomArrayElement(quizList) as KanaType;
    const answers = shuffle([
      ...getRandomArrayElements(originalList, 3),
      question,
    ]) as KanaType[];

    const currentQuestion = {
      question,
      answers,
    };

    return currentQuestion;
  }

  function checkAnswer(answer: KanaType) {
    if (answer.id !== currentQuestion.question.id) {
      setQuizStats(quizStats => ({
        ...quizStats,
        tries: quizStats.tries + 1,
        wrong: quizStats.wrong + 1,
      }));
      setIsDisabled(true);
    }
    if (answer.id === currentQuestion.question.id) {
      setQuizStats(quizStats => ({
        ...quizStats,
        tries: quizStats.tries + 1,
        right: quizStats.right + 1,
      }));
      setIsDisabled(false);
    }
  }

  function getNewQuestion() {
    const index = quizKana.findIndex(
      el => el.id === currentQuestion.question.id
    );
    const updatedQuizKana = [
      ...quizKana.slice(0, index),
      ...quizKana.slice(index + 1),
    ];

    const newQuestion = createNewQuestion(updatedQuizKana, kana);

    setQuizKana(updatedQuizKana);
    setCurrentQuestion(newQuestion);
    setIsDisabled(true);
  }

  return (
    <form>
      <fieldset>
        <legend>{currentQuestion.question.kana}</legend>
        {currentQuestion.answers.map(answer => (
          <label key={answer.id}>
            {answer.pronunciation}
            <input
              type="radio"
              name={currentQuestion.question.kana}
              value={answer.kana}
              onChange={() => checkAnswer(answer)}
            />
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={() => getNewQuestion()}
        disabled={isDisabled}
      >
        Next
      </button>
      <button type="submit">Result</button>
    </form>
  );
}
