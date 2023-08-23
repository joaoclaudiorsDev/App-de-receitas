import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type MealType = {
  idMeal: string;
  strMeal: string,
  strDrinkAlternate: boolean,
  strCategory: string,
  strArea: string,
  strInstructions: string,
  strMealThumb: string,
  strTags: string,
  strYoutube: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strIngredient16: string,
  strIngredient17: string,
  strIngredient18: string,
  strIngredient19: string,
  strIngredient20: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strMeasure16: string,
  strMeasure17: string,
  strMeasure18: string,
  strMeasure19: string,
  strMeasure20: string,
  strSource: string,
  strImageSource: boolean,
  strCreativeCommonsConfirmed: boolean,
  dateModified: boolean,
};

export type DrinksType = {
  idDrink: string,
  strDrink: string,
  strDrinkAlternate: string,
  strTags: string,
  strVideo: string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string,
  strInstructionsES: string,
  strInstructionsDE: string,
  strInstructionsFR: string,
  strInstructionsIT: string,
  strInstructionsZHHANS?: string,
  strInstructionsZHHANT?: string,
  strDrinkThumb: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: string,
  dateModified: string,
};

export type RecipesType = {
  meals: MealType[],
  drinks: DrinksType[],
};

export type CategoryType = {
  strCategory: string,
};

export type RecipesCategoriesType = {
  drinks: CategoryType[],
  meals: CategoryType[],
};

export type UserType = {
  email: string,
};

export type RecipesTypeRedux = {
  meals: MealType[],
  drinks: DrinksType[],
  categories: CategoryType[],
};

export type ReduxStateTemp = {
  user: UserType,
  recipes: RecipesTypeRedux,
};

export interface Drink {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
}

export interface Meal {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

export interface ReduxState {
  user: {
    email: string
  },
  recipes: {
    drinkRecipes: Drink[],
    mealRecipes: Meal[],
  }
}
export type Dispatch = ThunkDispatch<ReduxStateTemp, null, AnyAction>;
