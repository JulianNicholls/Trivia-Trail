import React     from 'react';

const ResultQuestion = ({ correct, text, question }) => (
  <div className={`result result__correct-${correct}`}>
    <div>{question.question}</div>
    <div>Your Answer: {text} {correct && '✔︎'}</div>
    {!correct && <div>Correct answer: {question.correct_answer}</div>}
  </div>
);

const ResultsSummary = ({ questions, answers, reset }) => {
  return (
    <div className="results">
      {answers.map(({ correct, text }, idx) => (
        <ResultQuestion correct={correct} text={text} question={questions[idx]} key={idx} />
      ))}
      <button className="button button--right" onClick={reset}>Restart</button>
    </div>
  );
};

export default ResultsSummary;
