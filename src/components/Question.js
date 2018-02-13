import React, { Component } from 'react';

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

class Question extends Component {
  // Insert the correct answer randomly into the list of incorrect answers
  questions() {
    const { correct_answer: right, incorrect_answers: wrongs } = this.props;
    const questions = [...wrongs];
    const index = Math.floor(Math.random() * wrongs.length);

    questions.splice(index, 0, right);

    return questions;
  }

  handleClick = evt => {
    this.props.sendAnswer(evt.target.innerText);
  };

  render() {
    return (
      <div className="question">
        <h3 className="question__question">{this.props.question}</h3>
        {this.questions().map((answer, idx) => (
          <Answer key={idx} answer={answer} onClick={this.handleClick} />
        ))}
      </div>
    );
  }
}

export default Question;
