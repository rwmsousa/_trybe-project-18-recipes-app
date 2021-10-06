import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { fetchDrinkById } from '../services';
import '../css/Detail.css';
// import Header from '../components/Header';
import Context from '../Context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import handleCheckBoxChange from '../functions';

function DrinkInProgress() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdDrinkDetails,
  } = useContext(Context);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [heartFavorite, setHeartFavorite] = useState(false);
  const [msgClipboard, setMsgClipboard] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (localStorage.favoriteRecipes && JSON
      .parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  const handleFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      setHeartFavorite(true);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: drinksDetails[0].idDrink,
          type: 'bebida',
          area: '',
          category: drinksDetails[0].strCategory,
          alcoholicOrNot: drinksDetails[0].strAlcoholic,
          name: drinksDetails[0].strDrink,
          image: drinksDetails[0].strDrinkThumb,
        },
      ]));
    }

    if (JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(false);
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          JSON.parse(localStorage.favoriteRecipes)
            .filter((recipeId) => recipeId.id !== id),
        ));
    }

    if (
      !JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(true);
      const storageFavorites = JSON.parse(localStorage.favoriteRecipes);
      storageFavorites.push({
        id: drinksDetails[0].idDrink,
        type: 'bebida',
        area: '',
        category: drinksDetails[0].strCategory,
        alcoholicOrNot: drinksDetails[0].strAlcoholic,
        name: drinksDetails[0].strDrink,
        image: drinksDetails[0].strDrinkThumb,
      });
      return localStorage.setItem('favoriteRecipes', JSON.stringify(storageFavorites));
    }
  };

  // useEffect para completar o state foodsClone para usar no drinkDetails em recomendações

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  useEffect(() => {
    async function drinkById() {
      const getDrinkById = await fetchDrinkById(id);

      setDrinksDetails(getDrinkById);
    }
    drinkById();
  }, [id]);

  const handleLink = ({ target: { value } }) => {
    setIdDrinkDetails(value);
    history.push(`/bebidas/${value}/in-progress`);
    console.log(value);
  };

  if (!drinksDetails || !drinksDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }
  console.log(drinksDetails);
  const shareLink = () => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  return (
    <div>
      <img
        src={ drinksDetails[0].strDrinkThumb }
        alt={ `${drinksDetails[0].strDrink} recipe` }
        data-testid="recipe-photo"
        width="400px"
      />
      <h1 data-testid="recipe-title">{drinksDetails[0].strDrink}</h1>
      <span data-testid="recipe-category">
        {drinksDetails[0].strAlcoholic}
      </span>

      {msgClipboard ? (
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
        {heartFavorite ? (
          <img
            src={ blackHeartIcon }
            alt="coracao favoritado"
          />
        ) : (
          <img
            src={ whiteHeartIcon }
            alt="coracao nao favoritado"
          />
        )}
      </button>
      <h3>Ingredientes</h3>
      <div>
        {Object.keys(drinksDetails[0])
          .filter((k) => k.includes('Ingredient'))
          .map((value, idx) => (
            drinksDetails[0][value] !== null && (
              <label
                htmlFor={ idx }
                key={ idx }
                data-testid={ `${idx}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ idx }
                  value={ drinksDetails[0][value] }
                  onChange={ ({ target }) => handleCheckBoxChange(target) }
                />
                {drinksDetails[0][value]}
              </label>
            )
          ))}
      </div>
      <h3>Instruções</h3>
      <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
      <button
        className="start-recipe-button"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleLink }
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default DrinkInProgress;
