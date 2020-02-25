import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageHeader from './PageHeader';
import Question from './Question';
import ResultsSummary from './ResultsSummary';

const QUESTIONS_URL = 'https://opentdb.com/api.php?encode=url3986';

interface QuestionPageProps {
  category: number;
  difficulty: string;
  count: number;
  reset(): void;
}
interface State {
  loading: boolean;
  questions: Array<Question>;
  index: number;
  answers: Array<Answer>
}


const QuestionsPage = ({ category, difficulty, count, reset }: QuestionPageProps) => {
  const [state, setState] = useState<State>({
    loading: true,
    questions: [],
    index: 0,
    answers: [],
  });

  const process = (question: Question): Question => {
    const decodeTrim = (text: string): string => decodeURIComponent(text).trim();

    question.question = decodeTrim(question.question);
    question.correct_answer = decodeTrim(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map(decodeTrim);

    return question;
  };

  useEffect(() => {
    const loadQuestions = async () => {
      const baseURL = `${QUESTIONS_URL}&amount=${count}`;
      const catStr = category !== 0 ? `&category=${category}` : '';
      const diffStr = difficulty !== 'any' ? `&difficulty=${difficulty}` : '';

      const questionsURL = `${baseURL}${catStr}${diffStr}`;

      const response = await axios.get(questionsURL);

      const questions = response.data.results.map(process);

      setState(s => ({ ...s, loading: false, questions }));
    };

    loadQuestions();
  }, [category, count, difficulty]);

  const receiveAnswer = (text: string): void => {
    setState(s => {
      const { questions, index, answers } = s;

      return {
        ...s,
        index: index + 1,
        answers: [
          ...answers,
          { correct: text === questions[index].correct_answer, text },
        ],
      };
    });
  };

  const done = (): boolean => state.index >= state.questions.length;

  const page = (): JSX.Element | null => {
    if (state.loading) return null;

    const { questions, index, answers } = state;

    return done() ? (
      <ResultsSummary questions={questions} answers={answers} reset={reset} />
    ) : (
      <Question {...questions[index]} sendAnswer={receiveAnswer} />
    );
  };

  return (
    <div className="questions">
      <PageHeader {...state} done={done()} />
      <div className="container">{page()}</div>
    </div>
  );
};

export default QuestionsPage;
