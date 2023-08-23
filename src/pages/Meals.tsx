import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Meals() {
  const recipes = useSelector(
    (state: ReduxState) => state.recipes.mealRecipes,
  );
  return (
    <>
      {
        recipes.map((recipe, index) => (
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </>
  );
}

export default Meals;
