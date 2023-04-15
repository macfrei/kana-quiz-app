import styled from 'styled-components';
import { KanaType } from '../types/kana';

type QuestionProps = {
  question: KanaType;
  answers: KanaType[];
  onChange: (answer: KanaType) => void;
};

export default function Question({
  question,
  answers,
  onChange,
}: QuestionProps) {
  return (
    <Fieldset>
      <Legend>{question.kana}</Legend>
      {answers.map(answer => (
        <RadioButtonGroup key={answer.id}>
          <Input
            id={answer.id}
            type="radio"
            name={question.kana}
            value={answer.kana}
            onChange={() => onChange(answer)}
          />
          <Label htmlFor={answer.id}>{answer.pronunciation}</Label>
        </RadioButtonGroup>
      ))}
    </Fieldset>
  );
}

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
