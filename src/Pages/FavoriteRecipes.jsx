import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchFoodById } from '../services';

function FavoriteRecipes() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  const [favoriteStorage, setFavoriteStorage] = useState([]);
  const [arrayFavorites, setArrayFavorites] = useState([]);

  useEffect(() => {
    setCurrentPage('Receitas Favoritas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  const handleClick = () => (
    setFavoriteStorage(JSON.parse(localStorage.getItem('favoriteRecipes')))
  );

  favoriteStorage.map(async (favoriteID) => {
    const resultado = await fetchFoodById(favoriteID);
    setArrayFavorites(resultado);
  });

  // console.log(arrayFavorites);

  return (
    <div>
      <Header />
      <div className="buttonsRecipesFavorites">
        <button
          value="all"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          value="food"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          value="drink"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {/* {favoritos
      && (
        <div className="cardRecipes">
          <div className="divImageCard">
            <img
              src={ favoritos[0].strMealThumb }
              alt={ favoritos[0].strMeal }
              className="immageCard"
              // data-testid={ `"${index}-horizontal-image"` }
              data-testid="0-horizontal-image"
            />
          </div>
          <div className="infoCard">
            <p
              className="categoryCard"
              // data-testid={ `"${index}-horizontal-top-text"` }
              data-testid="0-horizontal-top-text"
            >
              { favoritos[0].strCategory }
            </p>
            <p
              className="titleCard"
              data-testid="0-horizontal-name"
              // data-testid={ `"${index}-horizontal-name"` }
            >
              { favoritos[0].strMeal }
            </p>
            <p
              className="dateCard"
              data-testid="0-horizontal-done-date"
              // data-testid={ `"${index}-horizontal-done-date"` }
            >
              não entendi
            </p>
            <img
              src=""
              alt=""
              className="shareCard"
              data-testid="0-horizontal-share-btn"
              // data-testid={ `"${index}-horizontal-share-btn"` }
            />
            <p
              className="tagCard"
              data-testid={ `0-${favoritos[0].strTags}-horizontal-tag` }
              // data-testid={ `${index}-${favoritos[0].strTags}-horizontal-tag` }
            >
              { favoritos[0].strTags }
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default FavoriteRecipes;
