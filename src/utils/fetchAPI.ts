export const MEALS_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const MEALS_TYPE = 'meals';
export const DRINKS_TYPE = 'drinks';

export const fetchIngredient = async (ingrediente: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={${ingrediente}}`);
  const data = await response.json();
  return data.meals;
};

export const fetchName = async (name: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const fetchFirstLetter = async (firstLetter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.meals;
};
