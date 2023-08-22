import { Drink, Meal } from '../../types';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_DRINK_RECIPES = 'SAVE_DRINK_RECIPES';
export const SAVE_MEAL_RECIPES = 'SAVE_MEAL_RECIPES';

export const actionCreator = (payload: string) => ({
  type: SAVE_USER,
  payload,
});

export const createDrinkRecipes = (drinks: Drink[] | void) => ({
  type: SAVE_DRINK_RECIPES,
  payload: drinks,
});

export const createMealRecipes = (meals: Meal[] | void) => ({
  type: SAVE_MEAL_RECIPES,
  payload: meals,
});
