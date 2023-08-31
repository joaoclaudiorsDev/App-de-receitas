import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import { drinksMock, drinkByName, noDrink } from './mocks/Drinks';
import { mealsMock, noMeals } from './mocks/Meals';
import { detailsMockMeals } from './mocks/DetailsMock';

describe('Testing SearchBar errors on Meals page', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Check if SearchBar throw error if has wrong recipe.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.clearAllMocks();

    vi.spyOn(window, 'alert').mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (noMeals),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);
  });

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.clearAllMocks();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (noMeals),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);
  });
});

describe('Testing SearchBar errors on Drinks page', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Check if SearchBar throw error if has wrong recipe.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    vi.clearAllMocks();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (noDrink),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);
  });

  test('Check if SearchBar throw error if has more then 1 letter to search firstLetter recipe.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    vi.clearAllMocks();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (noDrink),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);
  });
});

describe('Testing SearchBar component on Meals page', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Check if SearchBar appears when clicked.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
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

  test('Check if SearchBar search ingredients correctly when submit.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'milk');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 3 });

    expect(result).toHaveLength(12);
  });

  test('Check if SearchBar search food name correctly if only have one recipe when submit.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'teriyaki');
    await userEvent.click(nameInput);
    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /teriyaki/i });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar search food correctly if only have one letter when submit.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsMock),
    });
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
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Check if SearchBar appears when clicked.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
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
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /name/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'Cafe');
    await userEvent.click(nameInput);

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinkByName),
    });

    await userEvent.click(submitButton);

    const result = await screen.findByRole('heading', { name: /cafe savoy/i });

    expect(result).toBeInTheDocument();
  });

  test('Check if SearchBar search ingredients correctly when submit.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const ingredientInput = screen.getByRole('radio', { name: /ingrediente/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'milk');
    await userEvent.click(ingredientInput);
    await userEvent.click(submitButton);

    const result = await screen.findAllByRole('heading', { level: 3 });

    expect(result).toHaveLength(12);
  });

  test('Check if SearchBar search drink correctly if only have one letter when submit.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });

    await userEvent.click(searchBtn);

    const searchInput = screen.getByRole('textbox');
    const nameInput = screen.getByRole('radio', { name: /primeira letra/i });
    const submitButton = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(searchInput, 'c');
    await userEvent.click(nameInput);

    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinkByName),
    });

    await userEvent.click(submitButton);

    const result = await screen.findByText('Cafe Savoy');

    expect(result).toBeInTheDocument();
  });
});
