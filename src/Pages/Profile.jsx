import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import '../css/profile.css';

function Profile() {
  const { setCurrentPage, setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Profile');
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
      <div className="content-profile">
        {userEmail ? (
          <p data-testid="profile-email" className="email">
            {userEmail.email}
          </p>
        ) : (
          <p>User</p>
        )}
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-done-btn"
        >
          <a href="/recipes-made">Recipes Made</a>
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-favorite-btn"
        >
          <a href="/recipes-favorite">Recipes Favorites</a>
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => clickExit() }
          className="exit"
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
