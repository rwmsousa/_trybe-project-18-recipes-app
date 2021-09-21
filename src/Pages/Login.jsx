import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState('true');
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    const validEmail = /\S+@\S+\.\S+/;
    const magicNumber = 6;
    setPassword(value);

    if (validEmail.test(email) && password.length >= magicNumber) {
      setButton(!button);
    }
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

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
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="input-password">
        Senha:
        <input
          type="password"
          id="input-password"
          placeholder="Insira sua senha"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ button }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
