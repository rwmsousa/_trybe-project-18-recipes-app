import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa pagina Login.js', () => {
  test('verifica que existe um header LOGIN', () => {
    renderWithRouter(<App />);

    const header = screen.getByText(/login/i);

    expect(header).toBeInTheDocument();
  });

  test('Verifica que existem 2 imputs, email e senha', () => {
    renderWithRouter(<App />);

    const getEmailInput = screen.getByTestId('email-input');
    const getPasswordInput = screen.getByTestId('password-input');

    expect(getEmailInput).toBeInTheDocument();
    expect(getPasswordInput).toBeInTheDocument();
  });

  test('Verifica que existe um botão com texto "Entrar" e começa desativado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  test('Verifica que botao habilita se digitar email e senhas validas', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/insira seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/insira sua senha/i);
    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, 'test@email.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toHaveAttribute('disabled');
  });

  test('', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/insira seu e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/insira sua senha/i);
    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    userEvent.type(inputEmail, 'test@email.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
