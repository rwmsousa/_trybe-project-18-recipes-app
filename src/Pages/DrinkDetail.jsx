import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { fetchDrinkById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/Detail.css';
import Context from '../Context/Context';
import ButtonsDetailsDrinks from '../components/ButtonsDetailsDrinks';

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
  const [showButtonInitRecipe, setShowButtonInitRecipe] = useState(true);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (
      localStorage.doneRecipes && JSON.parse(localStorage.doneRecipes)
        .find((recipeId) => recipeId.id === id)
    ) {
      setShowButtonInitRecipe(false);
    } else {
      setShowButtonInitRecipe(true);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

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
        width="400px"
      />
      <h1 data-testid="recipe-title">{drinksDetails[0].strDrink}</h1>
      <span data-testid="recipe-category">{drinksDetails[0].strAlcoholic}</span>

      <ButtonsDetailsDrinks value={ stateButtons } />

      <h3>Ingredientes</h3>
      <IngredientsList list={ drinksDetails } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
      <h3>Recomendadas</h3>
      <section className="recomended-section">
        {foodsClone.map((food, idx) => (
          <div className="recomended-div" key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt={ `prato: ${food.strMeal}` }
              width="100px"
              data-testid={ `${idx}-recomendation-card` }
            />
            <h6 data-testid={ `${idx}-recomendation-title` }>{food.strMeal}</h6>
          </div>
        ))}
      </section>
      {showButtonInitRecipe ? (
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
  );
}

export default DrinkDetail;
