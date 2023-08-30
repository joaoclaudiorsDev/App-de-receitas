import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from './FavoriteButton.module.css';
import { DrinksType, MealType } from '../types';

type UnfavoritePropsType = {
  mealRecipe: MealType | undefined;
  drinkRecipe: DrinksType | undefined;
  index: number;
};

function UnfavoriteButton(unfavoriteProps: UnfavoritePropsType) {
  const { mealRecipe, drinkRecipe, index, onUnfavorite } = unfavoriteProps;
  const [isFavorite, setIsFavorite] = useState(true); // Inicia como favoritado
  const { pathname } = useLocation();

  const checkFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (pathname.includes('meals')) {
      setIsFavorite(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === mealRecipe?.idMeal));
      console.log(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === mealRecipe?.idMeal));
    } else {
      setIsFavorite(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === drinkRecipe?.idDrink));
    }
  };

  const favRecipesFormat = () => {
    return {
      id: pathname.includes('meals') ? mealRecipe?.idMeal : drinkRecipe?.idDrink,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: pathname.includes('meals') ? mealRecipe?.strArea : '',
      category: pathname
        .includes('meals') ? mealRecipe?.strCategory : drinkRecipe?.strCategory,
      alcoholicOrNot: pathname.includes('meals') ? '' : drinkRecipe?.strAlcoholic,
      name: pathname.includes('meals') ? mealRecipe?.strMeal : drinkRecipe?.strDrink,
      image: pathname
        .includes('meals') ? mealRecipe?.strMealThumb : drinkRecipe?.strDrinkThumb,
    };
  };

  const handleUnfavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!isFavorite) {
      favoriteRecipes.push(favRecipesFormat());
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
      onUnfavorite();
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe: { id: string; }) => recipe.id !== mealRecipe?.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setIsFavorite(false);
      onUnfavorite();
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [pathname]);

  return (
    <label
      htmlFor={ `unfavorite-${index}` }
    >
      <input
        className={ styles.favoriteButton }
        type="checkbox"
        id={ `unfavorite-${index}` }
        onClick={ handleUnfavorite }
      />
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        alt="unfavorite"
      />
    </label>
  );
}

export default UnfavoriteButton;
