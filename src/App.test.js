import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from './App';
import { screen } from '@testing-library/dom';

describe('Testa pagina Login.js', () => {
  test('verifica que existe um título h1', () => {
    renderWithRouter(<App />);

    const titleH1 = screen.getByRole('heading', {
      name: /login/i,
      level: 1,
    });

    expect(titleH1).toBeInTheDocument();
  })

  test('Verifica que existem 2 imputs, email e senha', () => {
    renderWithRouter(<App />);

    const getEmailInput = screen.getByTestId('email-input');
    const getPasswordInput = screen.getByTestId('password-input');

    expect(getEmailInput).toBeInTheDocument();
    expect(getPasswordInput).toBeInTheDocument();
  })

  test('Verifica que existe um botão com texto "Entrar" e começa desativado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisable();
  });
})
