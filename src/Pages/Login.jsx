import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../components/Form';
import Context from '../Context/Context';
import '../css/login.css';
import { fetchFoods } from '../services';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState('true');
  const [showPassword, setShowPassword] = useState('password');
  const [icon, setIcon] = useState('far fa-eye');
  const history = useHistory();
  const { setFoods } = useContext(Context);

  const validateLogin = (inputEmail, inputPassword) => {
    const getButton = document.getElementById('submit-button');
    const validEmail = /\S+@\S+\.\S+/;
    const magicNumber = 6;

    if (validEmail.test(inputEmail) && inputPassword.length > magicNumber) {
      setButton(false);
      getButton.classList.add('test');
    } else {
      setButton(true);
      getButton.classList.remove('test');
    }
  };

  const handleChange = ({ target: { value, id } }) => {
    switch (id) {
    case 'input-email':
      setEmail(value);
      validateLogin(value, password);
      break;
    case 'input-password':
      setPassword(value);
      validateLogin(email, value);
      break;
    default:
      break;
    }
  };

  const handleClick = () => {
    async function fetch() {
      const res = await fetchFoods();
      setFoods(res);
    }
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON
      .stringify({ email }));
    fetch();
    history.push('/comidas');
    localStorage.setItem('doneRecipes', []);
    localStorage.setItem('favoriteRecipes', []);
    localStorage.setItem('inProgressRecipes', {});
  };

  const handleShowPassword = () => {
    if (showPassword === 'password') {
      setIcon('far fa-eye-slash');
      setShowPassword('text');
    } else {
      setIcon('far fa-eye');
      setShowPassword('password');
    }
  };

  const myProps = {
    showPassword,
    icon,
    button,
    setEmail,
    handleChange,
    handleShowPassword,
    handleClick,
  };

  return (
    <section className="bg-img">
      <div className="content">
        <header>Login</header>
        <Context.Provider value={ myProps }>
          <Form />
        </Context.Provider>
      </div>
    </section>
  );
}

export default Login;
