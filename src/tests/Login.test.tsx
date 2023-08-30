import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';

describe('Testing Login page', () => {
  const email = 'exemplo@exemplo.com';
  const password = '1234567';

  test('Check if the login form is displayed', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Check if the login button is disabled', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    expect(loginButton).toBeEnabled();
  });

  test('Check if the app redirects to the meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    expect(loginButton).toBeEnabled();

    await userEvent.click(loginButton);

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });

    expect(mealsTitle).toBeInTheDocument();
  });
});
