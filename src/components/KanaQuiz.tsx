import { type Kana } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';
import React from 'react';
import styled from 'styled-components';
import Question from './Question';
import { QuizStats } from '../types/kanaQuiz';

type KanaQuizProps = {
  kana: Kana[];
  onResult: (quizStats: QuizStats) => void;
};

export default function KanaQuiz({ kana, onResult }: KanaQuizProps) {
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

    onResult({ ...quizStats, isComplete: true });
  }

  return (
    <Form aria-labelledby="form-headline" onSubmit={handleSubmit}>
      <Headline id="form-headline">Kana Quiz</Headline>
      <Question
        question={quizQuestion.question}
        answers={quizQuestion.answers}
        onSelectAnswer={checkAnswer}
      />
      {quizKanaLength > 1 && (
        <Button
          type="button"
          onClick={() => getNewQuestion()}
          disabled={isDisabled}
        >
          Next
        </Button>
      )}
      {quizKanaLength === 1 && (
        <Button type="submit" disabled={isDisabled}>
          Result
        </Button>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-rows: 80px auto 80px;
  gap: 24px;

  padding: 12px;
  height: 100vh;
`;

const Headline = styled.h1`
  display: grid;
  place-items: center;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 16px;
  border: 1px solid;
  padding: 0 12px;
  width: 200px;
  height: 50px;

  place-self: center;
`;
