import React, { useEffect, useContext, useState } from 'react';
import { fetchDrinkById } from '../services';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import Header from '../components/Header';

import Context from '../Context/Context';

function DrinkDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    idDrinkDetails,
  } = useContext(Context);

  const [drinksDetails, setDrinksDetails] = useState([]);

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
        <p data-testid="instructions">{drinksDetails[0].strInstructions}</p>
        <h3>Recomendadas</h3>
        {/* nao entendi o que fazer aqui */}
        <button type="button" data-testid="start-recipe-btn">
          iniciar receita
        </button>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

export default DrinkDetail;
