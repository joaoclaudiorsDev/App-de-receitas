import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';

describe('Testing SearchBar component', () => {
  test('Check if SearchBar appears when clicked. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const firstLetter = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Check if SearchBar search ingredients correctly when submit. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'milk');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 2 });

    expect(result).toHaveLength(12);
  });

  test('Check if SearchBar throw error if has wrong recipe. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });

  test('Check if SearchBar throw error if has wrong recipe. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });

  test('Check if SearchBar search food name correctly if only have one recipe when submit. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'milk');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /Grilled eggplant with coconut milk/i, level: 1 });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar appears when clicked. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const firstLetter = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Check if SearchBar search ingredients correctly when submit. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'milk');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 2 });

    expect(result).toHaveLength(12);
  });

  test('Check if SearchBar search drink name correctly if only have one recipe when submit. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'vitamin');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /Pysch Vitamin Light/i, level: 1 });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar search drink correctly if only have one letter when submit. Drinks page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'v');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 2 });

    expect(result).toHaveLength(12);
  });

  test('Check if SearchBar search food correctly if only have one letter when submit. Meals page', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'v');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 2 });

    expect(result).toHaveLength(7);
  });
});
