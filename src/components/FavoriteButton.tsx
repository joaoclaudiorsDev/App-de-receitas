import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinksType, MealType } from '../types';
import styles from './FavoriteButton.module.css';

type FavoritePorpsType = {
  mealRecipe: MealType | undefined;
  drinkRecipe: DrinksType | undefined;
};

function FavoriteButton(favoriteProps: FavoritePorpsType) {
  const { mealRecipe, drinkRecipe } = favoriteProps;
  const [isFavorite, setIsFavorite] = useState(false);
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

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!isFavorite) {
      favoriteRecipes.push(favRecipesFormat());
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe: { id: string; }) => recipe.id !== mealRecipe?.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkFavorite();
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));
  }, [pathname]);

  return (
    <label
      htmlFor="favorite"
    >
      <input
        className={ styles.favoriteButton }
        type="checkbox"
        id="favorite"
        onClick={ handleFavorite }
      />
      {isFavorite
        ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="full" />
        : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="empty" />}
    </label>
  );
}

export default FavoriteButton;
