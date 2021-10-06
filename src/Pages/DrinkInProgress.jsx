import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDrinkById, handleCheckBoxChange, currentData } from '../services';
import '../css/Detail.css';
import Context from '../Context/Context';
import ButtonsDetailsDrinks from '../components/ButtonsDetailsDrinks';

function DrinkInProgress() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setMsgClipboard,
    msgClipboard,
  } = useContext(Context);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [showButtonFinished, setShowButtonFinished] = useState();

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (
      localStorage.doneRecipes
      && JSON.parse(localStorage.doneRecipes).find((recipeId) => recipeId.id === id)
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

  const shareLink = (url) => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${url}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  const finishRecipe = () => {
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
    } else {
      localStorage.doneRecipes = JSON.stringify([drink]);
      setShowButtonFinished(false);
    }
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
        width="400px"
      />
      <h1 data-testid="recipe-title">{drinksDetails[0].strDrink}</h1>
      <span data-testid="recipe-category">
        {drinksDetails[0].strAlcoholic}
      </span>

      <ButtonsDetailsDrinks value={ stateButtons } />

      <h3>Ingredientes</h3>
      <div>
        {Object.keys(drinksDetails[0])
          .filter((k) => k.includes('Ingredient'))
          .map((value, idx) => (
            drinksDetails[0][value] !== null && drinksDetails[0][value] !== '' && (
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
      <p data-testid="instructions">{ drinksDetails[0].strInstructions }</p>

      { showButtonFinished ? (
        <button
          className="start-recipe-button"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finalizar receita
        </button>
      ) : null}
    </div>
  );
}

export default DrinkInProgress;
