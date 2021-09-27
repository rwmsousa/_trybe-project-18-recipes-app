import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function Profile() {
  const { setCurrentPage, setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Perfil');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));

  const clickExit = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header />
      { userEmail ? <p data-testid="profile-email">{ userEmail.email }</p> : <p>User</p>}
      <button type="button" data-testid="profile-done-btn">
        <a href="receitas-feitas">Receitas Feitas</a>
      </button>
      <button type="button" data-testid="profile-favorite-btn">
        <a href="/receitas-favoritas">Receitas Favoritas</a>
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => clickExit() }
      >
        Sair
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
