import { AnyAction } from 'redux';
import { SAVE_DRINK_RECIPES, SAVE_MEAL_RECIPES } from '../actions';

const INITIAL_STATE = {
  drinkRecipes: [],
  mealRecipes: [],
};

export function recipes(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default recipes;
