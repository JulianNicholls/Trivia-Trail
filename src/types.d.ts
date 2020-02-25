interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
};

interface Answer {
  correct: boolean;
  text: string;
}
