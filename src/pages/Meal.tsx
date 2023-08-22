import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Meal() {
  const recipes = useSelector(
    (state: ReduxState) => state.recipes.mealRecipes,
  );

  return (
    <>
      {
        recipes.map((recipe) => (
          <div key={ recipe.idMeal }>
            <h1>{recipe.strMeal}</h1>
          </div>
        ))
      }
    </>
  );
}

export default Meal;
