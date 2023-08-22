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
