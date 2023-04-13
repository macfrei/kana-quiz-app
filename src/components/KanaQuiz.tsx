import { type KanaType } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';
import React from 'react';
import styled from 'styled-components';

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
    <Form aria-labelledby="form-headline" onSubmit={handleSubmit}>
      <Headline id="form-headline">Kana Quiz</Headline>
      <Fieldset>
        <Legend>{quizQuestion.question.kana}</Legend>
        {quizQuestion.answers.map(answer => (
          <RadioButtonGroup key={answer.id}>
            <Input
              id={answer.id}
              type="radio"
              name={quizQuestion.question.kana}
              value={answer.kana}
              onChange={() => checkAnswer(answer)}
            />
            <Label htmlFor={answer.id}>{answer.pronunciation}</Label>
          </RadioButtonGroup>
        ))}
      </Fieldset>
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

const Headline = styled.h2`
  display: grid;
  place-items: center;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Fieldset = styled.fieldset`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  border: none;
  margin: 0;
  padding: 0;
`;

const RadioButtonGroup = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  input[type='radio']:checked + label {
    background-color: black;
    color: white;
  }
`;

const Legend = styled.legend`
  font-size: 400%;
  text-align: center;
  padding: 40px 0;
`;

const Label = styled.label`
  display: grid;
  place-items: center;
  border: 1px solid black;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  font-size: 200%;
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
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
