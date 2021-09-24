import React from 'react';
// import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa pagina Food.js', () => {
  test('verifica que existem dois icones no header', () => {
    renderWithRouter(<App />);
    // const { history } = renderWithRouter(<App />);

    // history.push('/comidas');

    // const img = screen.getByTestId('profile-top-btn');
    // console.log(img);
    // expect(img).toBeInThDocument();
  });
});
