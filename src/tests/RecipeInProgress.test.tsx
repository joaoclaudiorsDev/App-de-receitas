import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { detailsMockDrinks, detailsMockMeals } from './mocks/DetailsMock';

describe('RecipeInProgess', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('test a meal', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52772/in-progress'] });
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
  test('test favorite button', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319/in-progress'] });
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
  test('test favorite button', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319/in-progress'] });
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
    expect(writeText).toHaveBeenCalled();
  });
});
