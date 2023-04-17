import { type Kana } from './kana';

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

type QuizStats = {
  tries: number;
  right: number;
  wrong: number;
  isComplete: boolean;
};

type QuizHookReturn = {
  quizQuestion: QuizQuestion;
  quizStats: QuizStats;
  quizKanaLength: number;
  isDisabled: boolean;
  checkAnswer: (answer: Kana) => void;
  getNewQuestion: () => void;
};

export type { QuizQuestion, QuizStats, QuizHookReturn };
