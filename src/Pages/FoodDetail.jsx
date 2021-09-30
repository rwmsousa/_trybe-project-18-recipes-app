import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../services';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/Detail.css';

import Context from '../Context/Context';

function FoodDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    drinksClone,
    setDrinksClone,
  } = useContext(Context);

  const [foodDetails, setFoodDetails] = useState([]);
  const [video, setVideo] = useState('');

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect para completar o state drinksClone para usar no foodDetails em recomendações
  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 6;
      const SplitArray = response.drinks.filter((item, idx) => idx < magicNumber);

      setDrinksClone(SplitArray);
    }
    fetchDrinks();
  }, []);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  });

  useEffect(() => {
    async function foodById() {
      const getFoodById = await fetchFoodById(id);
      setFoodDetails(getFoodById);
      const magicNumber = 24;
      setVideo(getFoodById[0].strYoutube.substr(magicNumber));
    }
    foodById();
  }, []);

  if (!foodDetails || !foodDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

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
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favorites icon" />
      </button>
      <h3>Ingredientes</h3>
      <IngredientsList list={ foodDetails } />
      <h3>Instructions</h3>
      <p data-testid="instructions">{foodDetails[0].strInstructions}</p>
      <h3>Video</h3>
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${video}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <h3>Recomendadas</h3>
      <section className="recomended-section">
        {drinksClone.map((drink, idx) => (
          <div className="recomended-div" key={ drink.idDrink }>
            <img
              src={ drink.strDrinkThumb }
              alt={ `drink: ${drink.strDrink}` }
              width="200px"
              data-testid={ `${idx}-recomendation-card` }
            />
            <h6 data-testid={ `${idx}-recomendation-title` }>{ drink.strDrink }</h6>
            <p>{ drink.strAlcoholic }</p>
          </div>
        ))}
      </section>
      <button
        className="start-recipe-button"
        type="button"
        data-testid="start-recipe-btn"
      >
        iniciar receita
      </button>
    </div>
  );
}

export default FoodDetail;
