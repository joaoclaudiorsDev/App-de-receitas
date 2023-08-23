import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

type MealType = {
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
};

type DrinkType = {
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
};

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [recommendations, setRecommendations] = useState<string[]>();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const recipeData = data.meals[0];
      setMealRecipe(recipeData);
      const ingredientsList = Object.values(recipeData).slice(9, 29)
        .filter((ingredient) => (
          ingredient !== '' && ingredient !== null
        ));
      setIngredients(ingredientsList as string[]);
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const recipeData = data.drinks[0];
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
      {doneRecipes.some((recipe: { id: string; }) => recipe.id !== id) && (
        <button data-testid="start-recipe-btn">Start Recipe</button>)}
      {inProgressRecipes.some((recipe: { id: string; }) => recipe.id === id) && (
        <button data-testid="start-recipe-btn">In Progress</button>)}
    </>
  );
}

export default RecipeDetails;
