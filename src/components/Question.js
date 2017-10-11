import React, { Component }   from 'react';

// {
//   category: "General Knowledge",
//   type: "multiple",
//   difficulty: "easy",
//   question: "What's the name of Batman's parents?",
//   correct_answer: "Thomas & Martha",
//   incorrect_answers: [
//     "Joey & Jackie",
//     "Jason & Sarah",
//     "Todd & Mira"
//   ]
// }

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
