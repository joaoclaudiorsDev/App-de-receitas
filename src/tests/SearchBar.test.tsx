import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { mealsMock, mealByName } from './mocks/Meals';
import { drinksMock, drinkByName } from './mocks/Drinks';

describe('Testing SearchBar errors on Meals page', () => {
  test('Check if SearchBar throw error if has wrong recipe.', async () => {
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

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe.', async () => {
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
});

describe('Testing SearchBar errors on Drinks page', () => {
  test('Check if SearchBar throw error if has wrong recipe.', async () => {
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

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe.', async () => {
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
});

describe('Testing SearchBar component on Meals page', () => {
  test('Check if SearchBar appears when clicked.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });

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

  test('Check if SearchBar search ingredients correctly when submit.', async () => {
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

  test('Check if SearchBar search food name correctly if only have one recipe when submit.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealByName),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'apam');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /apam balik/i });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar search food correctly if only have one letter when submit.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'a');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByText('Apam balik');

    expect(result).toBeInTheDocument();
  });
});

describe('Testing SearchBar component on Drinks page', () => {
  test('Check if SearchBar appears when clicked.', async () => {
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

  test('Check if SearchBar search drink name correctly if only have one recipe when submit.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'boozy');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /boozy snickers milkshake/i });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar search ingredients correctly when submit.', async () => {
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

  test('Check if SearchBar search drink correctly if only have one letter when submit.', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinkByName),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'c');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByText('Cafe Savoy');

    expect(result).toBeInTheDocument();
  });
});
