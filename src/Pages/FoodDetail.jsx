import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../services';
import IngredientsList from '../components/IngredientsList';
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
  const [heartFavorite, setHeartFavorite] = useState(false);
  // const [
  //   storageFavorites,
  //   setStorageFavorites] = useState([localStorage.getItem('favoriteRecipes')][0]
  //     === '' || null ? [] : [...[localStorage.getItem('favoriteRecipes')]]);
  const [storageFavorites, setStorageFavorites] = useState([...[localStorage.favoriteRecipes]]);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

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
    storageFavorites,
  ]);

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    setStorageFavorites([...[localStorage.favoriteRecipes]]);

    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = [null];
      setHeartFavorite(false);
    }

    if (storageFavorites.find((recipe) => recipe === id) === id) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, []); // ATENÇÃO!!!!!!!! Nao coloque dependências nesse useEffect com localStorage, pois causará loop.

  const handleFavorite = () => {
    if (localStorage.favoriteRecipes
      && (storageFavorites.find((recipe) => recipe === id) === id)) {
      console.log('entrou no if 1');
      setHeartFavorite(false);
      const newFavorites = storageFavorites.filter((meal) => meal !== id);
      localStorage.favoriteRecipes = [newFavorites];
      setStorageFavorites(newFavorites);
    } else {
      console.log('entrou no else');
      setHeartFavorite(true);
      setStorageFavorites([...[id]]);
      localStorage.favoriteRecipes = [...[id]];
    }

    if (localStorage.favoriteRecipes
      && !storageFavorites.find((recipe) => recipe === id)) {
      console.log('entrou no if 2');
      setHeartFavorite(true);
      setStorageFavorites([...[id]]);
      localStorage.favoriteRecipes = [...[id]];
    }

    // if (!localStorage.favoriteRecipes) {
    //   console.log('entrou no else');
    //   setHeartFavorite(true);
    //   setStorageFavorites([...[id]]);
    //   localStorage.favoriteRecipes = [...[id]];
    // }
  };

  // if (Array.isArray(storageFavorites)
  //   && (storageFavorites.find((recipe) => recipe === id))) {
  //   console.log('entrou no if 2');
  //   const newFavorites = storageFavorites.filter((meal) => meal !== id);
  //   setStorageFavorites(...[newFavorites]);
  //   localStorage.removeItem('favoriteRecipes', id);
  //   setHeartFavorite(false);
  // }
  // };

  // const handleFavorite = () => {
  //   if (Array.isArray(storageFavorites)
  //       && !storageFavorites.find((recipe) => recipe === id)) {
  //     console.log('entrou no if 1');
  //     const newStorage = storageFavorites ? [...storageFavorites] : null;
  //     newStorage.push(...[id]);
  //     setStorageFavorites(newStorage);
  //     localStorage.setItem('favoriteRecipes', newStorage);
  //     setHeartFavorite(true);
  //   }

  //   if (Array.isArray(storageFavorites)
  //     && (storageFavorites.find((recipe) => recipe === id))) {
  //     console.log('entrou no if 2');
  //     const newFavorites = storageFavorites.filter((meal) => meal !== id);
  //     setStorageFavorites(...[newFavorites]);
  //     localStorage.removeItem('favoriteRecipes', id);
  //     setHeartFavorite(false);
  //   }
  // };

  // console.log('stringify', storageFavorites.find((meal) => meal === JSON.stringify(id)));
  console.log('id', id);
  console.log('storageFavorites-type', typeof storageFavorites);
  console.log('storageFavorites', storageFavorites);
  console.log('localstorage', localStorage.getItem('favoriteRecipes'));
  console.log('heartFavorite', heartFavorite);

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
      >
        {heartFavorite ? (
          <i className="fas fa-heart fa-heart-favorite" />
        ) : (
          <i className="fas fa-heart fa-heart-unfavorite" />
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
