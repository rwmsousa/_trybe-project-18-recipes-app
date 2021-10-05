import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../Context/Context';

function FavoriteRecipes() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  const [favoriteStorage, setFavoriteStorage] = useState([]);

  useEffect(() => {
    setCurrentPage('Receitas Favoritas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  const handleClick = () => {
    const favoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterFood = favoriteFood.filter((food) => food.type === 'comida');
    setFavoriteStorage(filterFood);
  };

  console.log(favoriteStorage);

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
      {favoriteStorage.map((recipe, index) => (
        <div key={ recipe.id } className="cardRecipes">
          <div className="divImageCard">
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              className="immageCard"
              data-testid={ `"${index}-horizontal-image"` }
            />
          </div>
          <div className="infoCard">
            <p
              className="categoryCard"
              data-testid={ `"${index}-horizontal-top-text"` }
            >
              { recipe.strCategory }
            </p>
            <p
              className="titleCard"
              data-testid={ `"${index}-horizontal-name"` }
            >
              { recipe.strMeal }
            </p>
            <p
              className="dateCard"
              data-testid={ `"${index}-horizontal-done-date"` }
            >
              não entendi
            </p>
            <img
              src=""
              alt=""
              className="shareCard"
              data-testid={ `"${index}-horizontal-share-btn"` }
            />
            <p
              className="tagCard"
              data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
            >
              { recipe.strTags }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
