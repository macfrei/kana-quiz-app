import { useState } from 'react';
import { Kana } from '../types/kana';
import {
  getRandomArrayElement,
  getRandomArrayElements,
} from '../utils/getRandom';
import shuffle from '../utils/shuffle';
import type {
  QuizQuestion,
  QuizStats,
  QuizHookReturn,
} from '../types/kanaQuiz';

const initialQuizStats = {
  tries: 0,
  right: 0,
  wrong: 0,
  isComplete: false,
};

export default function useQuizForm(kana: Kana[]): QuizHookReturn {
  const [quizKana, setQuizKana] = useState<Kana[]>(kana);
  const [quizStats, setQuizStats] = useState<QuizStats>(initialQuizStats);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>(
    createNewQuestion(quizKana, kana)
  );

  function createNewQuestion(
    quizList: Kana[],
    originalList: Kana[]
  ): QuizQuestion {
    const question = getRandomArrayElement(quizList) as Kana;

    const updatedQuizKana = deleteElement(question.id, originalList);

    const answers = shuffle([
      ...getRandomArrayElements(updatedQuizKana, 3),
      question,
    ]) as Kana[];

    const quizQuestion = {
      question,
      answers,
    };

    return quizQuestion;
  }

  function checkAnswer(answer: Kana) {
    if (answer.id !== quizQuestion.question.id) {
      setQuizStats(quizStats => ({
        ...quizStats,
        tries: quizStats.tries + 1,
        wrong: quizStats.wrong + 1,
      }));
      setIsDisabled(true);
    }
    if (answer.id === quizQuestion.question.id) {
      setQuizStats(quizStats => ({
        ...quizStats,
        tries: quizStats.tries + 1,
        right: quizStats.right + 1,
      }));
      setIsDisabled(false);
    }
  }

  function getNewQuestion() {
    const updatedQuizKana = deleteElement(quizQuestion.question.id, quizKana);

    const newQuestion = createNewQuestion(updatedQuizKana, kana);

    setQuizKana(updatedQuizKana);
    setQuizQuestion(newQuestion);
    setIsDisabled(true);
  }

  function deleteElement(elementId: string, array: any[]) {
    const index = array.findIndex(el => el.id === elementId);
    const updatedQuizKana = [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];

    return updatedQuizKana;
  }
  return {
    quizKanaLength: quizKana.length,
    quizQuestion,
    isDisabled,
    quizStats,
    checkAnswer,
    getNewQuestion,
  };
}
