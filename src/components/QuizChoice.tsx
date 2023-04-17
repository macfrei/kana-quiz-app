import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styled from 'styled-components';

type KanaChoice = {
  katakana: boolean;
  hiragana: boolean;
  yoon: boolean;
  tenten: boolean;
  basic: boolean;
};

type QuizChoiceProps = {
  onKanaChoice: (kanaChoice: string[]) => void;
};

const groupChoices = ['hiragana', 'katakana'];
const typeChoices = ['basic', 'tenten', 'yoon'];

export default function QuizChoice({ onKanaChoice }: QuizChoiceProps) {
  const [kanaChoice, setKanaChoice] = useState<KanaChoice>({
    katakana: false,
    hiragana: false,
    yoon: false,
    tenten: false,
    basic: false,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setKanaChoice({
      ...kanaChoice,
      [value]: !kanaChoice[value as keyof KanaChoice],
    });
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const selectedKana = Object.entries(kanaChoice)
      .filter(el => el.includes(true))
      .flatMap(el => el[0]);

    onKanaChoice(selectedKana);
  }

  const isKanaGroupSelected = kanaChoice.hiragana || kanaChoice.katakana;
  const isKanaTypeSelected =
    kanaChoice.basic || kanaChoice.yoon || kanaChoice.tenten;

  const isDisabled = isKanaGroupSelected && isKanaTypeSelected;

  return (
    <Form
      aria-labelledby="kana-choice-headline"
      aria-describedby="kana-choice-description"
      onSubmit={handleSubmit}
    >
      <Headline id="kana-choice-headline">
        Which Kana do you want to practice?
      </Headline>
      <p id="kana-choice-description">Please choose at least one per group.</p>
      <Fieldset>
        <Legend>Hiragana or Katakana?</Legend>
        {groupChoices.map(group => (
          <InputWithLabel
            key={group}
            labelText={group}
            id={group}
            type="checkbox"
            name="kana"
            value={group}
            onChange={handleChange}
            checked={kanaChoice[group as keyof KanaChoice]}
          />
        ))}
      </Fieldset>
      <Fieldset>
        <Legend>And which types?</Legend>
        {typeChoices.map(type => (
          <InputWithLabel
            key={type}
            labelText={type}
            id={type}
            type="checkbox"
            name="kana"
            value={type}
            onChange={handleChange}
            checked={kanaChoice[type as keyof KanaChoice]}
          />
        ))}
      </Fieldset>
      <Button type="submit" disabled={!isDisabled}>
        Confirm choice
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 12px;
  padding: 12px;
  height: 100vh;

  p {
    font-style: italic;
    font-size: 1rem;
    margin: 0;
    font-weight: normal;
  }

  label {
    font-size: 1.5rem;
  }
`;

const Headline = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Fieldset = styled.fieldset`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  gap: 12px;
  border: none;
  margin: 0;
  padding: 0;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  padding: 12px 0;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 16px;
  border: 1px solid;
  padding: 0 12px;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;

  place-self: center;
`;
