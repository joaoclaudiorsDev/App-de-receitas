import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Drinks() {
  const recipes = useSelector(
    (state: ReduxState) => state.recipes.drinkRecipes,
  );

  return (
    <>
      {
        recipes.map((recipe, index) => (
          <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
          </div>
        ))
      }
    </>
  );
}

export default Drinks;
