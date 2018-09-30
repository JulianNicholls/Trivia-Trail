import React from 'react';

const PageHeader = ({ index, questions, answers, done }) => {
  const correct = answers.filter(({ correct }) => correct).length;
  const cname = done ? 'results__header' : 'questions__header';

  return (
    <div className={cname}>
      {!done && (
        <span className="questions__header__index">
          Question {index + 1} of {questions.length}
        </span>
      )}
      {index > 0 && <span className="count">{correct} correct</span>}
    </div>
  );
};

export default PageHeader;
