const { ljust, rjust } = require('justify-text');
const axios = require('axios');

const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
const CATEGORY_QUESTIONS_URL = 'https://opentdb.com/api_count.php?category=';

let categories = [];

const load_categories = async () => {
  const response = await axios.get(CATEGORIES_URL);

  return response.data;
};

const get_question_count = async id => {
  const response = await axios.get(CATEGORY_QUESTIONS_URL + id);

  return response.data;
};

load_categories().then(data => {
  data.trivia_categories.forEach(cat => {
    //    console.log(`id: ${cat.id}, ${cat.name}`);
    get_question_count(cat.id).then(cat_info => {
      const {
        total_question_count: total,
        total_easy_question_count: easy,
        total_medium_question_count: medium,
        total_hard_question_count: hard,
      } = cat_info.category_question_count;

      categories.push({
        id: cat_info.category_id,
        name: cat.name,
        total,
        easy,
        medium,
        hard,
      });
    });
  });
});

setTimeout(() => {
  categories
    .sort((cata, catb) => cata.id - catb.id)
    .map(
      cat =>
        `${rjust(cat.id, 3)}: ${ljust(cat.name, 40)}  Easy: ${rjust(
          cat.easy,
          3
        )}   Medium: ${rjust(cat.medium, 3)}   Hard: ${rjust(
          cat.hard,
          3
        )}   Total: ${rjust(cat.total, 3)}`
    )
    .forEach(item => console.log(item));
}, 10000);
