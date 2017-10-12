const fetch = require('node-fetch');


const CATEGORIES_URL         = 'https://opentdb.com/api_category.php';
const CATEGORY_QUESTIONS_URL = 'https://opentdb.com/api_count.php?category=';

let categories = [];

// load_categories = () => {
//   fetch(CATEGORIES_URL)
//     .then(raw => raw.json())
//     .then(data => {
//       categories = data;
//     })
// }

load_categories = async () => {
  const raw  = await fetch(CATEGORIES_URL);
  const data = await raw.json();

  return data;
}

get_question_count = async (id) => {
  const raw  = await fetch(CATEGORY_QUESTIONS_URL + id);
  const data = await raw.json();

  return data;
}

load_categories().then((data) => {
  data.trivia_categories.forEach((cat) => {
//    console.log(`id: ${cat.id}, ${cat.name}`);
    get_question_count(cat.id).then((cat_info) => {
      const {
        total_question_count: total,
        total_easy_question_count: easy,
        total_medium_question_count: medium,
        total_hard_question_count: hard
      } = cat_info.category_question_count;

//      console.log(cat.id, cat_info);
      categories.push({
        id:     cat_info.category_id,
        name:   cat.name,
        total, easy, medium, hard
      });
    })
  });
});

setTimeout(() => {
  console.log(categories);
}, 10000);
