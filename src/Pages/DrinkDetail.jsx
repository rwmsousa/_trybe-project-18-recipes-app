import React, { useEffect, useContext, useState } from 'react';
import { fetchDrinkById } from '../services';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/FoodDetail.css';
// import Header from '../components/Header';

import Context from '../Context/Context';

function DrinkDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    idDrinkDetails,
    foodsClone,
    setFoodsClone,
  } = useContext(Context);

  const [drinksDetails, setDrinksDetails] = useState([]);

  // useEffect para completar o state foodsClone para usar no drinkDetails em recomendações
  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 12;
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
  });

  useEffect(() => {
    async function drinkById() {
      const getDrinkById = await fetchDrinkById(idDrinkDetails);
      setDrinksDetails(getDrinkById);
    }
    drinkById();
  }, [idDrinkDetails]);

  if (drinksDetails.length > 0) {
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
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favorites icon" />
        </button>
        <h3>Ingredientes</h3>
        <IngredientsList list={ drinksDetails } />
        <h3>Instruções</h3>
        <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
        <h3>Recomendadas</h3>
        {foodsClone.map((food, idx) => (
          <section key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt={ `prato: ${food.strMeal}` }
              width="100px"
              data-testid={ `${idx}-recomendation-card` }
            />
            <h6 data-testid={ `${idx}-recomendation-title` }>{ food.strMeal }</h6>
          </section>
        ))}
        <button type="button" data-testid="start-recipe-btn">
          iniciar receita
        </button>
      </div>
    );
  }
  return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
}

export default DrinkDetail;
