import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Context from '../Context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function ButtonsDetals({ value }) {
  const {
    msgClipboard,
    shareLink,
    foodDetails } = value;

  const { heartFavorite, setHeartFavorite } = useContext(Context);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    if (localStorage.favoriteRecipes && JSON
      .parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, [id, setHeartFavorite]);

  const handleFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      setHeartFavorite(true);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: foodDetails[0].idMeal,
          type: 'comida',
          area: foodDetails[0].strArea,
          category: foodDetails[0].strCategory,
          alcoholicOrNot: '',
          name: foodDetails[0].strMeal,
          image: foodDetails[0].strMealThumb,
        },
      ]));
    }

    if (JSON.parse(localStorage.favoriteRecipes).find(
      (recipeId) => recipeId.id === id,
    )
    ) {
      setHeartFavorite(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(
        JSON.parse(localStorage.favoriteRecipes).filter(
          (recipeId) => recipeId.id !== id,
        ),
      ));
    }

    if (
      !JSON.parse(localStorage.favoriteRecipes).find(
        (recipeId) => recipeId.id === id,
      )
    ) {
      setHeartFavorite(true);
      const storageFavorites = JSON.parse(localStorage.favoriteRecipes);
      storageFavorites.push({
        id: foodDetails[0].idMeal,
        type: 'comida',
        area: foodDetails[0].strArea,
        category: foodDetails[0].strCategory,
        alcoholicOrNot: '',
        name: foodDetails[0].strMeal,
        image: foodDetails[0].strMealThumb,
      });
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(storageFavorites),
      );
    }
  };

  return (
    <div>
      { msgClipboard ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Link copiado!</strong>
        </div>
      ) : null }

      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ shareLink }
      >
        <img src={ shareIcon } alt="share link" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        className="favorite-btn"
        onClick={ handleFavorite }
        src="blackHeartIcon whiteHeartIcon"
      >
        { heartFavorite ? (
          <img
            src={ blackHeartIcon }
            alt="coracao favoritado"
          />
        ) : (
          <img
            src={ whiteHeartIcon }
            alt="coracao nao favoritado"
          />
        ) }
      </button>
    </div>
  );
}

ButtonsDetals.propTypes = {
  handleFavorite: PropTypes.func,
  heartFavorite: PropTypes.bool,
  msgClipboard: PropTypes.func,
  setHeartFavorite: PropTypes.func,
  setMsgClipboard: PropTypes.func,
  shareLink: PropTypes.func,
}.isRequired;

export default ButtonsDetals;
