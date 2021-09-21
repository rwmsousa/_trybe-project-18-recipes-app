import React from 'react';

function Login() {
  return (
    <section>
      <h1> Login </h1>
      <label htmlFor="input-email">
        Email:
        <input
          type="email"
          id="input-email"
          placeholder="Insira seu e-mail"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="input-password">
        Senha:
        <input
          type="password"
          id="input-password"
          placeholder="Insira sua senha"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
