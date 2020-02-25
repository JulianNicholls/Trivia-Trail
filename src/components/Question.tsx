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

interface AnswerProps {
  answer: string;
  onClick(evt: React.MouseEvent<HTMLButtonElement>): void
};

const Answer = ({ answer, onClick }: AnswerProps): JSX.Element => (
  <button className="question__answer" onClick={onClick}>
    {answer}
  </button>
);

interface QuestionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  sendAnswer(answer: string): void;
};

const Question = ({ question, correct_answer, incorrect_answers, sendAnswer }: QuestionProps): JSX.Element => {
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
          onClick={(evt: React.MouseEvent<HTMLButtonElement>) => sendAnswer(evt.currentTarget.innerText)}
        />
      ))}
    </div>
  );
};

export default Question;
