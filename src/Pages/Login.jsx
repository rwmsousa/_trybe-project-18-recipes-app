import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../components/Form';
import Context from '../Context/Context';
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState('true');
  const [showPassword, setShowPassword] = useState('password');
  const [icon, setIcon] = useState('far fa-eye');
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    const getButton = document.getElementById('submit-button');
    const validEmail = /\S+@\S+\.\S+/;
    const magicNumber = 5;
    setPassword(value);

    if (validEmail.test(email) && password.length > magicNumber) {
      setButton(!button);
      getButton.classList.add('test');
    }
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON
      .stringify({ email }));
    history.push('/comidas');
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
