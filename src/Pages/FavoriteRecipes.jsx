import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  const [favoriteStorage, setFavoriteStorage] = useState([]);

  useEffect(() => {
    setCurrentPage('Receitas Favoritas');
    setSearchButton(false);

    const AllFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteStorage(AllFavorite);
  }, [setCurrentPage, setSearchButton]);

  const handleClickAll = () => {
    const AllFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteStorage(AllFavorite);
  };

  const handleClickFood = () => {
    const favoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterFood = favoriteFood.filter((food) => food.type === 'comida');
    setFavoriteStorage(filterFood);
  };

  const handleClickDrink = () => {
    const favoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterDrink = favoriteDrink.filter((food) => food.type === 'bebida');
    setFavoriteStorage(filterDrink);
  };

  console.log(favoriteStorage);

  return (
    <div>
      <Header />
      <div className="buttonsRecipesFavorites">
        <button
          value="all"
          type="button"
          onClick={ handleClickAll }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          value="food"
          type="button"
          onClick={ handleClickFood }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          value="drink"
          type="button"
          onClick={ handleClickDrink }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favoriteStorage.map((recipe, index) => (
        <div key={ recipe.id } className="cardRecipes">
          <img
            src={ recipe.image }
            alt={ recipe.name }
            className="immageCard"
            data-testid={ `${index}-horizontal-image` }
            width="300px"
          />
          <div className="infoCard">
            <p
              className="categoryCard"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} - ${recipe.category}` }
            </p>
            <p
              className="titleCard"
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              className="share-btn"
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share link" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="favorite-btn"
              src="blackHeartIcon"
            >
              <img src={ blackHeartIcon } alt="coracao favoritado" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
