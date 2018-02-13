import React, { Component } from 'react';

const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

class SelectionPage extends Component {
  state = {
    categories: [{ id: 0, name: 'Loading...' }],
    category: 0,
    difficulty: 'any',
    count: 10
  };

  async componentWillMount() {
    const raw = await fetch(CATEGORIES_URL);
    const data = await raw.json();
    const categories = [{ id: 0, name: 'Something for Everyone' }];

    data.trivia_categories.forEach(({ id, name }) => {
      categories.push({ id, name });
    });

    this.setState(() => ({ categories }));
  }

  handleCategory = evt => {
    const category = evt.target.value;

    this.setState(() => ({ category }));
  };

  handleDifficulty = evt => {
    const difficulty = evt.target.value;

    this.setState(() => ({ difficulty }));
  };

  onCountChanged = evt => {
    const countText = evt.target.value;
    let count = parseInt(countText, 10);

    if (count < 7) count = 7;
    else if (count > 50) count = 50;

    this.setState(() => ({ count }));
  };

  handleGo = evt => {
    evt.preventDefault();

    this.props.handleSelect(this.state);
  };

  renderCategories() {
    return this.state.categories.map(({ id, name }, idx) => (
      <option key={idx} value={id}>
        {name}
      </option>
    ));
  }

  render() {
    return (
      <div className="container selection">
        <h1 className="selection__title">Select your questions</h1>
        <form className="selection__form" onSubmit={this.handleGo}>
          <label htmlFor="category">Trivia Category</label>
          <select
            id="category"
            value={this.state.category}
            onChange={this.handleCategory}
          >
            {this.renderCategories()}
          </select>
          <br />

          <label htmlFor="difficulty">Question Difficulty</label>
          <select
            id="difficulty"
            value={this.state.difficulty}
            onChange={this.handleDifficulty}
          >
            <option value="any">A Mix</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />

          <label htmlFor="count">How Many Questions</label>
          <input
            type="number"
            value={this.state.count}
            onChange={this.onCountChanged}
          />
          <br />

          <button className="button button--right" type="submit">
            Start
          </button>
        </form>
      </div>
    );
  }
}

export default SelectionPage;
