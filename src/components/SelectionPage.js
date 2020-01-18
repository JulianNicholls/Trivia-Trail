import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

const SelectionPage = ({ handleSelect }) => {
  const [state, setState] = useState({
    categories: [{ id: 0, name: 'Loading...' }],
    category: 0,
    difficulty: 'any',
    count: 10,
  });

  useEffect(() => {
    const loadCategories = async () => {
      const response = await axios.get(CATEGORIES_URL);
      const categories = [{ id: 0, name: 'Something for Everyone' }];

      response.data.trivia_categories
        .sort((cata, catb) => {
          if (cata.name < catb.name) return -1;
          if (cata.name > catb.name) return 1;

          return 0;
        })
        .forEach(({ id, name }) => {
          categories.push({ id, name });
        });

      setState(s => ({ ...s, categories }));
    };

    loadCategories();
  }, []);

  const handleCategory = evt => {
    const { value: category } = evt.target;

    setState(s => ({ ...s, category }));
  };

  const handleDifficulty = evt => {
    const { value: difficulty } = evt.target;

    setState(s => ({ ...s, difficulty }));
  };

  const onCountChanged = evt => {
    let count = Number(evt.target.value);

    // if (count < 5) count = 5;
    if (count < 2) count = 2;
    else if (count > 50) count = 50;

    setState(s => ({ ...s, count }));
  };

  const handleGo = evt => {
    evt.preventDefault();

    handleSelect(state);
  };

  const renderCategories = () => {
    return state.categories.map(({ id, name }, idx) => (
      <option key={idx} value={id}>
        {name}
      </option>
    ));
  };

  return (
    <div className="container selection">
      <h1 className="selection__title">Select your questions</h1>
      <form className="selection__form" onSubmit={handleGo}>
        <label htmlFor="category">Trivia Category</label>
        <select id="category" value={state.category} onChange={handleCategory}>
          {renderCategories()}
        </select>
        <br />

        <label htmlFor="difficulty">Question Difficulty</label>
        <select
          id="difficulty"
          value={state.difficulty}
          onChange={handleDifficulty}
        >
          <option value="any">A Mix</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />

        <label htmlFor="count">How Many Questions</label>
        <input type="number" value={state.count} onChange={onCountChanged} />
        <br />

        <button className="button button--right" type="submit">
          Start
        </button>
      </form>
    </div>
  );
};

export default SelectionPage;
