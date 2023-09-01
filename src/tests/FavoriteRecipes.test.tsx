import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';
import { detailsMockDrinks, detailsMockMeals } from './mocks/DetailsMock';

const share = '0-horizontal-share-btn';

describe(('Done recipes'), async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test(('Test favorite drink'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    await userEvent.click(favoriteButton);
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });
    const shareBtn = await screen.findByTestId(share);
    expect(shareBtn).toBeInTheDocument();

    const writeText = vi.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    window.alert = vi.fn();

    await userEvent.click(shareBtn);
    expect(writeText).toHaveBeenCalled();

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

    await userEvent.click(drinkBtn);

    expect(name).toBeInTheDocument();

    await userEvent.click(mealBtn);

    expect(name).not.toBeInTheDocument();

    await userEvent.click(allBtn);
    const unfavoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    await userEvent.click(unfavoriteBtn);
    expect(unfavoriteBtn).not.toBeInTheDocument();
  });
  test(('Test favorite meal'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockMeals),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    await userEvent.click(favoriteButton);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });

    const shareBtn = await screen.findByTestId(share);
    expect(shareBtn).toBeInTheDocument();

    const writeText = vi.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    window.alert = vi.fn();

    await userEvent.click(shareBtn);
    expect(writeText).toHaveBeenCalled();

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

    await userEvent.click(drinkBtn);

    expect(name).not.toBeInTheDocument();

    await userEvent.click(allBtn);
    const unfavoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    await userEvent.click(unfavoriteBtn);
    expect(unfavoriteBtn).not.toBeInTheDocument();
  });
});
