import React, { Component } from 'react';

import PageHeader from './PageHeader';
import Question from './Question';
import ResultsSummary from './ResultsSummary';

const QUESTIONS_URL = 'https://opentdb.com/api.php?encode=url3986';

class QuestionsPage extends Component {
  state = {
    loading: true,
    questions: [],
    index: 0,
    answers: []
  };

  async componentDidMount() {
    const { category, difficulty, count } = this.props;

    const baseURL = QUESTIONS_URL + `&amount=${count}`;
    const categoryStr = category !== '0' ? `&category=${category}` : '';
    const difficultyStr = difficulty !== 'any' ? `&difficulty=${difficulty}` : '';

    const questionsURL = baseURL + categoryStr + difficultyStr;

    const response = await fetch(questionsURL);
    const data = await response.json();

    const questions = data.results.map(this.process);

    this.setState(() => ({ loading: false, questions }));
  }

  process = question => {
    const decodeTrim = text => decodeURIComponent(text).trim();

    question.question = decodeTrim(question.question);
    question.correct_answer = decodeTrim(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map(decodeTrim);

    return question;
  };

  receiveAnswer = text => {
    this.setState(prevState => {
      const { questions, index, answers } = prevState;

      return {
        index: index + 1,
        answers: [
          ...answers,
          { correct: text === questions[index].correct_answer, text }
        ]
      };
    });
  };

  done = () => this.state.index >= this.state.questions.length;

  page() {
    const { loading, questions, index, answers } = this.state;

    if (loading) return;

    if (this.done()) {
      return (
        <ResultsSummary
          questions={questions}
          answers={answers}
          reset={this.props.reset}
        />
      );
    }

    return <Question {...questions[index]} sendAnswer={this.receiveAnswer} />;
  }

  render() {
    return (
      <div className="questions">
        <PageHeader {...this.state} done={this.done()} />
        <div className="container">{this.page()}</div>
      </div>
    );
  }
}

export default QuestionsPage;
