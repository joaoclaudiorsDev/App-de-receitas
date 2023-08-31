import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { doneRecipes } from './mocks/DoneRecipes';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';
import { detailsMockDrinks } from './mocks/DetailsMock';

const share = '0-horizontal-share-btn';

describe(('Done recipes'), () => {
  test(('Test data test ids'), async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (detailsMockDrinks),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319/in-progress'] });

    const ingredient1 = await screen.findByRole('checkbox', { name: 'Hpnotiq - 2 oz' });
    const ingredient2 = await screen.findByRole('checkbox', { name: 'Pineapple Juice - 1 oz' });
    const ingredient3 = await screen.findByRole('checkbox', { name: 'Banana Liqueur - 1 oz' });

    await userEvent.click(ingredient1);
    await userEvent.click(ingredient2);
    await userEvent.click(ingredient3);

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });

    await userEvent.click(finishButton);

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

    const date = await screen.findByTestId('0-horizontal-done-date');
    expect(date).toBeInTheDocument();

    await userEvent.click(drinkBtn);

    const drink = await screen.findByRole('heading', { name: /Aquamarine/i });
    expect(drink).toBeInTheDocument();

    await userEvent.click(mealBtn);

    expect(drink).not.toBeInTheDocument();

    await userEvent.click(allBtn);
  });
});
