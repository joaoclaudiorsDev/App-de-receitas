import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesType } from '../types';
import Meals from '../pages/Meals';

function Recipes() {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<RecipesType>();

  const fetchAPI = async (api: string) => {
    const response = await fetch(api);
    const data = response.json();
    setRecipes(await data);
  };

  useEffect(() => {
    // call api to get recipes, after set the response -> setRecipes(reponse)
    // if the path === /meals, request the meals API
    // if path === /driks, reques the drinks API
    const meals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchAPI(meals);
  }, []);

  return (
    <section>
      {pathname === '/meals' && recipes && recipes.meals.map((meal) => (
        <Meals key={ meal.idMeal } />
      ))}
      {pathname === '/driks' && recipes && recipes.meals.map((meal) => (
        <Meals key={ meal.idMeal } />
      ))}
    </section>
  );
}
export default Recipes;
