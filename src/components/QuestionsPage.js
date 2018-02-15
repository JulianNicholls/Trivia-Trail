import React, { Component }     from 'react';

import Question                 from './Question';
import ResultsSummary           from './ResultsSummary';

const QUESTIONS_URL = 'https://opentdb.com/api.php?encode=url3986';

const PageHeader = ({ index, questions, answers, done }) => {
  const correct = answers.filter(({ correct }) => correct).length;
  const cname = done ? 'results__header' : 'questions__header';

  return (
    <div className={cname}>
      {!done && (
        <span className="questions__header__index">
          Question {index + 1} of {questions.length}
        </span>
      )}
      {index > 0 && (
        <span className="questions__header__index">{correct} correct</span>
      )}
    </div>
  );
};

class QuestionsPage extends Component {
  state = {
    loading:   true,
    questions: [],
    index:     0,
    answers:   []
  };

  async componentWillMount() {
    const { category, difficulty, count } = this.props;

    const baseURL = QUESTIONS_URL + `&amount=${count}`;
    const categoryStr   = (category   !== '0')   ? `&category=${category}` : '';
    const difficultyStr = (difficulty !== 'any') ? `&difficulty=${difficulty}` : '';

    const questionsURL = baseURL + categoryStr + difficultyStr;

    const raw = await fetch(questionsURL);
    const data = await raw.json();

    const questions     = [];

    data.results.forEach((question) => questions.push(this.processed(question)));

    this.setState(() => ({ loading: false, questions }));
  }

  decodeTrim(text) {
    return decodeURIComponent(text).trim();
  }

  processed(question) {
    question.question           = this.decodeTrim(question.question);
    question.correct_answer     = this.decodeTrim(question.correct_answer);
    question.incorrect_answers  = question.incorrect_answers.map(text => this.decodeTrim(text));

    return question;
  }


  receiveAnswer = (text) => {
    this.setState((prevState) => {
      const { questions, index, answers } = prevState;

      return {
        index: index + 1,
        answers: [...answers, { correct: text === questions[index].correct_answer, text }]
      };
    });
  }

  page() {
    const { loading, questions, index, answers } = this.state;

    if (loading)
      return;

    if (index < questions.length) {
      return <Question {...questions[index]} sendAnswer={this.receiveAnswer} />;
    }

    return <ResultsSummary questions={questions} answers={answers} reset={this.props.reset}/>;
  }

  render() {
    return (
      <div className="questions">
        <div className="container">
          {this.page()}
        </div>
      </div>
    );
  }
};

export default QuestionsPage;
