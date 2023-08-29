import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import { DrinksType, MealType, DoneRecipeType } from '../types';
import styles from './RecipeInProgess.module.css';
import FavoriteButton from '../components/FavoriteButton';

function RecipeInProgess() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType | undefined>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinksType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [mesures, setMesures] = useState<string[]>();
  const [isLoaded, setIsLoaded] = useState(true);
  const [done, setDone] = useState({} as any);
  const [allChecked, setAllChecked] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);

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
  }, [pathname]);

  const handleCheckboxChange = (position: number) => {
    if (pathname.includes('meals')) {
      const updatedCheckedIngredients = {
        ...done,
        [position]: !done[position],
        meals: [id],
        drinks: done.drinks,
      };
      setDone(updatedCheckedIngredients);
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(updatedCheckedIngredients));
      const areAllChecked = ingredients
        ? ingredients
          .every((recipe, index) => updatedCheckedIngredients[index]) : false;
      setAllChecked(areAllChecked);
    }
    if (pathname.includes('drinks')) {
      const updatedCheckedIngredients = {
        ...done,
        [position]: !done[position],
        meals: done.meals,
        drinks: [id],
      };
      setDone(updatedCheckedIngredients);
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(updatedCheckedIngredients));
      const areAllChecked = ingredients
        ? ingredients
          .every((recipe, index) => updatedCheckedIngredients[index]) : false;
      setAllChecked(areAllChecked);
    }
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    setDone(inProgressRecipes);
  }, [pathname]);

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
    navigator.clipboard.writeText(`http://localhost:3000/${mealRecipe?.idMeal ? 'meals' : 'drinks'}/${mealRecipe?.idMeal ? `${mealRecipe.idMeal}` : `${drinkRecipe?.idDrink}`}`);
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
              <li key={ index }>
                <label
                  className={ done[index] ? styles.done : '' }
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name=""
                    id={ ingredient }
                    onChange={ () => handleCheckboxChange(index) }
                    checked={ done[index] }
                  />
                  <span>
                    {`${ingredient} - ${mesures?.[index]}`}
                  </span>
                </label>
              </li>
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
            disabled={ !allChecked }
            data-testid="finish-recipe-btn"
          >
            Finish recipe
          </button>
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
              <li key={ index }>
                <label
                  className={ done[index] ? styles.done : '' }
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name=""
                    id={ ingredient }
                    onChange={ () => handleCheckboxChange(index) }
                    checked={ done[index] }
                  />
                  <span>
                    {`${ingredient} - ${mesures?.[index]}`}
                  </span>
                </label>
              </li>
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
            disabled={ !allChecked }
            data-testid="finish-recipe-btn"
          >
            Finish recipe
          </button>
          <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
          <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
        </div>
      )}
    </>
  );
}

export default RecipeInProgess;
