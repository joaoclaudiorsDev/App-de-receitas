import { AnyAction } from 'redux';
import {
  SAVE_CATEGORIES_DRINKS,
  SAVE_CATEGORIES_MEALS,
  SAVE_DRINK_RECIPES,
  SAVE_MEAL_RECIPES,
  SAVE_RECIPES_DRINKS,
  SAVE_RECIPES_MEALS,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  categories: [],
};

function recipes(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case SAVE_RECIPES_MEALS:
      return { ...state, meals: action.payload.meals };
    case SAVE_RECIPES_DRINKS:
      return { ...state, drinks: action.payload.drinks };
    case SAVE_CATEGORIES_MEALS:
      return { ...state, categories: action.payload.meals };
    case SAVE_CATEGORIES_DRINKS:
      return { ...state, categories: action.payload.drinks };
    case SAVE_DRINK_RECIPES:
      return {
        ...state,
        drinkRecipes: action.payload,
      };
    case SAVE_MEAL_RECIPES:
      return {
        ...state,
        mealRecipes: action.payload,
      };
    default: return state;
  }
}
export default recipes;
