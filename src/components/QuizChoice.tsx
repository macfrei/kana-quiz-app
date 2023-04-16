import React, { useState } from 'react';

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
        <label htmlFor="katakana">Katakana</label>
        <input
          id="katakana"
          type="checkbox"
          name="kana"
          value="katakana"
          onChange={handleChange}
          checked={kanaChoice.katakana}
        />
        <label htmlFor="hiragana"> Hiragana</label>
        <input
          id="hiragana"
          type="checkbox"
          name="kana"
          value="hiragana"
          onChange={handleChange}
          checked={kanaChoice.hiragana}
        />
      </fieldset>
      <fieldset>
        <legend>And which types?</legend>
        <label htmlFor="yoon">Yoon</label>
        <input
          id="yoon"
          type="checkbox"
          name="kana"
          value="yoon"
          onChange={handleChange}
          checked={kanaChoice.yoon}
        />
        <label htmlFor="tenten"> Tenten</label>
        <input
          id="tenten"
          type="checkbox"
          name="kana"
          value="tenten"
          onChange={handleChange}
          checked={kanaChoice.tenten}
        />
        <label htmlFor="basic"> Basic</label>
        <input
          id="basic"
          type="checkbox"
          name="kana"
          value="basic"
          onChange={handleChange}
          checked={kanaChoice.basic}
        />
      </fieldset>
      <button type="submit" disabled={!isDisabled}>
        Confirm choice
      </button>
    </form>
  );
}
