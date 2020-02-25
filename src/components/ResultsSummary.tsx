import React from 'react';

interface ResultQuestionProps {
  correct: boolean;
  text: string;
  question: Question;
};

const ResultQuestion = ({ correct, text, question }: ResultQuestionProps): JSX.Element | null => {
  const user_answer = correct ? (
    <div key="c" className="correct result__correct-true">
      {text} ︎︎&#x2713;
    </div>
  ) : (
    <div key="w" className="result__correct-false">
      {text} &#x274c;
    </div>
  );

  const correct_answer = correct ? null : (
    <div key="wc" className="correct correct-answer">
      {question.correct_answer}
    </div>
  );

  return (
    <>
      <div key="q" className="result__question">
        {question.question}
      </div>
      {user_answer}
      {correct_answer}
    </>
  );
};

interface ResultsSummaryProps {
  questions: Array<Question>;
  answers: Array<Answer>;
  reset(evt: React.MouseEvent<HTMLButtonElement>): void;
};

const ResultsSummary = ({ questions, answers, reset }: ResultsSummaryProps): JSX.Element => (
  <div className="results">
    {answers.map(({ correct, text }, idx): JSX.Element | null => (
      <ResultQuestion
        correct={correct}
        text={text}
        question={questions[idx]}
        key={idx}
      />
    ))}

    <button className="button button--right" onClick={reset}>
      Restart
    </button>
  </div>
);

export default ResultsSummary;
