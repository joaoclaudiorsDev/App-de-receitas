import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste da página de Login.', () => {
  test('Verifica se existem os inputs de email, senha e botão de login.', () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se o botão de login é habilitado e desabilitado corretamente.', async () => {
    render(<App />);

    const email = 'exemplo@exemplo.com';
    const password = '1234567';

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    expect(loginButton).toBeEnabled();
  });
});
