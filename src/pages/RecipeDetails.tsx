import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import RecommendationCard from '../components/RecommendationCard/RecommendationCard';
import { DrinksType, MealType } from '../types';

function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType | undefined>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinksType>();
  const [ingredients, setIngredients] = useState<string[]>();
  // const doneRecipesLocal: DoneRecipesType = [{
  //   id: '178319',
  //   type: 'drink',
  //   nationality: '',
  //   category: 'Cocktail',
  //   alcoholicOrNot: 'Alcoholic',
  //   name: 'Aquamarine',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   doneDate: '23/6/2020',
  //   tags: [],
  // },
  // {
  //   id: '52771',
  //   type: 'meal',
  //   nationality: 'Italian',
  //   category: 'Vegetarian',
  //   alcoholicOrNot: '',
  //   name: 'Spicy Arrabiata Penne',
  //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   doneDate: '22/6/2020',
  //   tags: ['Pasta', 'Curry'],
  // }];
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesLocal));
  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  // const recipesInProgress = {
  //   meals: {
  //     52771: [],
  //   },
  //   drinks: {
  //     178319: [],
  //   },
  // };
  // localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');

  const fetchRecipe = async () => {
    if (pathname.includes('meals')) {
      const recipeData = await fetchMealId(id as string);
      setMealRecipe(recipeData);
      const ingredientsList = Object.entries(recipeData)
        .filter((ingredient) => (ingredient[0]
          .includes('Ingredient') && ingredient[1] !== '' && ingredient[1] !== null
        )).map((ingredient) => ingredient[1]);
      setIngredients(ingredientsList as string[]);
    } else {
      const recipeData = await fetchDrinkId(id as string);
      setDrinkRecipe(recipeData);
      const ingredientsList = Object.entries(recipeData)
        .filter((ingredient) => (ingredient[0]
          .includes('Ingredient') && ingredient[1] !== '' && ingredient[1] !== null
        )).map((ingredient) => ingredient[1]);
      setIngredients(ingredientsList as string[]);
    }
  };
  useEffect(() => {
    fetchRecipe();
    console.log(pathname);
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
      <RecommendationCard />
      <div style={ { position: 'fixed', bottom: '0' } }>
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ () => navigate(`${pathname}/in-progress`) }
        >
          Start Recipe
        </button>
        {/* {!doneRecipes.some((recipe: { id: string; }) => recipe.id === id) && (
          <button
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ () => navigate(`${pathname}/in-progress`) }
          >
            Start Recipe
          </button>)} */}
      </div>
      <div style={ { position: 'fixed', bottom: '0' } }>
        {/* <button
          data-testid="start-recipe-btn"
          onClick={ () => navigate(`${pathname}/in-progress`) }
        >
          Continue Recipe
        </button> */}
        {/* {(pathname.includes('meals')
          ? inProgressRecipes.meals[pathname.id]
          : inProgressRecipes.drinks[pathname.id]) && (
            <button
              style={ { position: 'fixed', bottom: '0' } }
              data-testid="start-recipe-btn"
              onClick={ () => navigate(`${pathname}/in-progress`) }
            >
              Continue Recipe
            </button>)} */}
      </div>
    </>
  );
}

export default RecipeDetails;
