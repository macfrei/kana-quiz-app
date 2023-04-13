import { type KanaType } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';
import React from 'react';

type KanaQuizProps = {
  kana: KanaType[];
};

export default function KanaQuiz({ kana }: KanaQuizProps) {
  const {
    quizQuestion,
    quizStats,
    quizKanaLength,
    isDisabled,
    checkAnswer,
    getNewQuestion,
  } = useQuizForm(kana);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(quizStats);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>{quizQuestion.question.kana}</legend>
        {quizQuestion.answers.map(answer => (
          <label key={answer.id}>
            {answer.pronunciation}
            <input
              type="radio"
              name={quizQuestion.question.kana}
              value={answer.kana}
              onChange={() => checkAnswer(answer)}
            />
          </label>
        ))}
      </fieldset>
      {quizKanaLength > 1 && (
        <button
          type="button"
          onClick={() => getNewQuestion()}
          disabled={isDisabled}
        >
          Next
        </button>
      )}
      {quizKanaLength === 1 && (
        <button type="submit" disabled={isDisabled}>
          Result
        </button>
      )}
    </form>
  );
}
