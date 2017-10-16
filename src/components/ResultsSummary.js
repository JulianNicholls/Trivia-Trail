import React     from 'react';

const ResultsSummary = ({ questions, answers, reset }) => {
  return (
    <div className="results">
      {answers.map(({ correct, text }, idx) => (
        <div className={`result result__correct-${correct}`} key={idx}>
          <div>{idx + 1}. Correct answer: {questions[idx].correct_answer}</div>
          {!correct && <div>Your Answer: {text}</div>}
        </div>
      ))}
      <button className="button" onClick={reset}>Restart</button>
    </div>
  );
};

export default ResultsSummary;
