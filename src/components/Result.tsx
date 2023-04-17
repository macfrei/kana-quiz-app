import styled from 'styled-components';
import { QuizStats } from '../types/kanaQuiz';

type ResultProps = {
  result: QuizStats;
  onReset: () => void;
};

export default function Result({ result, onReset }: ResultProps) {
  return (
    <ResultStyled>
      <Headline>Kana Quiz Result</Headline>
      <p>Nice job, how did you do?</p>

      <List role="list">
        <li>Tries: {result.tries}</li>
        <li>Wrong: {result.wrong}</li>
      </List>
      <p>Well done! Let's keep practicing!</p>
      <Button onClick={onReset}>Restart quiz</Button>
    </ResultStyled>
  );
}

const ResultStyled = styled.div`
  display: grid;
  gap: 24px;
  justify-content: center;

  padding: 12px;
  height: 100vh;
`;

const Headline = styled.h1`
  display: grid;
  place-items: center;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const List = styled.ul`
  display: grid;
  list-style: none;

  padding: 0;
  margin: 0;
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
