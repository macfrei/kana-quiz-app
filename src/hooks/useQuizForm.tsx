import { useState } from 'react';
import { KanaType } from '../types/kana';
import {
  getRandomArrayElement,
  getRandomArrayElements,
} from '../lib/getRandom';
import shuffle from '../lib/shuffle';

type QuizQuestion = {
  question: KanaType;
  answers: KanaType[];
};

type QuizStats = {
  tries: number;
  right: number;
  wrong: number;
};

export default function useQuizForm(kana: KanaType[]) {
  const [quizKana, setQuizKana] = useState<KanaType[]>(kana);
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion>(
    createNewQuestion(quizKana, kana)
  );
  const [quizStats, setQuizStats] = useState<QuizStats>({
    tries: 0,
    right: 0,
    wrong: 0,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

  function deleteElement(elementId: string, array: any[]) {
    const index = array.findIndex(el => el.id === elementId);
    const updatedQuizKana = [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];

    return updatedQuizKana;
  }

  function getNewQuestion() {
    const updatedQuizKana = deleteElement(quizQuestion.question.id, quizKana);

    const newQuestion = createNewQuestion(updatedQuizKana, kana);

    setQuizKana(updatedQuizKana);
    setQuizQuestion(newQuestion);
    setIsDisabled(true);
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
