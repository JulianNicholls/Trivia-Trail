import React, { Component }     from 'react';

import Question                 from './Question';
import ResultsSummary           from './ResultsSummary';

const QUESTIONS_URL = 'https://opentdb.com/api.php';

class QuestionsPage extends Component {
  state = {
    questions: [],
    index:     0,
    answers:   []
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
    const { index, questions, answers } = this.state;
    const correct = answers.filter(({ correct }) => correct).length;

    return (
      <div className="questions__header">
        <span className="questions__header__index">Question {index + 1} of {questions.length}</span>
        {index > 0 && <span className="questions__header__index">{correct} correct</span>}
      </div>
    );
  }

  receiveAnswer = (text) => {
    this.setState((prevState) => {
      const { questions, index, answers } = prevState;

      return {
        index:   index + 1,
        answers: [...answers, { correct: text === questions[index].correct_answer, text }]
      };
    });
  }

  page() {
    const { questions, index, answers } = this.state;

    if (questions.length === 0)
      return;

    if (index < questions.length) {
      return (
        <Question
          {...this.state.questions[this.state.index]}
          sendAnswer={this.receiveAnswer}
        />
      );
    }

    return <ResultsSummary questions={questions} answers={answers} />;
  }

  render() {
    return (
      <div className="questions">
        {this.header()}
        <div className="container">
          {this.page()}
        </div>
      </div>
    );
  }
};

export default QuestionsPage;
