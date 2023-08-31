import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import RecommendationCard from '../components/RecommendationCard/RecommendationCard';
import { DrinksType, MealType } from '../types';
import FavoriteButton from '../components/FavoriteButton';

function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinksType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [mesures, setMesures] = useState<string[]>();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const recipeData = await fetchMealId(id as string);
      setMealRecipe(recipeData);
      const ingredientsList = Object.entries(recipeData)
        .filter((ingredient) => (ingredient[0]
          .includes('Ingredient') && ingredient[1] !== '' && ingredient[1] !== null
        )).map((ingredient) => ingredient[1]);
      setIngredients(ingredientsList as string[]);
      const mesuresList = Object.entries(recipeData)
        .filter((mesure) => (mesure[0]
          .includes('Measure') && mesure[1] !== '' && mesure[1] !== null
        )).map((mesure) => mesure[1]);
      setMesures(mesuresList as string[]);
    } else {
      const recipeData = await fetchDrinkId(id as string);
      setDrinkRecipe(recipeData);
      const ingredientsList = Object.entries(recipeData)
        .filter((ingredient) => (ingredient[0]
          .includes('Ingredient') && ingredient[1] !== '' && ingredient[1] !== null
        )).map((ingredient) => ingredient[1]);
      setIngredients(ingredientsList as string[]);
      const mesuresList = Object.entries(recipeData)
        .filter((mesure) => (mesure[0]
          .includes('Measure') && mesure[1] !== '' && mesure[1] !== null
        )).map((mesure) => mesure[1]);
      setMesures(mesuresList as string[]);
    }
    setIsLoaded(false);
  };

  const verifyButton = () => {
    const inProgressRecipes = localStorage
      .getItem('inProgressRecipes');
    if (inProgressRecipes) {
      const inProgressRecipesObj = JSON.parse(inProgressRecipes);
      if (pathname.includes('meals')) {
        if (inProgressRecipesObj.meals[id as string]) {
          setIsInProgress(true);
        }
      } else if (inProgressRecipesObj.drinks[id as string]) {
        setIsInProgress(true);
      }
    }
  };

  useEffect(() => {
    fetchRecipe();
    verifyButton();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    const alert = document.createElement('div');
    alert.innerHTML = 'Link copied!';
    document.body.appendChild(alert);
    setTimeout(() => {
      document.body.removeChild(alert);
    }, 2000);
  };

  if (isLoaded) return <div>Loading...</div>;
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
                {`${ingredient} - ${mesures?.[index]}`}
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
                {`${ingredient} - ${mesures?.[index]}`}
              </li>
            ))}
          </ul>
          <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
          <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
        </div>
      )}
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShare }
      >
        Share
      </button>
      <FavoriteButton mealRecipe={ mealRecipe } drinkRecipe={ drinkRecipe } />
      <h2>Recommended</h2>
      <RecommendationCard />
      <div style={ { position: 'fixed', bottom: '0' } }>
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ () => navigate(`${pathname}/in-progress`) }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
    </>
  );
}

export default RecipeDetails;
