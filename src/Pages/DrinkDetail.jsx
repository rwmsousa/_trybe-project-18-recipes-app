import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { fetchDrinkById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/detail.css';
import Context from '../Context/Context';
import HandleShare from '../components/HandleShareDrinks';
import HandleFavorite from '../components/HandleFavoriteDrinks';

function DrinkDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdDrinkDetails,
    foodsClone,
    setFoodsClone,
    drinksDetails,
    setDrinksDetails,
  } = useContext(Context);

  const [msgClipboard, setMsgClipboard] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const arr = [];
    localStorage.inProgressRecipes = JSON.stringify(arr);
  }, []);

  // useEffect para completar o state foodsClone para usar no drinkDetails em recomendações
  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 6;
      const SplitArray = meals.filter((item, idx) => idx < magicNumber);

      setFoodsClone(SplitArray);
    }
    fetchFoods();
  }, [setFoodsClone]);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  console.log('drinksDetails', drinksDetails);
  useEffect(() => {
    async function drinkById() {
      const getDrinkById = await fetchDrinkById(id);
      setDrinksDetails(getDrinkById);
    }
    drinkById();
  }, [id, setDrinksDetails]);

  const handleLink = ({ target: { value } }) => {
    setIdDrinkDetails(value);
    if (localStorage.inProgressRecipes && !JSON.parse([localStorage.inProgressRecipes])
      .find((recipe) => recipe === id)) {
      const getStarted = JSON.parse([localStorage.inProgressRecipes]);
      getStarted.push(id);
      localStorage.inProgressRecipes = JSON.stringify(getStarted);
    }
    if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify([id]);
    }
    history.push(`/bebidas/${value}/in-progress`);
  };

  const shareLink = () => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  const stateButtons = {
    msgClipboard,
    shareLink,
  };

  if (!drinksDetails || !drinksDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

  return (
    <div>
      <img
        src={ drinksDetails[0].strDrinkThumb }
        alt={ `${drinksDetails[0].strDrink} recipe` }
        data-testid="recipe-photo"
        className="thumbnail"
      />
      <div className="header-detail">
        <h1 data-testid="recipe-title">{drinksDetails[0].strDrink}</h1>
        <div className="buttons">
          <span
            data-testid="recipe-category"
            className="category"
          >
            { drinksDetails[0].strAlcoholic }
          </span>
          <HandleShare value={ stateButtons } />
          <HandleFavorite drinksDetails={ drinksDetails } />
        </div>
      </div>

      <div className="ingredients">
        <h3>Ingredientes</h3>
        <IngredientsList list={ drinksDetails } />
        <h3>Instruções</h3>
        <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
      </div>

      <div className="recommended">
        <h3>Recomendadas</h3>
        <section className="recomended-section">
          {foodsClone.map((food, idx) => (
            <div className="recomended-div" key={ food.idMeal }>
              <img
                src={ food.strMealThumb }
                alt={ `prato: ${food.strMeal}` }
                data-testid={ `${idx}-recomendation-card` }
              />
              <h6 data-testid={ `${idx}-recomendation-title` }>{food.strMeal}</h6>
            </div>
          ))}
        </section>
        { !localStorage.inProgressRecipes && !JSON.parse(localStorage.inProgressRecipes)
          .find((recipeId) => recipeId === id) ? (
            <button
              button
              className="start-recipe-button"
              type="button"
              data-testid="start-recipe-btn"
              value={ drinksDetails[0].idDrink }
              onClick={ handleLink }
            >
              Iniciar Receita
            </button>
          ) : (
            <button
              button
              className="start-recipe-button"
              type="button"
              data-testid="start-recipe-btn"
              value={ drinksDetails[0].idDrink }
              onClick={ handleLink }
            >
              Continuar Receita
            </button>
          )}
      </div>
    </div>
  );
}

export default DrinkDetail;
