import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchFoodById, handleCheckBoxChange, currentData } from '../services';
import '../css/Detail.css';
import Context from '../Context/Context';
import ButtonsDetailsFoods from '../components/ButtonsDetailsFoods';

function FoodInProgress() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
  } = useContext(Context);

  const [foodDetails, setFoodDetails] = useState([]);
  const [msgClipboard, setMsgClipboard] = useState(false);
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
      const getFoodById = await fetchFoodById(id);
      setFoodDetails(getFoodById);
    }
    foodById();
  }, [id]);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [id, setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  if (!foodDetails || !foodDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

  const shareLink = (url) => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${url}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  const finishRecipe = () => {
    const food = {
      id: foodDetails[0].idMeal,
      type: 'comida',
      area: foodDetails[0].strArea,
      category: foodDetails[0].strCategory,
      alcoholicOrNot: '',
      name: foodDetails[0].strMeal,
      image: foodDetails[0].strMealThumb,
      doneDate: currentData(),
      tags: foodDetails[0].strTags,
    };

    if (localStorage.doneRecipes) {
      const getDones = JSON.parse([localStorage.doneRecipes]);
      getDones.push(food);
      localStorage.doneRecipes = JSON.stringify(getDones);
      setShowButtonFinished(false);
    } else {
      localStorage.doneRecipes = JSON.stringify([food]);
      setShowButtonFinished(false);
    }
    history.push('/receitas-feitas');
  };

  const stateButtons = {
    msgClipboard,
    shareLink,
  };

  return (
    <div>
      <img
        src={ foodDetails[0].strMealThumb }
        alt={ `${foodDetails[0].strMeal} recipe` }
        data-testid="recipe-photo"
        width="400px"
      />
      <h1 data-testid="recipe-title">{foodDetails[0].strMeal}</h1>
      <span data-testid="recipe-category">{foodDetails[0].strCategory}</span>

      <ButtonsDetailsFoods value={ stateButtons } />

      <h3>Ingredientes</h3>
      <div>
        {Object.keys(foodDetails[0])
          .filter((k) => k.includes('Ingredient'))
          .map(
            (value, idx) => foodDetails[0][value] !== '' && (
              <label
                htmlFor={ idx }
                key={ idx }
                data-testid={ `${idx}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ idx }
                  value={ foodDetails[0][value] }
                  onChange={ ({ target }) => handleCheckBoxChange(target) }
                />
                {foodDetails[0][value]}
              </label>
            ),
          )}
      </div>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ foodDetails[0].strInstructions }</p>

      { showButtonFinished ? (
        <button
          className="start-recipe-button"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finalizar receita
        </button>)
        : null}

    </div>
  );
}

export default FoodInProgress;
