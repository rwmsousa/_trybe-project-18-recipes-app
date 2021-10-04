import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDrinkById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/Detail.css';
// import Header from '../components/Header';
import Context from '../Context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    foodsClone,
    setFoodsClone,
  } = useContext(Context);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [heartFavorite, setHeartFavorite] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (localStorage.favoriteRecipes && JSON
      .parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  const handleFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      setHeartFavorite(true);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: drinksDetails[0].idDrink,
          type: 'bebida',
          area: '',
          category: drinksDetails[0].strCategory,
          alcoholicOrNot: drinksDetails[0].strAlcoholic,
          name: drinksDetails[0].strDrink,
          image: drinksDetails[0].strDrinkThumb,
        },
      ]));
    }

    if (JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(false);
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          JSON.parse(localStorage.favoriteRecipes)
            .filter((recipeId) => recipeId.id !== id),
        ));
    }

    if (
      !JSON.parse(localStorage.favoriteRecipes).find((recipeId) => recipeId.id === id)) {
      setHeartFavorite(true);
      const storageFavorites = JSON.parse(localStorage.favoriteRecipes);
      storageFavorites.push({
        id: drinksDetails[0].idDrink,
        type: 'bebida',
        area: '',
        category: drinksDetails[0].strCategory,
        alcoholicOrNot: drinksDetails[0].strAlcoholic,
        name: drinksDetails[0].strDrink,
        image: drinksDetails[0].strDrinkThumb,
      });
      return localStorage.setItem('favoriteRecipes', JSON.stringify(storageFavorites));
    }
  };

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
            <h6 data-testid={ `${idx}-recomendation-title` }>{ food.strMeal }</h6>

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

export default DrinkDetail;
