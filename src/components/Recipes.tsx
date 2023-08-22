import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesCategoriesType, RecipesType } from '../types';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

function Recipes() {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<RecipesType>();
  const [recipesCategories, setRecipesCategories] = useState<RecipesCategoriesType>();

  const fetchAPI = async (api: string) => {
    const response = await fetch(api);
    const data = response.json();
    setRecipes(await data);
  };
  const fetchAPICategory = async (api: string) => {
    const response = await fetch(api);
    const data = response.json();
    setRecipesCategories(await data);
  };

  useEffect(() => {
    // call api to get recipes, after set the response -> setRecipes(reponse)
    // if the path === /meals, request the meals API
    // if path === /driks, reques the drinks API
    const mealsCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const drinksCat = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const drinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const meals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (pathname === '/meals') {
      fetchAPI(meals);
      fetchAPICategory(mealsCat);
    } else if (pathname === '/drinks') {
      fetchAPI(drinks);
      fetchAPICategory(drinksCat);
    }
    console.log(recipes?.drinks.slice(0, 3));
  }, []);

  return (
    <section>
      {pathname === '/meals' && recipesCategories && recipesCategories.meals.slice(0, 5)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      {pathname === '/meals' && recipes && recipes.meals.slice(0, 12)
        .map((meal, index) => (
          <Meals
            meal={ meal }
            index={ index }
            key={ index }
          />
        ))}
      {pathname === '/drinks' && recipesCategories && recipesCategories.drinks.slice(0, 5)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      {pathname === '/drinks' && recipes && recipes.drinks.slice(0, 12)
        .map((drink, index) => (
          <Drinks
            drink={ drink }
            index={ index }
            key={ index }
          />
        ))}
    </section>
  );
}
export default Recipes;
