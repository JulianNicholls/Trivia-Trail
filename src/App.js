import React, { Component } from 'react';
import './App.css';

import Question             from './components/Question';
import SelectionPage        from './components/SelectionPage';

const q1 =  {
  category: "General Knowledge",
  type: "multiple",
  difficulty: "easy",
  question: "What's the name of Batman's parents?",
  correct_answer: "Thomas & Martha",
  incorrect_answers: [
    "Joey & Jackie",
    "Jason & Sarah",
    "Todd & Mira"
  ]
};

const q2 = {
  category: "Entertainment: Video Games",
  type: "boolean",
  difficulty: "hard",
  question: "In 'The Sims' series, the most members in a household you can have is 8.",
  correct_answer: "True",
  incorrect_answers: [
    "False"
  ]
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trivia Trail</h1>
        </header>
        <div className="container">
          <SelectionPage />
        </div>
      </div>
    );
  }
}

export default App;
