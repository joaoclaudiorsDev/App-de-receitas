import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, ReduxStateTemp } from '../types';
import { fetchCategoriesAPI, fetchRecipesAPI } from '../redux/actions';
import {
  DRINKS_API_URL,
  DRINKS_CATEGORIES_API_URL,
  DRINKS_TYPE,
  MEALS_API_URL,
  MEALS_CATEGORIES_API_URL,
  MEALS_TYPE,
} from '../utils/fetchAPI';

function Recipes() {
  const { pathname } = useLocation();
  const [filterButtonController, setFilterButtonController] = useState(true);
  const dispatch: Dispatch = useDispatch();
  const { categories, drinks, meals } = useSelector(
    (state: ReduxStateTemp) => state.recipes,
  );

  const handleBtnAll = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (pathname === '/meals') dispatch(fetchRecipesAPI(MEALS_API_URL, MEALS_TYPE));
    if (pathname === '/drinks') dispatch(fetchRecipesAPI(DRINKS_API_URL, DRINKS_TYPE));
  };

  const handleCategoryFilter = async (event: React
    .MouseEvent<HTMLButtonElement, MouseEvent>, apiUrl: string) => {
    event.preventDefault();
    setFilterButtonController(true);
    if (!filterButtonController) return handleBtnAll(event);
    if (pathname === '/meals') {
      dispatch(fetchRecipesAPI(apiUrl, MEALS_TYPE));
      dispatch(fetchCategoriesAPI(MEALS_CATEGORIES_API_URL, MEALS_TYPE));
    } else if (pathname === '/drinks') {
      dispatch(fetchRecipesAPI(apiUrl, DRINKS_TYPE));
      dispatch(fetchCategoriesAPI(DRINKS_CATEGORIES_API_URL, DRINKS_TYPE));
    }
    setFilterButtonController(false);
  };

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchRecipesAPI(MEALS_API_URL, MEALS_TYPE));
      dispatch(fetchCategoriesAPI(MEALS_CATEGORIES_API_URL, MEALS_TYPE));
    } else if (pathname === '/drinks') {
      dispatch(fetchRecipesAPI(DRINKS_API_URL, DRINKS_TYPE));
      dispatch(fetchCategoriesAPI(DRINKS_CATEGORIES_API_URL, DRINKS_TYPE));
    }
  }, [dispatch, pathname]);

  return (
    <section>
      <button
        data-testid="All-category-filter"
        onClick={ (event) => handleBtnAll(event) }
      >
        All
      </button>
      {pathname === '/meals' && categories.slice(0, 5)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (event) => handleCategoryFilter(event, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`) }
          >
            { category.strCategory }
          </button>
        ))}
      { (pathname === '/meals' && meals.slice(0, 12).map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/meals/${recipe.idMeal}` }>
            <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        </div>
      )))}
      {pathname === '/drinks' && categories.slice(0, 5)
        .map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (event) => handleCategoryFilter(event, `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`) }
          >
            { category.strCategory }
          </button>
        ))}
      { (pathname === '/drinks' && drinks.slice(0, 12)
        .map((drink, index) => (
          <div key={ index }>
            <Link to={ `/drinks/${drink.idDrink}` }>
              <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
                <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </Link>
          </div>
        )))}
    </section>
  );
}
export default Recipes;
