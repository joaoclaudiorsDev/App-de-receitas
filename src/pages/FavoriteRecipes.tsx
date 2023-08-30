import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType, DrinksType, MealType } from '../types';
import ParagraphComponent from '../components/ParagraphComponent';
import UnfavoriteButton from '../components/UnfavoriteButton';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    const favoriteRecipesFromStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteRecipes(favoriteRecipesFromStorage);
  }, []);

  const handleUnfavorite = (indexToRemove: any) => {
    const updatedFavoriteRecipes = favoriteRecipes
      .filter((_, index) => index !== indexToRemove);
    setFavoriteRecipes(updatedFavoriteRecipes);
  };
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <img
              style={ { width: '330px', height: 'auto' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <ParagraphComponent index={ index } recipe={ recipe } />

          <button type="button">
            <img
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <UnfavoriteButton
            mealRecipe={ recipe as MealType }
            drinkRecipe={ recipe as DrinksType }
            index={ index }
            onUnfavorite={ () => handleUnfavorite(index) }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
