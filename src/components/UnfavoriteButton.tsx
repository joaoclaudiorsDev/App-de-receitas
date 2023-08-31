import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from './FavoriteButton.module.css';
import { DrinksType, MealType } from '../types';

type FavoritePropsType = {
  mealRecipe: MealType | undefined;
  drinkRecipe: DrinksType | undefined;
  index: number;
  onUnfavorite: () => void;
};

function UnfavoriteButton(favoriteProps: FavoritePropsType) {
  const { mealRecipe, drinkRecipe, index, onUnfavorite } = favoriteProps;
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();

  const checkFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (pathname.includes('meals')) {
      setIsFavorite(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === mealRecipe?.idMeal));
    } else {
      setIsFavorite(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === drinkRecipe?.idDrink));
    }
  };

  const handleUnfavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe: { id: string; }) => recipe.id !== (pathname
        .includes('meals') ? mealRecipe?.idMeal : drinkRecipe?.idDrink));

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    onUnfavorite();
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
        checked={ isFavorite }
        onChange={ handleUnfavorite }
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
