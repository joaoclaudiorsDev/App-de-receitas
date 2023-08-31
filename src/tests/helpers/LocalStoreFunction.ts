export default function getIngredientsFromLocalStorage(
  pathname: string,
  id: string | undefined,
) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

  if (pathname.includes('meals')) {
    const meals = inProgressRecipes.meals || [];
    return meals[Number(id)] || [];
  }
  const drinks = inProgressRecipes.drinks || [];
  return drinks[Number(id)] || [];
}
