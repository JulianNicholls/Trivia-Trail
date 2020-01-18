import React from 'react';

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

const Answer = ({ answer, onClick }) => (
  <button className="question__answer" onClick={onClick}>
    {answer}
  </button>
);

const Question = ({ question, correct_answer, incorrect_answers, sendAnswer }) => {
  // Insert the correct answer randomly into the list of incorrect answers
  const questions = () => {
    const questions = [...incorrect_answers];
    const index = Math.floor(Math.random() * incorrect_answers.length);

    questions.splice(index, 0, correct_answer);

    return questions;
  };

  return (
    <div className="question">
      <h3 className="question__question">{question}</h3>
      {questions().map((answer, idx) => (
        <Answer
          key={idx}
          answer={answer}
          onClick={evt => sendAnswer(evt.target.innerText)}
        />
      ))}
    </div>
  );
};

export default Question;
