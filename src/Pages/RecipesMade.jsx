import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Context from '../Context/Context';

function RecipesMade() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Receitas Feitas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  return (
    <div>
      <Header />
      <div className="buttonsRecipesMade">
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>
      {/* <div className="cardRecipes">
        <div className="divImageCard">
          <img
            src=""
            alt=""
            className="immageCard"
            data-testid={ `"${index}-horizontal-image"` }
          />
        </div>
        <div className="infoCard">
          <p
            className="categoryCard"
            data-testid={ `"${index}-horizontal-top-text"` }
          >
            { }
          </p>
          <p className="titleCard" data-testid={ `"${index}-horizontal-name"` }>{}</p>
          <p className="dateCard" data-testid={ `"${index}-horizontal-done-date"` }>{}</p>
          <img
            src=""
            alt=""
            className="shareCard"
            data-testid={ `"${index}-horizontal-share-btn"` }
          />
          <p
            className="tagCard"
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            { }
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default RecipesMade;
