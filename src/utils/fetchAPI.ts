export const fetchIngredient = async (ingrediente: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={${ingrediente}}`);
  const data = await response.json();
  return data.meals;
};

export const fetchName = async (name: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const fetchFirstLetter = async (firstLetter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.meals;
};
