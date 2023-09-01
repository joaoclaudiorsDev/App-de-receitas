import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { mealsMock } from './mocks/Meals';

describe('Testing Profile page.', () => {
  const userEmail = 'exemplo@exemplo.com';

  test('Checks if the users email is being rendered and saved in the global state', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    await userEvent.type(emailInput, userEmail);
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginButton);

    const profileIcon = screen.getByAltText(/profile-icon/i);
    await userEvent.click(profileIcon);

    const email = screen.getByText(userEmail);
    const currentState = store.getState();

    expect(email).toBeInTheDocument();
    expect(currentState).toHaveProperty('user', { email: userEmail });
  });

  test('Check if respective buttons are displayed.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });

    expect(logoutBtn).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
  });

  test('Check if the app redirects to the Login page and localStorage is cleared after log out.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutBtn);

    const storedUser = localStorage.getItem('user');
    const loginHeader = screen.getByRole('heading', { name: /login/i });

    expect(storedUser).toBeNull();
    expect(loginHeader).toBeInTheDocument();
  });

  test('Check if the app redirects to the "Done Recipes" page after click on respective button.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    await userEvent.click(doneRecipesBtn);

    const doneRecipesHeader = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesHeader).toBeInTheDocument();
  });

  test('Check if the app redirects to the "Favorite Recipes" page after click on respective button.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const favRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    await userEvent.click(favRecipesBtn);

    const favRecipesHeader = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(favRecipesHeader).toBeInTheDocument();
  });
});
