import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';

describe('testing Footer component', () => {
  test('testing Footer elements', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const footerElement = screen.getByTestId('footer');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(footerElement).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton.closest('a')).toHaveAttribute('href', '/drinks');
    expect(mealsButton.closest('a')).toHaveAttribute('href', '/meals');
  });

  test('clicking on drinks button navigates to drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const mealsButton = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(mealsButton);

    const pageTitleText = 'Drinks';

    await screen.findByText(pageTitleText);

    const pageTitle = screen.getByRole('heading', { name: pageTitleText });
    expect(pageTitle).toBeInTheDocument();
  });

  test('clicking on drinks button navigates to meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);

    const pageTitleText = 'Meals';

    await screen.findByText(pageTitleText);

    const pageTitle = screen.getByRole('heading', { name: pageTitleText });
    expect(pageTitle).toBeInTheDocument();
  });

  test('Footer is fixed to the bottom of the page', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const footerElement = getByTestId('footer');
    const footerStyles = window.getComputedStyle(footerElement);

    expect(footerStyles.position).toBe('fixed');
    expect(footerStyles.bottom).toBe('0px');
    expect(footerStyles.left).toBe('0px');
    expect(footerStyles.right).toBe('0px');
  });
});
