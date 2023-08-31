import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { detailsMockDrinks, detailsMockMeals } from './mocks/DetailsMock';

const initialEntriesMeals = ['/meals/52772/in-progress'];
const initialEntriesDrinks = ['/drinks/178319/in-progress'];
const recipeName = 'Teriyaki Chicken Casserole';

describe('RecipeInProgess', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('test a meal', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesMeals });
    expect(global.fetch).toHaveBeenCalled();

    const ImgAltText = await screen.findByAltText(recipeName);
    const recipeTitle = await screen.findByRole('heading', { name: recipeName });
    const recipeCategory = await screen.findByText('Chicken');
    const firstIngredient = await screen.findByText(/soy sauce/i);

    expect(ImgAltText).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
  });
  test('test favorite button', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesDrinks });
    expect(global.fetch).toHaveBeenCalled();

    const localStorageMock = vi.spyOn(Storage.prototype, 'setItem');
    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('alt', 'empty');

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('alt', 'full');
    expect(localStorageMock).toHaveBeenCalled();

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('alt', 'empty');
    expect(localStorageMock).toHaveBeenCalled();
  });
  test('test favorite button, on Drinks page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesDrinks });
    expect(global.fetch).toHaveBeenCalled();

    const ImgAltText = await screen.findByAltText('Aquamarine');
    const recipeTitle = await screen.findByRole('heading', { name: 'Aquamarine' });
    const recipeCategory = await screen.findByText('Alcoholic');
    const firstIngredient = await screen.findByText(/Hpnotiq/i);
    const shareButton = await screen.findByRole('button', { name: /share/i });

    expect(ImgAltText).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();

    const writeText = vi.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    await userEvent.click(shareButton);
    expect(writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });

  test('test favorite button, on Meals page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesMeals });
    expect(global.fetch).toHaveBeenCalled();

    const ImgAltText = await screen.findByAltText(recipeName);
    const recipeTitle = await screen.findByRole('heading', { name: recipeName });
    const firstIngredient = await screen.findByText('soy sauce - 3/4 cup');
    const shareButton = await screen.findByRole('button', { name: /share/i });

    expect(recipeTitle).toBeInTheDocument();
    expect(ImgAltText).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();

    const writeText = vi.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    await userEvent.click(shareButton);
    expect(writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52772');
  });

  test('save doneRecipe in localStorage when clicked, when meals page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesMeals });
    const localStorageMock = vi.spyOn(Storage.prototype, 'setItem');

    const ingredient1 = await screen.findByRole('checkbox', { name: 'soy sauce - 3/4 cup' });
    const ingredient2 = await screen.findByRole('checkbox', { name: 'water - 1/2 cup' });
    const ingredient3 = await screen.findByRole('checkbox', { name: 'brown sugar - 1/4 cup' });
    const ingredient4 = await screen.findByRole('checkbox', { name: 'ground ginger - 1/2 teaspoon' });
    const ingredient5 = await screen.findByRole('checkbox', { name: 'minced garlic - 1/2 teaspoon' });
    const ingredient6 = await screen.findByRole('checkbox', { name: 'cornstarch - 4 Tablespoons' });
    const ingredient7 = await screen.findByRole('checkbox', { name: 'chicken breasts - 2' });
    const ingredient8 = await screen.findByRole('checkbox', { name: 'stir-fry vegetables - 1 (12 oz.)' });
    const ingredient9 = await screen.findByRole('checkbox', { name: 'brown rice - 3 cups' });

    await userEvent.click(ingredient1);
    await userEvent.click(ingredient2);
    await userEvent.click(ingredient3);
    await userEvent.click(ingredient4);
    await userEvent.click(ingredient5);
    await userEvent.click(ingredient6);
    await userEvent.click(ingredient7);
    await userEvent.click(ingredient8);
    await userEvent.click(ingredient9);

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });

    await userEvent.click(finishButton);

    expect(localStorageMock).toHaveBeenCalled();
  });

  test('save doneRecipe in localStorage when clicked, when drinks page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesDrinks });

    const ingredient1 = await screen.findByRole('checkbox', { name: 'Hpnotiq - 2 oz' });
    const ingredient2 = await screen.findByRole('checkbox', { name: 'Pineapple Juice - 1 oz' });
    const ingredient3 = await screen.findByRole('checkbox', { name: 'Banana Liqueur - 1 oz' });

    await userEvent.click(ingredient1);
    await userEvent.click(ingredient2);
    await userEvent.click(ingredient3);

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });

    await userEvent.click(finishButton);
  });

  test('check if when ingredient was clicked change the css', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: initialEntriesMeals });
    vi.spyOn(Storage.prototype, 'setItem');

    const ingredient1 = await screen.findByTestId('0-ingredient-step');

    expect(ingredient1).toHaveStyle('text-decoration: line-through solid black');

    await userEvent.click(ingredient1);

    expect(ingredient1).not.toHaveStyle('text-decoration: line-through solid black');
  });
});
