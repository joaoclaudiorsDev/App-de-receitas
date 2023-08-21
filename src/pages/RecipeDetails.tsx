import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const recipeData = data.meals[0];
      setRecipe(recipeData);
      const ingredientsList = Object.keys(recipeData).slice(9, 29);
      ingredientsList.filter((index) => (
        recipeData[index] !== '' && recipeData[index] !== null
      ));
      setIngredients(ingredientsList);
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const recipeData = data.meals[0];
      setRecipe(recipeData);
      const ingredientsList = Object.keys(recipeData).slice(17, 31);
      ingredientsList.filter((index) => (
        recipeData[index] !== '' && recipeData[index] !== null
      ));
      setIngredients(ingredientsList);
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
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${recipe[`strMeasure${index + 1}`]}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <iframe
            data-testid="video"
            width="853"
            height="480"
            src={ recipe.strYoutube }
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
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
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${recipe[`strMeasure${index + 1}`]}`}
              </li>
            ))}
          </ul>
          <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      )}
    </>
  );
}
