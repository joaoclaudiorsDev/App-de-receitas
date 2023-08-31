import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { mealsMock } from './mocks/Meals';
import { drinksMock } from './mocks/Drinks';

describe('testing Footer component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('clicking on drinks button navigates to drinks page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });

    const drinksButton = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);

    const pageTitleText = 'Drinks';

    await screen.findByText(pageTitleText);

    const pageTitle = screen.getByRole('heading', { name: pageTitleText });
    expect(pageTitle).toBeInTheDocument();
  });

  test('clicking on meals button navigates to meals page', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);

    const pageTitleText = 'Meals';

    await screen.findByText(pageTitleText);

    const pageTitle = screen.getByRole('heading', { name: pageTitleText });
    expect(pageTitle).toBeInTheDocument();
  });

  test('Footer is fixed to the bottom of the page', () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    const { getByTestId } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const footerElement = getByTestId('footer');
    const footerStyles = window.getComputedStyle(footerElement);

    expect(footerStyles.position).toBe('fixed');
    expect(footerStyles.bottom).toBe('0px');
    expect(footerStyles.left).toBe('0px');
    expect(footerStyles.right).toBe('0px');
  });
});
