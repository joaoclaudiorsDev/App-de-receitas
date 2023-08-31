import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DoneRecipeType, DrinksType, MealType } from '../types';
import ParagraphComponent from '../components/ParagraphComponent';
import UnfavoriteButton from '../components/UnfavoriteButton';
import shareIcon from '../images/shareIcon.svg';
import styles from './FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<DoneRecipeType[]>([]);
  const { pathname } = useLocation();
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const favoriteRecipesFromStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteRecipes(favoriteRecipesFromStorage);
  }, []);

  const handleUnfavorite = (indexToRemove: number) => {
    const updatedFavoriteRecipes = favoriteRecipes
      .filter((_, index) => index !== indexToRemove);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setFavoriteRecipes(updatedFavoriteRecipes);
  };

  const handleShare = (recipeURL: string) => {
    navigator.clipboard.writeText(recipeURL);
    const alert = document.createElement('div');
    alert.innerHTML = 'Link copied!';
    document.body.appendChild(alert);
    console.log('clicou');
    setTimeout(() => {
      document.body.removeChild(alert);
    }, 2000);
  };

  const filteredRecipes = favoriteRecipes.filter((recipe) => {
    if (filterType === 'all') {
      return true;
    }
    if (filterType === 'meals') {
      return recipe.type === 'meal';
    }
    if (filterType === 'drinks') {
      return recipe.type === 'drink';
    }
    return false;
  });

  return (
    <div className={ styles.mainFavoriteDiv }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterType('all') }
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFilterType('meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        onClick={ () => setFilterType('drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filteredRecipes.map((recipe, index) => (
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

          <button
            type="button"
            onClick={ () => handleShare(
              `${
                window.location.origin
              }/${recipe.type}s/${recipe.id}`,
            ) }
          >
            <img
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <UnfavoriteButton
            mealRecipe={ recipe as unknown as MealType }
            drinkRecipe={ recipe as unknown as DrinksType }
            index={ index }
            onUnfavorite={ () => handleUnfavorite(index) }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
