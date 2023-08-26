import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { doneRecipes } from './mocks/DoneRecipes';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';

const done = '/done-recipes';
const share = '0-horizontal-share-btn';

describe(('Done recipes'), () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test(('Test data test ids'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    const mealBtn = await screen.findByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();

    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    const img = await screen.findByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();

    const category = await screen.findByTestId('0-horizontal-top-text');
    expect(category).toBeInTheDocument();

    const name = await screen.findByTestId('0-horizontal-name');
    expect(name).toBeInTheDocument();

    const date = await screen.findByTestId('0-horizontal-done-date');
    expect(date).toBeInTheDocument();

    const shareBtn = await screen.findByTestId(share);
    expect(shareBtn).toBeInTheDocument();

    const tag = await screen.findByTestId('0-Pasta-horizontal-tag');
    expect(tag).toBeInTheDocument();
  });

  test(('Test if filters buttons is rendered'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const allButtons = await screen.findAllByRole('button');
    expect(allButtons).toHaveLength(6);
  });

  test(('Test clipboard'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const writeText = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const shareBtn = await screen.findByTestId(share);
    expect(shareBtn).toBeInTheDocument();

    await userEvent.click(shareBtn);

    expect(writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });

  test(('Test if filters is working'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    const drink = await screen.findByRole('heading', { name: /Aquamarine/i });
    const meal = await screen.findByRole('heading', { name: /Spicy Arrabiata Penne/i });

    await userEvent.click(allBtn);

    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });

  test(('Test drink filter'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();

    await userEvent.click(drinkBtn);

    const drink = await screen.findByRole('heading', { name: /Aquamarine/i });
    expect(drink).toBeInTheDocument();
  });

  test(('Test meal filter'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const mealBtn = await screen.findByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();

    await userEvent.click(mealBtn);

    const meal = await screen.findByRole('heading', { name: /Spicy Arrabiata Penne/i });
    expect(meal).toBeInTheDocument();
  });

  test(('Test message - Link copied!'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (doneRecipes),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: [done] });

    const shareBtn = await screen.findByTestId(share);
    expect(shareBtn).toBeInTheDocument();

    await userEvent.click(shareBtn);

    const text = await screen.findAllByText(/Link copied!/i);
    expect(text).toHaveLength(2);
  });
});
