import { type KanaType } from '../types/kana';
import useQuizForm from '../hooks/useQuizForm';

type KanaQuizProps = {
  kana: KanaType[];
};

export default function KanaQuiz({ kana }: KanaQuizProps) {
  const { currentQuestion, checkAnswer, getNewQuestion, isDisabled } =
    useQuizForm(kana);

  return (
    <form>
      <fieldset>
        <legend>{currentQuestion.question.kana}</legend>
        {currentQuestion.answers.map(answer => (
          <label key={answer.id}>
            {answer.pronunciation}
            <input
              type="radio"
              name={currentQuestion.question.kana}
              value={answer.kana}
              onChange={() => checkAnswer(answer)}
            />
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={() => getNewQuestion()}
        disabled={isDisabled}
      >
        Next
      </button>
      <button type="submit">Result</button>
    </form>
  );
}
