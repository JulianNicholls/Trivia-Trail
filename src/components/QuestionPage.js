import React, { Component }     from 'react';

const QUESTIONS_URL = 'https://opentdb.com/api.php?';

class QuestionPage extends Component {
  state = {
    questions: [],
    index:     0,
    correct:   0
  };

  async componentWillMount() {
    const { category, difficulty, count } = this.props;
    const amountStr     = `amount=${count}`;
    const categoryStr   = (category   !== '0')   ? `&category=${category}` : '';
    const difficultyStr = (difficulty !== 'any') ? `&difficulty=${difficulty}` : '';

    const questionsURL  = QUESTIONS_URL + amountStr + categoryStr + difficultyStr;

    const raw           = await fetch(questionsURL);
    const data          = await raw.json();

    const questions     = [];

    data.results.forEach((question) => questions.push(question));

    this.setState(() => ({ questions }))
  }

  render() {
    return (
      <div>
        <p>amount: {this.props.count}</p>
        <p>category: {this.props.category}</p>
        <p>difficulty: {this.props.difficulty}</p>
        <p>questions: {this.state.questions.length}</p>
      </div>
    );
  }
};

export default QuestionPage;
