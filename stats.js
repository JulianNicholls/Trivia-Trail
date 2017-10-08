const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

all_categories = async () => {
  const raw  = await fetch(CATEGORIES_URL);
  const data = await raw.json();

  return JSON.parse(data);
}

const categories = all_categories();

console.log(categories);
