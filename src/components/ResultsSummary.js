import React     from 'react';

const ResultsSummary = ({ questions, answers }) => {
  return (
    <div>
      {answers.map(({ correct, text }, idx) => (
        <div className={`result result__correct-${correct}`} key={idx}>
          <div>{idx + 1}. Correct answer: {questions[idx].correct_answer}</div>
          {!correct && <div>Your Answer: {text}</div>}
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
