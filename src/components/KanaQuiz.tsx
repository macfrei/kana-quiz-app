import { type Kana } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';
import React, { useState } from 'react';
import styled from 'styled-components';
import Question from './Question';

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

type KanaQuizProps = {
  kana: QuizQuestion[];
  onResult: (quizStats: QuizStats) => void;
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
  const [quizStats, setQuizStats] = useState<QuizStats[]>([]);
  const [step, setStep] = useState(0);

  const totalSteps = kana.length - 1;
  const quizQuestion = kana[step];

  const start = quizStats.find(
    el => el.kana.id === quizQuestion.question.id
  )?.isRight;
  const answerIsRight =
    !quizStats.find(el => el.kana.id === quizQuestion.question.id)?.isRight ??
    false;

  const isDisabled =
    quizStats.find(el => el.kana.id === quizQuestion.question.id)?.isRight ??
    true;

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    //onResult({ ...quizStats, isComplete: true });
  }

  function checkAnswer(answer: Kana) {
    const index = quizStats.findIndex(
      el => el.kana.id === quizQuestion.question.id
    );

    const isRight = answer.id === quizQuestion.question.id;
    const key = isRight ? 'rightAnswers' : 'wrongAnswers';

    if (index < 0) {
      setQuizStats([
        {
          kana: quizQuestion.question,
          wrongAnswers: isRight ? [] : [answer],
          rightAnswers: isRight ? [answer] : [],
          isRight: !isRight,
        },
        ...quizStats,
      ]);
    }

    if (index >= 0) {
      const currentKanaStats = quizStats[index];

      const updatedQuizStats = [
        ...quizStats.slice(0, index),
        {
          ...currentKanaStats,
          isRight: !isRight,
          [`${key}`]: [
            ...(currentKanaStats[key as keyof QuizStats] as Kana[]),
            answer,
          ],
        },
        ...quizStats.slice(index + 1),
      ];

      setQuizStats(updatedQuizStats);
    }
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
        <Button
          type="button"
          onClick={() => setStep(step => step + 1)}
          disabled={isDisabled}
        >
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
