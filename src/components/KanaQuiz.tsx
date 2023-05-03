import { type Kana } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';
import React from 'react';
import styled from 'styled-components';
import Question from './Question';

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

type KanaQuizProps = {
  kana: QuizQuestion[];
  onResult: (quizStats: QuizStats[]) => void;
};

type FeedbackProps = {
  isRight: boolean;
};

type QuizStats = {
  kana: Kana;
  wrongAnswers: Kana[];
  rightAnswers: Kana[];
  isRight: boolean;
};

export default function KanaQuiz({ kana, onResult }: KanaQuizProps) {
  const {
    step,
    totalSteps,
    start,
    quizQuestion,
    isDisabled,
    answerIsRight,
    checkAnswer,
    advanceStep,
  } = useQuizForm(kana);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    //onResult({ ...quizStats, isComplete: true });
  }

  return (
    <Form aria-labelledby="form-headline" onSubmit={handleSubmit}>
      <Headline id="form-headline">Kana Quiz</Headline>
      <Question
        question={quizQuestion.question}
        answers={quizQuestion.answers}
        onSelectAnswer={checkAnswer}
      />
      {start === undefined && <p>Please select an answer.</p>}
      {start !== undefined && answerIsRight && (
        <Feedback isRight={answerIsRight}>
          Well done, this is the correct answer!
        </Feedback>
      )}
      {!answerIsRight && (
        <Feedback isRight={answerIsRight}>Please try again!</Feedback>
      )}
      {step !== totalSteps && (
        <Button type="button" onClick={advanceStep} disabled={isDisabled}>
          Next
        </Button>
      )}
      {step === totalSteps && (
        <Button type="submit" disabled={isDisabled}>
          Result
        </Button>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-rows: 80px auto 10px 80px;
  gap: 24px;

  padding: 12px;
  height: 100vh;

  p {
    font-style: italic;
    margin: 0;
    padding: 0;
    display: grid;
    place-items: center;
  }
`;

const Headline = styled.h1`
  display: grid;
  place-items: center;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Feedback = styled.p<FeedbackProps>`
  color: ${props => (props.isRight ? 'green' : 'red')};
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
