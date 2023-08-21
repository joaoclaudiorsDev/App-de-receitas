import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.drinks[0]);
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
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
          <p data-testid="recipe-category">{ recipe.strCategory }</p>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <video data-testid="video" src={ recipe.strYoutube } />
        </div>
      )}
      {pathname.includes('drinks') && (
        <div>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      )}
    </>
  );
}
