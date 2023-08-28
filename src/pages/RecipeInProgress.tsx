import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealId } from '../utils/fetchAPI';
import { DrinksType, MealType } from '../types';
import styles from './RecipeInProgess.module.css';

function RecipeInProgess() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { pathname } = useLocation();
  const [mealRecipe, setMealRecipe] = useState<MealType | undefined>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinksType>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [done, setDone] = useState({} as any);
  const [allChecked, setAllChecked] = useState(false);

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

  const handleCheckboxChange = (index) => {
    const updatedCheckedIngredients = {
      ...done,
      [index]: !done[index],
    };
    setDone(updatedCheckedIngredients);
    const areAllChecked = ingredients.every((ingredient, index) => updatedCheckedIngredients[index]);
    setAllChecked(areAllChecked);
  };

  const handleClick = () => {
    navigate('/done-recipes');
  };

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
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name=""
                    id={ ingredient }
                    onChange={ () => handleCheckboxChange(index) }
                  />
                  <span className={ done[index] ? styles.done : '' }>
                    {`${ingredient} - ${mealRecipe[`strMeasure${index + 1}`]}`}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={ handleClick }
            disabled={ !allChecked }
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
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name=""
                    id={ ingredient }
                    onChange={ () => handleCheckboxChange(index) }
                  />
                  <span className={ done[index] ? styles.done : '' }>
                    {`${ingredient} - ${drinkRecipe[`strMeasure${index + 1}`]}`}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <button type="button" onClick={ handleClick }>Finish recipe</button>
          <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
          <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
        </div>
      )}
    </>
  );
}

export default RecipeInProgess;
