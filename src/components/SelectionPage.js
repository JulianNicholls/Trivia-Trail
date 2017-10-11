import React, { Component }   from 'react';

const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

class SelectionPage extends Component {
  state = {
    categories:  [{id: 0, name: 'Loading...'}],
    count:       10
  };

  async componentWillMount() {
    const raw        = await fetch(CATEGORIES_URL);
    const data       = await raw.json();
    const categories = [{id: 0, name: 'Any Category'}];

    data.trivia_categories.forEach(({id, name }) => {
      categories.push({ id, name });
    });

    this.setState(() => ({ categories }));
  }

  onCountChanged = (evt) => {
    const countText = evt.target.value;
    let   count     = parseInt(countText, 10);

    if (count < 7)
      count = 7;
    else if (count > 50)
      count = 50;

    console.log(count);

    this.setState(() => ({ count }));
  }

  render() {
    return (
      <form className="selection-form">
        <label htmlFor="category">Category</label>
        <select id="category">
          {this.state.categories.map(({ id, name }, idx) => (
            <option key={idx} value={id}>{name}</option>
          ))}
        </select><br />

        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty">
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select><br />

        <label htmlFor="count">Number of Questions</label>
        <input type="number" value={this.state.count} onChange={this.onCountChanged} />
      </form>
    )
  }
};

export default SelectionPage;
