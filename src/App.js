import React, { Component } from 'react';
import './App.css';

import QuestionsPage from './components/QuestionsPage';
import SelectionPage from './components/SelectionPage';

class App extends Component {
  state = {
    selected: false,
    category: 0,
    difficulty: 'any',
    count: 10
  };

  handleSelect = ({ category, difficulty, count }) => {
    this.setState(() => ({
      selected: true,
      category,
      difficulty,
      count
    }));
  };

  reset = () => {
    this.setState(() => ({ selected: false }));
  };

  page = () => {
    if (this.state.selected) {
      return <QuestionsPage {...this.state} reset={this.reset} />;
    } else {
      return <SelectionPage handleSelect={this.handleSelect} />;
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
