import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import RecommendationCard from '../components/RecommendationCard/RecommendationCard';
import { DrinkType, MealType } from '../types';

function RecipeDetails() {
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const recipeData = await fetchMealId(id as string);
      setMealRecipe(recipeData);
      const ingredientsList = Object.values(recipeData).slice(9, 29)
        .filter((ingredient) => (
          ingredient !== '' && ingredient !== null
        ));
      setIngredients(ingredientsList as string[]);
    } else {
      const recipeData = await fetchDrinkId(id as string);
      setDrinkRecipe(recipeData);
      const ingredientsList = Object.values(recipeData).slice(17, 31)
        .filter((ingredient) => (
          ingredient !== '' && ingredient !== null
        ));
      setIngredients(ingredientsList as string[]);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  return (
    <>
      {pathname.includes('meals') && (
        <div>
          <img
            src={ mealRecipe?.strMealThumb }
            alt={ mealRecipe?.strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ mealRecipe?.strMeal }</h1>
          <p data-testid="recipe-category">{ mealRecipe?.strCategory }</p>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${mealRecipe[`strMeasure${index + 1}`]}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ mealRecipe?.strInstructions }</p>
          <iframe
            data-testid="video"
            width="620"
            height="480"
            src={ mealRecipe?.strYoutube.replace('watch?v=', 'embed/') }
            title="youtube"
          />
        </div>
      )}
      {pathname.includes('drinks') && (
        <div>
          <img
            src={ drinkRecipe?.strDrinkThumb }
            alt={ drinkRecipe?.strDrink }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ drinkRecipe?.strDrink }</h1>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${drinkRecipe[`strMeasure${index + 1}`]}`}
              </li>
            ))}
          </ul>
          <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
          <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
        </div>
      )}
      <h2>Recommended</h2>
      <RecommendationCard recipeCategory={ recipeType } />
      {doneRecipes.some((recipe: { id: string; }) => recipe.id !== id) && (
        <button data-testid="start-recipe-btn">Start Recipe</button>)}
      {inProgressRecipes.some((recipe: { id: string; }) => recipe.id === id) && (
        <button data-testid="start-recipe-btn">In Progress</button>)}
    </>
  );
}

export default RecipeDetails;
