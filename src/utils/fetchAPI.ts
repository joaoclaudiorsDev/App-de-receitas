export const MEALS_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const MEALS_TYPE = 'meals';
export const DRINKS_TYPE = 'drinks';

const checkData = (data: []) => {
  if (!data || data === null) {
    return window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export const fetchDrinksIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  checkData(data.drinks);
  return data;
};

export const fetchDrinksName = async (name: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  checkData(data.drinks);
  return data;
};

export const fetchDrinksFirstLetter = async (firstLetter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  checkData(data.drinks);
  return data;
};

export const fetchMealsIngredient = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  checkData(data.meals);
  return data;
};

export const fetchMealsName = async (name: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  checkData(data.meals);
  return data;
};

export const fetchMealsFirstLetter = async (firstLetter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  checkData(data.meals);
  return data;
};

export const fetchMealId = async (id: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

export const fetchDrinkId = async (id: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks[0];
};

export const fetchMealsRecommendation = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
};

export const fetchDrinksRecommendation = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};
