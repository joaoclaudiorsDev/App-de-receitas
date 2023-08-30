import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import { DrinksType, MealType, DoneRecipeType } from '../types';
import FavoriteButton from '../components/FavoriteButton';
import getIngredientsFromLocalStorage from '../tests/helpers/LocalStoreFunction';
import { Checklist } from '../components/Checklist';

function RecipeInProgess() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType | undefined>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinksType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [mesures, setMesures] = useState<string[]>();
  const [isLoaded, setIsLoaded] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [localStoreIngredients, setLocalStoreIngredients] = useState<string[]>(() => {
    return getIngredientsFromLocalStorage(pathname, id);
  });

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

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const localStorageInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (localStorageInProgress.meals === undefined) {
      localStorageInProgress.meals = {};
    }
    if (localStorageInProgress.drinks === undefined) {
      localStorageInProgress.drinks = {};
    }
    if (pathname.includes('meals')) {
      localStorageInProgress.meals[Number(id)] = localStoreIngredients;
    }
    if (pathname.includes('drinks')) {
      localStorageInProgress.drinks[Number(id)] = localStoreIngredients;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageInProgress));
  }, [localStoreIngredients, id, pathname]);

  const handleCheckboxChange = (ingredient: string) => {
    setLocalStoreIngredients([...localStoreIngredients, ingredient]);
    if (localStoreIngredients.includes(ingredient)) {
      const updatedCheckedIngredients = localStoreIngredients
        .filter((item) => item !== ingredient);
      setLocalStoreIngredients(updatedCheckedIngredients);
    }
  };

  useEffect(() => {
    const localStorageDoneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(localStorageDoneRecipes);
  }, []);

  const handleClick = () => {
    const recipesFinished = {
      id: mealRecipe?.idMeal ? mealRecipe.idMeal : drinkRecipe?.idDrink,
      type: mealRecipe?.idMeal ? 'meal' : 'drink',
      nationality: mealRecipe?.strArea ? mealRecipe.strArea : '',
      category: mealRecipe?.strCategory
        ? mealRecipe.strCategory : drinkRecipe?.strCategory,
      alcoholicOrNot: drinkRecipe?.strAlcoholic ? drinkRecipe.strAlcoholic : '',
      name: mealRecipe?.strMeal ? mealRecipe.strMeal : drinkRecipe?.strDrink,
      image: mealRecipe?.strMealThumb
        ? mealRecipe.strMealThumb : drinkRecipe?.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: mealRecipe?.strTags ? mealRecipe.strTags.split(',') : [],
    };
    setDoneRecipes([...doneRecipes, recipesFinished]);
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipes, recipesFinished]));
    navigate('/done-recipes');
  };

  const handleShare = () => {
    setLinkCopied(!linkCopied);
    navigator.clipboard.writeText(`http://localhost:3000/${mealRecipe?.idMeal ? 'meals' : 'drinks'}/${mealRecipe?.idMeal ? `${mealRecipe.idMeal}` : `${drinkRecipe?.idDrink}`}`);
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
              <Checklist
                key={ index }
                ingredient={ ingredient }
                index={ index }
                localStoreIngredients={ localStoreIngredients }
                handleCheckboxChange={ handleCheckboxChange }
                mesures={ mesures }
              />
            ))}
          </ul>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ handleShare }
          >
            Share
          </button>
          <FavoriteButton mealRecipe={ mealRecipe } drinkRecipe={ drinkRecipe } />
          <button
            type="button"
            onClick={ handleClick }
            disabled={ localStoreIngredients.length !== ingredients?.length }
            data-testid="finish-recipe-btn"
          >
            Finish recipe
          </button>
          <p hidden={ !linkCopied }>Link copied!</p>
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
              <Checklist
                key={ index }
                ingredient={ ingredient }
                index={ index }
                localStoreIngredients={ localStoreIngredients }
                handleCheckboxChange={ handleCheckboxChange }
                mesures={ mesures }
              />
            ))}
          </ul>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ handleShare }
          >
            Share
          </button>
          <FavoriteButton mealRecipe={ mealRecipe } drinkRecipe={ drinkRecipe } />
          <button
            type="button"
            onClick={ handleClick }
            disabled={ localStoreIngredients.length !== ingredients?.length }
            data-testid="finish-recipe-btn"
          >
            Finish recipe
          </button>
          <p hidden={ !linkCopied }>Link copied!</p>
          <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
          <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
        </div>
      )}
    </>
  );
}

export default RecipeInProgess;
