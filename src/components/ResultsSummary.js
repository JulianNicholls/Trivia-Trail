import React from 'react';

const ResultQuestion = ({ correct, text, question }) => {
  const user_answer = correct ? (
    <div key="c" className="correct result__correct-true">
      {text} ︎︎&#x2713;
    </div>
  ) : (
    <div key="w" className="result__correct-false">
      {text} &#x274c;
    </div>
  );

  const correct_answer = !correct && (
    <div key="wc" className="correct correct-answer">
      {question.correct_answer}
    </div>
  );

  return [
    <div key="q" className="result__question">
      {question.question}
    </div>,
    user_answer,
    correct_answer
  ];
};

const ResultsSummary = ({ questions, answers, reset }) => (
  <div className="results">
    {answers.map(({ correct, text }, idx) => (
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
