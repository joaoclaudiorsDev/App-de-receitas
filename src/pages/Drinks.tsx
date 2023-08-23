import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxStateTemp } from '../types';

function Drinks() {
  const { id } = useParams();
  const { drinks } = useSelector((state: ReduxStateTemp) => state.recipes);
  const currDrink = drinks.find((drink) => drink.idDrink === id);
  return (
    <div
      key={ currDrink?.idDrink }
      data-testid={ `${currDrink}-recipe-card` }
    >
      <h3 data-testid={ `${currDrink}-card-name` }>{ currDrink?.strDrink }</h3>
      <img
        src={ currDrink?.strDrinkThumb }
        alt={ currDrink?.strDrink }
        data-testid={ `${currDrink}-card-img` }
      />
    </div>
  );
}

export default Drinks;
