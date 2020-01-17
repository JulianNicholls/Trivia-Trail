import React, { useState } from 'react';

import QuestionsPage from './components/QuestionsPage';
import SelectionPage from './components/SelectionPage';

import './App.scss';

const App = () => {
  const [state, setState] = useState({
    selected: false,
    category: 0,
    difficulty: 'any',
    count: 10,
  });

  const handleSelect = ({ category, difficulty, count }) => {
    setState({
      selected: true,
      category,
      difficulty,
      count,
    });
  };

  const reset = () => setState({ ...state, selected: false });

  const page = () =>
    state.selected ? (
      <QuestionsPage {...state} reset={reset} />
    ) : (
      <SelectionPage handleSelect={handleSelect} />
    );

  return (
    <div className="App">
      <header className="App-header">
        <img src="favicon-32x32.png" alt="RBS logo" />
        <h1 className="App-header__title">Trivia Trail</h1>
      </header>
      {page()}
    </div>
  );
};

export default App;
