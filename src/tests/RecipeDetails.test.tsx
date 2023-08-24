import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { detailsMockMeals } from './mocks/DetailsMock';

describe('RecipeDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('test a meal', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52772'] });
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });
    const recipeTitle1 = screen.getByTestId('recipe-title');
    expect(recipeTitle1).toBeInTheDocument();
  });
});
