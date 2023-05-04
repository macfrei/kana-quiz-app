import { type Kana } from './kana';

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

type QuizStats = {
  kana: Kana;
  wrongAnswers: Kana[];
  rightAnswers: Kana[];
  isRight: boolean;
};

type QuizHookReturn = {
  step: number;
  totalSteps: number;
  quizStats: QuizStats[];
  start: boolean | undefined;
  quizQuestion: QuizQuestion;
  isDisabled: boolean;
  answerIsRight: boolean;
  checkAnswer: (answer: Kana) => void;
  advanceStep: () => void;
};

export type { QuizQuestion, QuizStats, QuizHookReturn };
