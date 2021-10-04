import React, { useContext } from 'react';
import Context from '../Context/Context';
import { fetchIngredientFoods,
  fetchNameFoods,
  fetchFirstLetterFoods,
  fetchIngredientDrinks,
  fetchNameDrinks,
  fetchFirstLetterDrinks,
} from '../services';

function SearchBar() {
  const {
    setFoods,
    setDrinks,
    currentPage,
    searchText,
    searchRadio,
    setSearchText,
    setSearchRadio,
  } = useContext(Context);

  const handleSearchText = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setSearchRadio(value);
  };

  async function handleClickSearch() {
    if (currentPage === 'Comidas') {
      switch (searchRadio) {
      case 'searchIngredient':
        setFoods(await fetchIngredientFoods(searchText));
        break;
      case 'searchName':
        setFoods(await fetchNameFoods(searchText));
        break;
      case 'firstLetter':
        setFoods(await fetchFirstLetterFoods(searchText));
        break;
      default:
        break;
      }
    }

    if (currentPage === 'Bebidas') {
      switch (searchRadio) {
      case 'searchIngredient':
        setDrinks(await fetchIngredientDrinks(searchText));
        break;
      case 'searchName':
        setDrinks(await fetchNameDrinks(searchText));
        break;
      case 'firstLetter':
        setDrinks(await fetchFirstLetterDrinks(searchText));
        break;
      default:
        break;
      }
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        className="searchInput"
        value={ searchText }
        onChange={ handleSearchText }
      />
      <label htmlFor="input-ingredient">
        Ingrediente
        <input
          className="searchIngredient"
          type="radio"
          name="searchRadio"
          id="input-ingredient"
          data-testid="ingredient-search-radio"
          value="searchIngredient"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="input-name">
        Nome
        <input
          className="searchName"
          type="radio"
          name="searchRadio"
          id="input-name"
          data-testid="name-search-radio"
          value="searchName"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="input-first-letter">
        Primeira Letra
        <input
          className="firstLetter"
          type="radio"
          name="searchRadio"
          id="input-first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleRadio }
        />
      </label>
      <button
        type="button"
        className="fetchBtn"
        data-testid="exec-search-btn"
        onClick={ handleClickSearch }
      >
        pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
