import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Meals() {
  const { id } = useParams();
  const { meals } = useSelector((state: ReduxState) => state.recipes);
  const currMeal = meals.find((meal) => meal.idMeal === id);
  return (
    <div
      key={ currMeal?.idMeal }
      data-testid={ `${currMeal}-recipe-card` }
    >
      <h3 data-testid={ `${currMeal}-card-name` }>{ currMeal?.strMeal }</h3>
      <img
        src={ currMeal?.strMealThumb }
        alt={ currMeal?.strMeal }
        data-testid={ `${currMeal}-card-img` }
      />
    </div>
  );
}

export default Meals;
