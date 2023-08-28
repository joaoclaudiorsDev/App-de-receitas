import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../types';
import { doneRecipes } from '../tests/mocks/DoneRecipes';
import ParagraphComponent from './ParagraphComponent';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState<DoneRecipeType[]>();
  const [onOff, setOnOff] = useState(false);

  const handleShare = (recipeId: string, recipeType: string) => {
    setOnOff(!onOff);
    navigator.clipboard.writeText(`http://localhost:3000/${recipeType}s/${recipeId}`);
  };

  const handleFilter = (type: string) => {
    if (type === 'reset') {
      const reponse = localStorage.getItem('doneRecipes');
      setRecipesDone(JSON.parse(reponse as any));
    }
    if (type === 'meals') {
      const temp = recipesDone?.filter((recipe: any) => recipe.type === 'meal');
      setRecipesDone(temp);
    }
    if (type === 'drinks') {
      const temp = recipesDone?.filter((recipe: any) => recipe.type === 'drink');
      setRecipesDone(temp);
    }
  };

  useEffect(() => {
    const reponse = localStorage.getItem('doneRecipes');
    setRecipesDone(JSON.parse(reponse as any));
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter('reset') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meals') }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drinks') }
      >
        Drinks

      </button>
      { recipesDone && recipesDone.map((recipe: any, index: any) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            <img
              style={ { width: '330px', height: 'auto' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <ParagraphComponent index={ index } recipe={ recipe } />
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          { recipe.tags.map((tag: any, i: any) => (
            <p
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          )) }
          <button type="button" onClick={ () => handleShare(recipe.id, recipe.type) }>
            <img
              src="./src/images/shareIcon.svg"
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p hidden={ !onOff }>Link copied!</p>
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
