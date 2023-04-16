import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

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
    <form
      aria-labelledby="kana-choice-headline"
      aria-describedby="kana-choice-description"
      onSubmit={handleSubmit}
    >
      <h2 id="kana-choice-headline">Which Kana do you want to practice?</h2>
      <p id="kana-choice-description">Please choose at least one per group.</p>
      <fieldset>
        <legend>Hiragana or Katakana?</legend>
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
      </fieldset>
      <fieldset>
        <legend>And which types?</legend>
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
      </fieldset>
      <button type="submit" disabled={!isDisabled}>
        Confirm choice
      </button>
    </form>
  );
}
