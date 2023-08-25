import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../pages/RecipeDetails.css';
import { DrinksType, MealType } from '../types';

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
    } else {
      setIsFavorite(favoriteRecipes
        .some((recipe: { id: string; }) => recipe.id === drinkRecipe?.idDrink));
    }
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (pathname.includes('meals')) {
      const mealsFav = {
        id: mealRecipe?.idMeal,
        type: 'meal',
        nationality: mealRecipe?.strArea,
        category: mealRecipe?.strCategory,
        alcoholicOrNot: '',
        name: mealRecipe?.strMeal,
        image: mealRecipe?.strMealThumb,
      };
      favoriteRecipes.push(mealsFav);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    } else {
      const drinksFav = {
        id: drinkRecipe?.idDrink,
        type: 'drink',
        nationality: '',
        category: drinkRecipe?.strCategory,
        alcoholicOrNot: drinkRecipe?.strAlcoholic,
        name: drinkRecipe?.strDrink,
        image: drinkRecipe?.strDrinkThumb,
      };
      favoriteRecipes.push(drinksFav);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
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
        type="checkbox"
        id="favorite"
        onClick={ handleFavorite }
      />
      {isFavorite
        ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="favorite" />
        : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite" />}
    </label>
  );
}

export default FavoriteButton;
