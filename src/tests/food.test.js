import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa pagina Food.js', () => {
  test('verifica que existem dois icones no header', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    // const iconOne = screen.getByTestId('profile-top-btn');
    // const iconTwo = screen.getByTestId('search-top-btn');
    const iconOne = screen.getByRole('link', {
      name: /icone de profile/i,
    });
    const iconTwo = screen.getByRole('link', {
      name: /explore icon/i,
    });

    expect(iconOne).toBeDefined();
    expect(iconTwo).toBeDefined();
  });

  test('Verifica que existe um titulo h1 no header', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const header = screen.getByRole('heading', {
      level: 1,
    });

    expect(header).toBeInTheDocument();
  });

  test('Verifica que existem 5 botôes de categorias', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');

    // const allButton = await screen.findByText('All');
    // const beefButton = await screen.findByText('Beef');
    // const breakfastButton = await screen.findByText('Breakfast');
    // const chickenButton = await screen.findByText('Chicken');
    // const dessertButton = await screen.findByText('Dessert');
    // const goatButton = await screen.findByText('Goat');

    // const allButton = screen.findByTestId('All-category-filter');
    // const beefButton = screen.findByTestId('Beef-category-filter');
    // const breakfastButton = screen.findByTestId('Breakfast-category-filter');
    // const chickenButton = screen.findByTestId('Chicken-category-filter');
    // const dessertButton = screen.findByTestId('Dessert-category-filter');
    // const goatButton = screen.findByTestId('Goat-category-filter');

    // const allButton = screen.findByRole('button', { name: 'All' });
    // const beefButton = screen.findByRole('button', { name: 'Beef' });
    // const breakfastButton = screen.findByRole('button', { name: 'Breakfast' });
    // const chickenButton = screen.findByRole('button', { name: 'Chicken' });
    // const dessertButton = screen.findByRole('button', { name: 'Dessert' });
    // const goatButton = screen.findByRole('button', { name: 'Goat' });

    // expect(allButton).toBeInTheDocument();
    // expect(beefButton).toBeInTheDocument();
    // expect(breakfastButton).toBeInTheDocument();
    // expect(chickenButton).toBeInTheDocument();
    // expect(dessertButton).toBeInTheDocument();
    // expect(goatButton).toBeInTheDocument();
  });
});
