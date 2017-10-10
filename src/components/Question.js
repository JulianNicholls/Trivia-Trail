import React, { Component }   from 'react';

// "question": "What&#039;s the name of Batman&#039;s  parents?",
// "correct_answer": "Thomas &amp; Martha",
// "incorrect_answers": [
//   "Joey &amp; Jackie",
//   "Jason &amp; Sarah",
//   "Todd &amp; Mira"
// ]

const Question = (props) => {
  return (
    <div className="question">
      <h3 className="question__question">{props.question}</h3>
      <button className="question__answer">{props.correct_answer}</button>
      {props.incorrect_answers.map((ans) => (
        <button className="question__answer" key={ans}>{ans}</button>)
      )}
    </div>
  );
};

export default Question;
