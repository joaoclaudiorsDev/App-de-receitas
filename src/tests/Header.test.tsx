import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { mealsMock } from './mocks/Meals';
import { drinksMock } from './mocks/Drinks';

describe('testing Header component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('testing Header with /meals', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    const profileBtn = screen.getByRole('button', { name: /profile-icon/i });
    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    expect(mealsTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toBeInTheDocument();

    await userEvent.click(searchBtn);

    expect(searchInput).not.toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { name: /profile/i });

    expect(profileTitle).toBeInTheDocument();
  });
  test('testing Header with /drinks', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const drinksTitle = screen.getByRole('heading', { name: /drinks/i });
    const profileBtn = screen.getByRole('button', { name: /profile-icon/i });
    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    expect(drinksTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toBeInTheDocument();

    await userEvent.click(searchBtn);

    expect(searchInput).not.toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { name: /profile/i });

    expect(profileTitle).toBeInTheDocument();
  });
  test('testing Header with /profile', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    const profileBtn = screen.getByRole('button', { name: /profile-icon/i });

    expect(profileTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    await userEvent.click(profileBtn);

    expect(profileTitle).toBeInTheDocument();
  });
  test('testing Header with /done-recipes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });
    const profileBtn = screen.getByRole('button', { name: /profile-icon/i });

    expect(doneRecipesTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { name: /profile/i });

    expect(profileTitle).toBeInTheDocument();
  });
  test('testing Header with /favorite-recipes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });

    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    const profileBtn = screen.getByRole('button', { name: /profile-icon/i });

    expect(favoriteRecipesTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { name: /profile/i });

    expect(profileTitle).toBeInTheDocument();
  });
});
