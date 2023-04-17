import { QuizStats } from '../types/kanaQuiz';

type ResultProps = {
  result: QuizStats;
  onReset: () => void;
};

export default function Result({ result, onReset }: ResultProps) {
  return (
    <div>
      <h1>Kana Quiz Result</h1>
      <ul>
        <li>Tries: {result.tries}</li>
        <li>Wrong: {result.wrong}</li>
      </ul>
      <button onClick={onReset}>Try again</button>
    </div>
  );
}
