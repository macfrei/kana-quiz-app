import { type KanaType } from './kana';

type QuizQuestion = {
  question: KanaType;
  answers: KanaType[];
};

type QuizStats = {
  tries: number;
  right: number;
  wrong: number;
};

type QuizHookReturn = {
  quizQuestion: QuizQuestion;
  quizStats: QuizStats;
  quizKanaLength: number;
  isDisabled: boolean;
  checkAnswer: (answer: KanaType) => void;
  getNewQuestion: () => void;
};

export type { QuizQuestion, QuizStats, QuizHookReturn };
