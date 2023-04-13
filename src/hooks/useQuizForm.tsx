import { useState } from 'react';
import { KanaType } from '../types/kana';
import {
  getRandomArrayElement,
  getRandomArrayElements,
} from '../lib/getRandom';
import shuffle from '../lib/shuffle';
import type {
  QuizQuestion,
  QuizStats,
  QuizHookReturn,
} from '../types/kanaQuiz';

const initialQuizStats = {
  tries: 0,
  right: 0,
  wrong: 0,
};

export default function useQuizForm(kana: KanaType[]): QuizHookReturn {
  const [quizKana, setQuizKana] = useState<KanaType[]>(kana);
  const [quizStats, setQuizStats] = useState<QuizStats>(initialQuizStats);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>(
    createNewQuestion(quizKana, kana)
  );

  function createNewQuestion(
    quizList: KanaType[],
    originalList: KanaType[]
  ): QuizQuestion {
    const question = getRandomArrayElement(quizList) as KanaType;

    const updatedQuizKana = deleteElement(question.id, originalList);

    const answers = shuffle([
      ...getRandomArrayElements(updatedQuizKana, 3),
      question,
    ]) as KanaType[];

    const quizQuestion = {
      question,
      answers,
    };

    return quizQuestion;
  }

  function checkAnswer(answer: KanaType) {
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
