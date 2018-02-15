const fetch = require('node-fetch');
const { ljust, rjust } = require('justify-text');

const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
const CATEGORY_QUESTIONS_URL = 'https://opentdb.com/api_count.php?category=';

let categories = [];

const load_categories = async () => {
  const raw = await fetch(CATEGORIES_URL);
  const data = await raw.json();

  return data;
};

const get_question_count = async id => {
  const raw = await fetch(CATEGORY_QUESTIONS_URL + id);
  const data = await raw.json();

  return data;
};

load_categories().then(data => {
  data.trivia_categories.forEach(cat => {
    //    console.log(`id: ${cat.id}, ${cat.name}`);
    get_question_count(cat.id).then(cat_info => {
      const {
        total_question_count: total,
        total_easy_question_count: easy,
        total_medium_question_count: medium,
        total_hard_question_count: hard
      } = cat_info.category_question_count;

      //      console.log(cat.id, cat_info);
      categories.push({
        id: cat_info.category_id,
        name: cat.name,
        total,
        easy,
        medium,
        hard
      });
    });
  });
});

setTimeout(() => {
  categories
    .sort((cata, catb) => cata.id - catb.id)
    .map(
      cat =>
        `${rjust(cat.id.toString(), 3)}, ${ljust(cat.name, 40)}  Easy: ${rjust(
          cat.easy.toString(),
          3
        )}  Medium: ${rjust(cat.medium.toString(), 3)}  Hard: ${rjust(
          cat.hard.toString(),
          3
        )}  Total: ${rjust(cat.total.toString(), 3)}`
    )
    .forEach(item => console.log(item));
}, 10000);
