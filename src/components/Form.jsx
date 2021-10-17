import React, { useContext } from 'react';
import Context from '../Context/Context';
import '../css/login.css';

function Form() {
  const {
    button,
    handleChange,
    handleClick,
    handleShowPassword,
    icon,
    showPassword,
  } = useContext(Context);

  return (
    <div className="login-box col-md-12 ">
      <h1 className="h1Login">App Recipes</h1>
      <form id="login-form" className="form" action="" method="post">
        <input
          name="username"
          className="form-control"
          type="email"
          id="input-email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ handleChange }
        />

        <div className="divPassword">
          <input
            name="password"
            className="form-control"
            type={ showPassword }
            id="input-password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleChange }
          />

          <button
            type="button"
            onClick={ handleShowPassword }
            className="input-group-text"
          >
            <i className={ icon } />
          </button>
        </div>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ button }
          onClick={ handleClick }
          className="btn"
          id="submit-button"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Form;
