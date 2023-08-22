import { DrinksType } from '../types';

type DrinksProps = {
  drink: DrinksType,
  index: number,
};

function Drinks({ drink, index }: DrinksProps) {
  return (
    <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

export default Drinks;
