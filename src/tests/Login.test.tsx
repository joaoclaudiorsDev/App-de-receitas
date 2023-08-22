import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';

describe('Teste da página de Login.', () => {
  const email = 'exemplo@exemplo.com';
  const password = '1234567';

  test('Verifica se existem os inputs de email, senha e botão de login.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se o botão de login é habilitado e desabilitado corretamente.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    expect(loginButton).toBeEnabled();
  });

  test('Verifica se o e-mail do usuário é salvo no estado global após o login.', async () => {
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
