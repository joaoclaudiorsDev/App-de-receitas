import {
  fetchMealsIngredient,
  fetchDrinksFirstLetter,
  fetchDrinksIngredient,
  fetchDrinksName,
  fetchMealsFirstLetter,
  fetchMealsName,
} from './fetchAPI';

export const checkValuesToFetch = (
  selected: string,
  pathname: string,
  inputValue: string,
) => {
  if (selected === 'ingredient' && pathname === '/meals') {
    return fetchMealsIngredient(inputValue);
  }
  if (selected === 'name' && pathname === '/meals') {
    return fetchMealsName(inputValue);
  }
  if (selected === 'firstLetter' && pathname === '/meals' && inputValue.length === 1) {
    return fetchMealsFirstLetter(inputValue);
  }
  if (selected === 'ingredient' && pathname === '/drinks') {
    return fetchDrinksIngredient(inputValue);
  }
  if (selected === 'name' && pathname === '/drinks') {
    return fetchDrinksName(inputValue);
  }
  if (selected === 'firstLetter' && pathname === '/drinks' && inputValue.length === 1) {
    return fetchDrinksFirstLetter(inputValue);
  }
};
