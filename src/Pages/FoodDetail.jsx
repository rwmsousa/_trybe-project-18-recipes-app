import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/Detail.css';
import Context from '../Context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdFoodDetails,
    drinksClone,
    setDrinksClone,
    foods,
  } = useContext(Context);
  console.log(foods);

  const [foodDetails, setFoodDetails] = useState([]);
  const [video, setVideo] = useState('');
  const [heartFavorite, setHeartFavorite] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (localStorage.favoriteRecipes && JSON
      .parse(localStorage.favoriteRecipes).find((recipeId) => recipeId === id)) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  const handleFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      setHeartFavorite(true);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([id]));
    }

    if (JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId === id)) {
      setHeartFavorite(false);
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          JSON.parse(localStorage.favoriteRecipes)
            .filter((recipeId) => recipeId !== id),
        ));
    }

    if (
      !JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId === id)) {
      setHeartFavorite(true);
      const storageFavorites = JSON.parse(localStorage.favoriteRecipes);
      storageFavorites.push(id);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(storageFavorites));
    }
  };

  // useEffect para completar o state drinksClone para usar no foodDetails em recomendações
  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 6;
      const SplitArray = response.drinks.filter(
        (item, idx) => idx < magicNumber,
      );

      setDrinksClone(SplitArray);
    }
    fetchDrinks();
  }, [setDrinksClone]);

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
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [
    id,
    setCurrentPage,
    setSearchButton,
    setShowProfile,
    setShowTitlePage,
  ]);

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    history.push(`/comidas/${value}/in-progress`);
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
      <span data-testid="recipe-category">{foodDetails[0].strCategory}</span>
      <button type="button" data-testid="share-btn" className="share-btn">
        <i className="fas fa-share-alt" />
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
      {foods.map((food, idx) => (
        <li key={ food.idMeal }>
          <img
            src={ food.strMealThumb }
            alt={ `Comida: ${food.strMeal}` }
            width="150px"
            data-testid={ `${idx}-card-img` }
          />
          <p data-testid={ `${idx}-card-name` }>{food.strMeal}</p>
          <button
            className="start-recipe-button"
            value={ food.idMeal }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleLink }
          >
            iniciar receita
          </button>
        </li>
      ))}
    </div>
  );
}

export default FoodDetail;
