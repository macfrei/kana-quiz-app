import { useState } from 'react';
import { Kana } from '../types/kana';

type QuizStats = {
  kana: Kana;
  wrongAnswers: Kana[];
  rightAnswers: Kana[];
  isRight: boolean;
};

type QuizQuestion = {
  question: Kana;
  answers: Kana[];
};

export default function useQuizForm(kana: QuizQuestion[]) {
  const [quizStats, setQuizStats] = useState<QuizStats[]>([]);
  const [step, setStep] = useState(0);

  const totalSteps = kana.length - 1;
  const quizQuestion = kana[step];

  const start = quizStats.find(
    el => el.kana.id === quizQuestion.question.id
  )?.isRight;
  const answerIsRight =
    !quizStats.find(el => el.kana.id === quizQuestion.question.id)?.isRight ??
    false;

  const isDisabled =
    quizStats.find(el => el.kana.id === quizQuestion.question.id)?.isRight ??
    true;

  function checkAnswer(answer: Kana) {
    const index = quizStats.findIndex(
      el => el.kana.id === quizQuestion.question.id
    );

    const isRight = answer.id === quizQuestion.question.id;
    const key = isRight ? 'rightAnswers' : 'wrongAnswers';

    if (index < 0) {
      setQuizStats([
        {
          kana: quizQuestion.question,
          wrongAnswers: isRight ? [] : [answer],
          rightAnswers: isRight ? [answer] : [],
          isRight: !isRight,
        },
        ...quizStats,
      ]);
    }

    if (index >= 0) {
      const currentKanaStats = quizStats[index];

      const updatedQuizStats = [
        ...quizStats.slice(0, index),
        {
          ...currentKanaStats,
          isRight: !isRight,
          [`${key}`]: [
            ...(currentKanaStats[key as keyof QuizStats] as Kana[]),
            answer,
          ],
        },
        ...quizStats.slice(index + 1),
      ];

      setQuizStats(updatedQuizStats);
    }
  }

  function advanceStep() {
    setStep(step => step + 1);
  }

  return {
    step,
    totalSteps,
    quizStats,
    start,
    quizQuestion,
    isDisabled,
    answerIsRight,
    checkAnswer,
    advanceStep,
  };
}
