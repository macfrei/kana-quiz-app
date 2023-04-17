import styled from 'styled-components';
import { type Kana } from '../types/kana';
import InputWithLabel from './InputWithLabel';

type QuestionProps = {
  question: Kana;
  answers: Kana[];
  onSelectAnswer: (answer: Kana) => void;
};

export default function Question({
  question,
  answers,
  onSelectAnswer,
}: QuestionProps) {
  function handleChange(event: React.ChangeEvent, answer: Kana) {
    onSelectAnswer(answer);
  }

  return (
    <Fieldset>
      <Legend>{question.kana}</Legend>
      {answers.map(answer => (
        <InputWithLabel
          key={answer.id}
          labelText={answer.pronunciation}
          id={answer.id}
          type="radio"
          name={question.kana}
          value={answer.kana}
          onChange={event => handleChange(event, answer)}
        />
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

const Legend = styled.legend`
  font-size: 400%;
  text-align: center;
  padding: 40px 0;
`;
