/*eslint-disable*/

import { screen } from '@testing-library/react';
import App from "../App";
import { renderWithRouterAndRedux } from "./helpers/RenderWith";
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Testing Profile page.', () => {
  
  test('Checks if the users email is being rendered and saved in the global state', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /enter/i });
  
    await userEvent.type(emailInput, 'exemplo@exemplo.com');
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginButton);
  
    const profileIcon = screen.getByAltText(/profile-icon/i);
    await userEvent.click(profileIcon);
  
    const email = screen.getByText('exemplo@exemplo.com');
    const currentState = store.getState();
    
    expect(email).toBeInTheDocument();
    expect(currentState).toHaveProperty('user', { email: 'exemplo@exemplo.com' });
    
  })
  
  test('Check if respective buttons are displayed.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });

    expect(logoutBtn).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
  })

  // test('Check if localStorage.clear() is called on logout.', async () => {
  //   // Create a mock for localStorage.clear
    
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
  //   const teste = vi.spyOn(localStorage, 'clear').mockImplementation(() => {
      
  //   });
  
  //   const logoutBtn = screen.getByRole('button', { name: /logout/i });
  //   await userEvent.click(logoutBtn);
  //   expect(teste).toHaveBeenCalled();
  
  //   const storedUser = localStorage.getItem('user');
  //   const loginHeader = screen.getByRole('heading', { name: /login/i });
  
  //   expect(storedUser).toBeNull();
  //   expect(loginHeader).toBeInTheDocument();
  
  //   // Verify if localStorage.clear was called
  
  //   // Clean up the mock
  //   // localStorageClearMock.mockRestore();
  // });

})