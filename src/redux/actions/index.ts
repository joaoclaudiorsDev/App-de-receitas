import { CategoryType, Dispatch, Drink, DrinksType, Meal, MealType } from '../../types';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_RECIPES_MEALS = 'SAVE_RECIPES_MEALS';
export const SAVE_RECIPES_DRINKS = 'SAVE_RECIPES_DRINKS';
export const SAVE_CATEGORIES_DRINKS = 'SAVE_CATEGORIES_DRINKS';
export const SAVE_CATEGORIES_MEALS = 'SAVE_CATEGORIES_MEALS';

export const actionCreator = (payload: string) => ({
  type: SAVE_USER,
  payload,
});

export const createUser = (payload: string) => ({
  type: SAVE_USER,
  payload,
});

// export const createDrinkRecipes = (drinks: Drink[] | void) => ({
//   type: SAVE_DRINK_RECIPES,
//   payload: drinks,
// });

// export const createMealRecipes = (meals: Meal[] | void) => ({
//   type: SAVE_MEAL_RECIPES,
//   payload: meals,
// });

export const saveRecipesMeals = (payload: MealType[]) => {
  return {
    type: SAVE_RECIPES_MEALS,
    payload,
  };
};

export const saveRecipesDrinks = (payload: DrinksType[]) => {
  return {
    type: SAVE_RECIPES_DRINKS,
    payload,
  };
};

export const saveCategoriesMeals = (payload: CategoryType[]) => {
  return {
    type: SAVE_CATEGORIES_MEALS,
    payload,
  };
};

export const saveCategoriesDrinks = (payload: CategoryType[]) => {
  return {
    type: SAVE_CATEGORIES_DRINKS,
    payload,
  };
};

export const fetchRecipesAPI = (url: string, type: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    if (type === 'meals') dispatch(saveRecipesMeals(data));
    if (type === 'drinks') dispatch(saveRecipesDrinks(data));
  };
};

export const fetchCategoriesAPI = (url: string, type: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    if (type === 'meals') dispatch(saveCategoriesMeals(data));
    if (type === 'drinks') dispatch(saveCategoriesDrinks(data));
  };
};
