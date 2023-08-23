import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkValuesToFetch } from '../utils/checkValuesToFetch';
import { checkFetchErrorFirstLetter } from '../utils/checkFetchErrors';
import { createDrinkRecipes, createMealRecipes } from '../redux/actions';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = (search: string) => {
    setSelected(search);
  };

  const handleSubmit = async () => {
    const recipes = await checkValuesToFetch(
      selected,
      pathname,
      inputValue,
    );
    checkFetchErrorFirstLetter(selected, inputValue);
    if (!recipes) {
      return window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipes.length === 1 && pathname === '/meals') {
      dispatch(createMealRecipes(recipes));
      return navigate(`/meals/${recipes[0].idMeal}`);
    }
    if (recipes.length === 1 && pathname === '/drinks') {
      dispatch(createDrinkRecipes(recipes));
      return navigate(`/drinks/${recipes[0].idDrink}`);
    }
    if (recipes && pathname === '/drinks') {
      dispatch(createDrinkRecipes(recipes.slice(0, 12)));
    }
    if (recipes && pathname === '/meals') {
      dispatch(createMealRecipes(recipes.slice(0, 12)));
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
        value={ inputValue }
      />
      <label htmlFor="ingredient">
        <span>Ingrediente</span>
        <input
          type="radio"
          name="search"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ () => handleClick('ingredient') }
        />
      </label>
      <label htmlFor="name">
        <span>Name</span>
        <input
          type="radio"
          name="search"
          id="name"
          data-testid="name-search-radio"
          onClick={ () => handleClick('name') }
        />
      </label>
      <label htmlFor="firstLetter">
        <span>Primeira letra</span>
        <input
          type="radio"
          name="search"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          onClick={ () => handleClick('firstLetter') }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSubmit }
      >
        Pesquisar

      </button>
    </div>
  );
}

export default SearchBar;
