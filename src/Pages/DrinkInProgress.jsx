import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDrinkById, handleCheckBoxChange, currentData } from '../services';
import '../css/inProgress.css';
import Context from '../Context/Context';
import HandleShare from '../components/HandleShareDrinks';
import HandleFavorite from '../components/HandleFavoriteDrinks';

function DrinkInProgress() {
  const {
    setCurrentPage,
    setShowProfile, setShowTitlePage, setSearchButton } = useContext(Context);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [msgClipboard, setMsgClipboard] = useState(false);
  const [showButtonFinished, setShowButtonFinished] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (
      localStorage.doneRecipes
      && JSON.parse(localStorage.doneRecipes).find(
        (recipeId) => recipeId.id === id,
      )
    ) {
      setShowButtonFinished(false);
    } else {
      setShowButtonFinished(true);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  useEffect(() => {
    async function foodById() {
      const getDrinkById = await fetchDrinkById(id);
      setDrinksDetails(getDrinkById);
    }
    foodById();
  }, [id]);

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

  if (!drinksDetails || !drinksDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

  const shareLink = () => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  const finishRecipe = () => {
    const url = '/recipes-made';
    const drink = {
      id: drinksDetails[0].idDrink,
      type: 'bebida',
      area: drinksDetails[0].strArea,
      category: drinksDetails[0].strCategory,
      alcoholicOrNot: '',
      name: drinksDetails[0].strDrink,
      image: drinksDetails[0].strDrinkThumb,
      doneDate: currentData(),
      tags: drinksDetails[0].strTags,
    };

    if (localStorage.doneRecipes) {
      const getDones = JSON.parse([localStorage.doneRecipes]);
      getDones.push(drink);
      localStorage.doneRecipes = JSON.stringify(getDones);
      setShowButtonFinished(false);
      history.push(url);
    } else {
      localStorage.doneRecipes = JSON.stringify([drink]);
      setShowButtonFinished(false);
      history.push(url);
    }
    history.push(url);
  };

  const stateButtons = {
    msgClipboard,
    shareLink,
  };

  return (
    <div>
      <img
        src={ drinksDetails[0].strDrinkThumb }
        alt={ `${drinksDetails[0].strDrink} recipe` }
        data-testid="recipe-photo"
        className="thumbnail"
      />
      <div className="header-in-progress">
        <h1 data-testid="recipe-title">{drinksDetails[0].strDrink}</h1>
        <div className="buttons">
          <span data-testid="recipe-category" className="category">
            {drinksDetails[0].strAlcoholic}
          </span>
          <HandleShare value={ stateButtons } />
          <HandleFavorite drinksDetails={ drinksDetails } />
        </div>
      </div>

      <div className="ingredients">
        <h3>Ingredients</h3>
        <div className="ingredient">
          {Object.keys(drinksDetails[0])
            .filter((k) => k.includes('Ingredient'))
            .map(
              (value, idx) => drinksDetails[0][value] !== null
                && drinksDetails[0][value] !== ''
                && (
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
                ),
            )}
        </div>
      </div>

      <div className="instrution">
        <h3>Instructions</h3>
        <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
      </div>

      {showButtonFinished && (
        <button
          className="start-recipe-button"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finalizar receita
        </button>
      )}
    </div>
  );
}

export default DrinkInProgress;
