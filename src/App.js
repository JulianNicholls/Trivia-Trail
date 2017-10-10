import React, { Component } from 'react';
import './App.css';

import Question             from './components/Question'

const q1 =  {
  question: "What's the name of Batman's parents?",
  correct_answer: "Thomas & Martha",
  incorrect_answers: [
    "Joey & Jackie",
    "Jason & Sarah",
    "Todd & Mira"
  ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trivia Trail</h1>
        </header>
        <div className="container">
          <Question {...q1} />
          
        </div>
      </div>
    );
  }
}

export default App;
