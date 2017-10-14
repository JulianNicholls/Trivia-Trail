import React     from 'react';

const ResultsSummary = ({ questions, answers }) => {
  return (
    <div>
      {answers.map(({ correct, text }, idx) => (
        <div className="correct-{correct}" key={idx}>
          <span>{idx + 1}</span>
          {!correct && <span>Your Answer: {text}</span>}
          <span>Correct answer: {questions[idx].correct_answer}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
