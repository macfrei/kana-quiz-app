import styled from 'styled-components';
import { QuizStats } from '../types/kanaQuiz';

type ResultProps = {
  result: QuizStats[];
  onReset: () => void;
};

export default function Result({ result, onReset }: ResultProps) {
  const kanaWithWrongAnswers = result.filter(el => el.wrongAnswers.length > 0);
  const kanaLength = result.length;

  return (
    <ResultStyled>
      <Headline>Kana Quiz Result</Headline>
      <p>Nice job, how did you do?</p>
      {kanaWithWrongAnswers.length <= 0 && (
        <p>Wow, you made 0 mistakes! Well done!</p>
      )}
      {kanaWithWrongAnswers.length > 0 && (
        <>
          <p>
            Out of {kanaLength} kana you made {kanaWithWrongAnswers.length}{' '}
            mistakes:
          </p>
          <List role="list">
            {kanaWithWrongAnswers.map(el => (
              <ListItem key={el.kana.id}>
                <span>
                  Kana: <Span>{el.kana.kana}</Span>
                </span>
                <span>
                  Wrong count: <Span>{el.wrongAnswers.length}</Span>
                </span>
                <span>Wrong answer:</span>
                <KanaList>
                  {el.wrongAnswers.map(wrongAnswer => (
                    <li key={wrongAnswer.id}>{wrongAnswer.pronunciation}</li>
                  ))}
                </KanaList>
                <span>
                  Right answer: <Span>{el.kana.pronunciation}</Span>
                </span>
              </ListItem>
            ))}
          </List>
        </>
      )}
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
  gap: 24px;
  list-style: none;
  overflow: auto;

  padding: 0;
  margin: 0;
`;

const KanaList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 12px;
  margin: 0;

  li {
    padding: 4px;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

const ListItem = styled.li`
  display: grid;
`;

const Span = styled.span`
  font-size: 1.2rem;
  color: red;
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
