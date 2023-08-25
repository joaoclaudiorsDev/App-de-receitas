import Meals from '../pages/Meals';

function DoneRecipes() {
  const recipesDone = localStorage.getItem('doneRecipes');
  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meals-btn">Meals</button>
      <button type="button" data-testid="filter-by-drinks-btn">Drinks</button>
      { recipesDone && recipesDone.map((recipe, index) => (
        <div key={ index }>
          <h3 data-testid={ `${index}-horizontal-top-text` }>{ recipe.strMeals }</h3>
          <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
