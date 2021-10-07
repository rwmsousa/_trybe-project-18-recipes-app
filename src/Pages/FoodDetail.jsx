import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { fetchFoodById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/Detail.css';
import Context from '../Context/Context';
import ButtonsDetailsFoods from '../components/ButtonsDetailsFoods';

function FoodDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdFoodDetails,
    drinksClone,
    setDrinksClone,
  } = useContext(Context);

  const [foodDetails, setFoodDetails] = useState([]);
  const [video, setVideo] = useState('');
  const [msgClipboard, setMsgClipboard] = useState(false);
  const [showButtonInitRecipe, setShowButtonInitRecipe] = useState();

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (
      localStorage.startedRecipe && JSON.parse(localStorage.startedRecipe)
        .find((recipeId) => recipeId === id)
    ) {
      setShowButtonInitRecipe(false);
    } else {
      setShowButtonInitRecipe(true);
    }
  }, [id, setShowButtonInitRecipe]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  // useEffect para completar o state drinksClone para usar no foodDetails em recomendações
  useEffect(() => {
    async function foodById() {
      const getFoodById = await fetchFoodById(id);
      setFoodDetails(getFoodById);
      const magicNumber = 24;
      setVideo(getFoodById[0].strYoutube.substr(magicNumber));
    }
    foodById();
  }, [id]);

  useEffect(() => {
    async function fetchDrinks() {
      const { drinks } = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());
      const magicNumber = 6;
      const SplitArray = drinks.filter((item, idx) => idx < magicNumber);
      setDrinksClone(SplitArray);
    }
    fetchDrinks();
  }, [setDrinksClone]);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [id, setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    if (localStorage.startedRecipe && !JSON.parse([localStorage.startedRecipe])
      .find((recipe) => recipe === id)) {
      const getStarted = JSON.parse([localStorage.startedRecipe]);
      getStarted.push(id);
      localStorage.startedRecipe = JSON.stringify(getStarted);
    }
    if (!localStorage.startedRecipe) {
      localStorage.startedRecipe = JSON.stringify([id]);
    }
    history.push(`/comidas/${value}/in-progress`);
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
    foodDetails,
  };

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
      <span data-testid="recipe-category">{ foodDetails[0].strCategory }</span>

      <ButtonsDetailsFoods value={ stateButtons } />

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
            <h6 data-testid={ `${idx}-recomendation-title` }>{drink.strDrink}</h6>
            <p>{drink.strAlcoholic}</p>
          </div>
        ))}
      </section>
      { showButtonInitRecipe ? (
        <button
          button
          className="start-recipe-button"
          type="button"
          data-testid="start-recipe-btn"
          value={ foodDetails[0].idMeal }
          onClick={ handleLink }
        >
          Continuar Receita
        </button>)
        : (
          <button
            button
            className="start-recipe-button"
            type="button"
            data-testid="start-recipe-btn"
            value={ foodDetails[0].idMeal }
            onClick={ handleLink }
          >
            Iniciar Receita
          </button>
        ) }
    </div>
  );
}

export default FoodDetail;
