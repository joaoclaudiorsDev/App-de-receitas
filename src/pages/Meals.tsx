import { MealType } from '../types';

type MealsProps = {
  meal: MealType,
  index: number;
};

function Meals({ meal, index }: MealsProps) {
  return (
    <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

export default Meals;
