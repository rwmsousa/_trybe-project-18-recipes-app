import React, { useEffect, useContext, useState } from 'react';
import { fetchFoodById } from '../services';
import Header from '../components/Header';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import Context from '../Context/Context';

function FoodDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    idFoodDetails } = useContext(Context);

  const [foodDetails, setFoodDetails] = useState([]);
  const [video, setVideo] = useState('');

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  });

  useEffect(() => {
    async function foodById() {
      const getFoodById = await fetchFoodById(idFoodDetails);
      setFoodDetails(getFoodById);
      const magicNumber = 24;
      setVideo((getFoodById[0].strYoutube).substr(magicNumber));
    }
    foodById();
  }, []);

  console.log(video);
  console.log(foodDetails);

  // const YoutubeEmbed = ({ embedId }) => {
  //   console.log(embedId);
  //   return (
  //   <iframe
  //     width="853"
  //     height="480"
  //     src={embedId}
  //     frameBorder="0"
  //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //     allowFullScreen
  //     title="Embedded youtube"
  //   />
  //   )
  // };

  if (foodDetails.length > 0) {
    return (
      <div>
        <Header />
        <img
          src={ foodDetails[0].strMealThumb }
          alt={ `${foodDetails[0].strMeal} recipe` }
          data-testid="recipe-photo"
          width="400px"
        />
        <h1 data-testid="recipe-title">{ foodDetails[0].strMeal }</h1>
        <span data-testid="recipe-category">{ foodDetails[0].strCategory }</span>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="favorites icon" />
        </button>
        <h3>Ingredientes</h3>
        <IngredientsList
          list={ foodDetails }
        />
        <h3>Instructions</h3>
        <p data-testid="instructions">{ foodDetails[0].strInstructions }</p>
        <h3>Video</h3>
        {/* {YoutubeEmbed(details[0].strYoutube)} */}
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
        {/* nao entendi o que fazer aqui */}
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          iniciar receita
        </button>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

export default FoodDetail;
