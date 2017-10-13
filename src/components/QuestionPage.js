import React, { Component }     from 'react';

import Question                 from './Question';

const QUESTIONS_URL = 'https://opentdb.com/api.php';

class QuestionPage extends Component {
  state = {
    questions: [],
    index:     0,
    correct:   0
  };

  async componentWillMount() {
    const { category, difficulty, count } = this.props;

    const baseURL       = QUESTIONS_URL + `?amount=${count}`;
    const categoryStr   = (category   !== '0')   ? `&category=${category}` : '';
    const difficultyStr = (difficulty !== 'any') ? `&difficulty=${difficulty}` : '';

    const questionsURL  = baseURL + categoryStr + difficultyStr;

    const raw           = await fetch(questionsURL);
    const data          = await raw.json();

    const questions     = [];

    data.results.forEach((question) => questions.push(question));

    this.setState(() => ({ questions }));
  }

  header() {
    const { index, questions, correct } = this.state;

    return (
      <div className="questions__header">
        <span className="questions__header__index">Question {index + 1} of {questions.length}</span>
        {index > 0 && <span className="questions__header__index">{correct} / {questions.length} correct</span>}
      </div>
    );
  }

  receiveAnswer = (was_correct) => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      correct: was_correct ? prevState.correct + 1 : prevState.correct
    }));
  }

  render() {
    return (
      <div className="questions">
        {this.header()}
        <div className="container">
          {this.state.questions.length > 0 && <Question {...this.state.questions[this.state.index]} sendAnswer={this.receiveAnswer} />}
        </div>
      </div>
    );
  }
};

export default QuestionPage;
