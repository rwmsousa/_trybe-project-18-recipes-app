import React, { useEffect, useContext } from 'react';
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
    details,
    youTube } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  });

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

  console.log(youTube);

  return (
    <div>
      <Header />
      <img
        src={ details[0].strMealThumb }
        alt={ `${details[0].strMeal} recipe` }
        data-testid="recipe-photo"
        width="400px"
      />
      <h1 data-testid="recipe-title">{ details[0].strMeal }</h1>
      <span data-testid="recipe-category">{ details[0].strCategory }</span>
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
      <IngredientsList list={ details } />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ details[0].strInstructions }</p>
      <h3>Video</h3>
      {/* {YoutubeEmbed(details[0].strYoutube)} */}
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${youTube}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
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

export default FoodDetail;
