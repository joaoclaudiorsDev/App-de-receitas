import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { detailsMockDrinks, detailsMockMeals } from './mocks/DetailsMock';

describe('RecipeDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('test a meal', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52772'] });
    expect(global.fetch).toHaveBeenCalled();

    const ImgAltText = await screen.findByAltText('Teriyaki Chicken Casserole');
    const recipeTitle = await screen.findByRole('heading', { name: 'Teriyaki Chicken Casserole' });
    const recipeCategory = await screen.findByText('Chicken');
    const firstIngredient = await screen.findByText(/soy sauce/i);

    expect(ImgAltText).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
  });
  test('test a drink', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });
    expect(global.fetch).toHaveBeenCalled();

    const ImgAltText = await screen.findByAltText('Aquamarine');
    const recipeTitle = await screen.findByRole('heading', { name: 'Aquamarine' });
    const recipeCategory = await screen.findByText('Alcoholic');
    const firstIngredient = await screen.findByText(/Hpnotiq/i);

    expect(ImgAltText).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
  });
});
