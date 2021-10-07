import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  const [msgClipboard, setMsgClipboard] = useState(false);
  const [doneStorage, setDoneStorage] = useState([]);

  useEffect(() => {
    setCurrentPage('Receitas Feitas');
    setSearchButton(false);

    const AllFavorite = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneStorage(AllFavorite);
  }, [setCurrentPage, setSearchButton]);

  const handleClickAll = () => {
    const AllFavorite = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneStorage(AllFavorite);
  };

  const handleClickFood = () => {
    const favoriteFood = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterFood = favoriteFood.filter((food) => food.type === 'comida');
    setDoneStorage(filterFood);
  };

  const handleClickDrink = () => {
    const favoriteDrink = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDrink = favoriteDrink.filter((food) => food.type === 'bebida');
    setDoneStorage(filterDrink);
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    const timerMsg = 5000;
    setMsgClipboard(true);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  return (
    <div>
      <Header />
      {msgClipboard ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Link copiado!</strong>
        </div>
      ) : null }
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
      {doneStorage && doneStorage.map((recipe, index) => (
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
              className="categoryCard"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </p>

            <p
              className="titleCard"
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>
              Feita em
              {recipe.doneDate}
            </p>

            { recipe.tags[0]
              ? (
                <p key={ recipe.tags[0] } data-testid={ `0-${recipe.tags[0]}-horizontal-tag` }>
                  {recipe.tags[0]}
                </p>)
              : null }
            { recipe.tags[1]
              ? (
                <p key={ recipe.tags[1] } data-testid={ `0-${recipe.tags[1]}-horizontal-tag` }>
                  {recipe.tags[1]}
                </p>)
              : null}

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShare(`/${recipe.type}s/${recipe.id}`) }
              className="share-btn"
              // value={ `/${recipe.type}s/${recipe.id}` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share link" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesMade;
