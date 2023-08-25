import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { mealsMock } from './mocks/Meals';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';
import { drinksMock } from './mocks/Drinks';
import { drinksFilterCategory, mealsFilterCategory } from './mocks/Recipes';

describe(('Recipe Component'), () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test(('Test if is loading meals'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(global.fetch).toHaveBeenCalled();

    const mealCard = await screen.findByTestId('0-recipe-card');
    const mealName = await screen.findByTestId('0-card-name');
    const mealImg = await screen.findByTestId('0-card-img');

    const allMeals = await screen.findAllByRole('heading', { level: 3 });

    expect(mealCard).toBeInTheDocument();
    expect(mealImg).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
    expect(allMeals.length).toBe(12);
    expect(allMeals.length).not.toBe(13);
  });

  test(('Test if is loading drinks'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    expect(global.fetch).toHaveBeenCalled();

    const drinkCard = await screen.findByTestId('0-recipe-card');
    const drinkName = await screen.findByTestId('2-card-name');
    const drinkImg = await screen.findByTestId('1-card-img');

    const allDrink = await screen.findAllByRole('heading', { level: 3 });

    expect(drinkCard).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(allDrink.length).toBe(12);
    expect(allDrink.length).not.toBe(13);
  });

  test(('Test drinks category buttons'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksFilterCategory),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const allBtn = await screen.findByTestId('All-category-filter');
    expect(allBtn).toBeInTheDocument();

    const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryBtn).toBeInTheDocument();

    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    expect(cocktailBtn).toBeInTheDocument();

    const shakeBtn = await screen.findByTestId('Shake-category-filter');
    expect(shakeBtn).toBeInTheDocument();

    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');
    expect(cocoaBtn).toBeInTheDocument();

    const otherUknBtn = await screen.findByTestId('Other / Unknown-category-filter');
    expect(otherUknBtn).toBeInTheDocument();
  });
  test(('Test meals category buttons'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsFilterCategory),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const allBtn = await screen.findByTestId('All-category-filter');
    expect(allBtn).toBeInTheDocument();

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefBtn).toBeInTheDocument();

    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    expect(breakfastBtn).toBeInTheDocument();

    const chiickenBtn = await screen.findByTestId('Chicken-category-filter');
    expect(chiickenBtn).toBeInTheDocument();

    const deseertBtn = await screen.findByTestId('Dessert-category-filter');
    expect(deseertBtn).toBeInTheDocument();

    const goatBtn = await screen.findByTestId('Goat-category-filter');
    expect(goatBtn).toBeInTheDocument();
  });

  test(('Test if filter category is working - meals'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsFilterCategory),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const beefFilter = await screen.findByTestId('Beef-category-filter');
    expect(beefFilter).toBeInTheDocument();

    await userEvent.click(beefFilter);

    const firstBeef = await screen.findByTestId('1-card-name');
    expect(firstBeef).toBeInTheDocument();
  });

  test(('Test if filter category is working - drinks'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksFilterCategory),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const shakeFilter = await screen.findByTestId('Shake-category-filter');
    expect(shakeFilter).toBeInTheDocument();

    await userEvent.click(shakeFilter);

    const firstShake = await screen.findByTestId('0-card-name');
    expect(firstShake).toBeInTheDocument();
  });

  test(('Test redirection to recipes details - drinks'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const drink = await screen.findByRole('heading', { name: /Baby Eskimo/i });
    expect(drink).toBeInTheDocument();

    await userEvent.click(drink);

    const recipePhoto = await screen.findByAltText(/Baby Eskimo/i);
    expect(recipePhoto).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/wywrtw1472720227.jpg');
  });

  test(('Test redux drinks'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const allBttn = await screen.findByTestId('All-category-filter');
    expect(allBttn).toBeInTheDocument();

    await userEvent.click(allBttn);

    const currentStates = store.getState();
    expect(currentStates).toHaveProperty('user', { email: '' });
  });

  test(('Test redux meals'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const allBttn = await screen.findByTestId('All-category-filter');
    expect(allBttn).toBeInTheDocument();

    await userEvent.click(allBttn);

    const currentStates = store.getState();
    expect(currentStates).toHaveProperty('user', { email: '' });
  });
});
