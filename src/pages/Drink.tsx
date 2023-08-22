import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Drink() {
  const recipes = useSelector(
    (state: ReduxState) => state.recipes.drinkRecipes,
  );

  return (
    <>
      {
        recipes.map((recipe) => (
          <div key={ recipe.idDrink }>
            <h1>{recipe.strDrink}</h1>
          </div>
        ))
      }
    </>
  );
}

export default Drink;
