import React, { Component } from 'react';
import './App.css';

import QuestionPage         from './components/QuestionPage';
import SelectionPage        from './components/SelectionPage';

// const q1 =  {
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
// };
//
// const q2 = {
//   category: "Entertainment: Video Games",
//   type: "boolean",
//   difficulty: "hard",
//   question: "In 'The Sims' series, the most members in a household you can have is 8.",
//   correct_answer: "True",
//   incorrect_answers: [
//     "False"
//   ]
// }

class App extends Component {
  state = {
    selected:      false,
    category:      0,
    difficulty:    'any',
    count:         10
  };

  handleSelect = ({ category, difficulty, count }) => {
    this.setState(() => ({
      selected: true,
      category, difficulty, count
    }));
  }

  page = () => {
    if (this.state.selected) {
      return <QuestionPage {...this.state} />;
    }
    else {
      return <SelectionPage handleSelect={this.handleSelect}/>;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header__title">Trivia Trail</h1>
        </header>
        {this.page()}
      </div>
    );
  }
}

export default App;
