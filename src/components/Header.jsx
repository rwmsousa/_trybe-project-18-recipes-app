import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../services';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const { showProfile,
    showTitlePage, showSearchButton, currentPage } = useContext(Context);

  const handleSearchText = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setSearchRadio(value);
  };

  const handleClick = () => {
    if (searchRadio === 'searchIngredient') {
      fetchIngredient(searchText);
    }
    if (searchRadio === 'searchName') {
      fetchName(searchText);
    }
    if (searchRadio === 'firstLetter') {
      fetchFirstLetter(searchText);
    }
  };

  const renderSearch = () => (
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
      <button type="button" className="fetchBtn" onClick={ handleClick }>
        pesquisar
      </button>
    </div>
  );

  const menuItemProfile = () => (
    <div>
      <Link to="/perfil">
        <img
          className="btnProfile"
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="icone de profile"
        />
      </Link>
    </div>
  );

  const menuItemTitlePage = () => (
    <div>
      <h1 className="pageTitle" data-testid="page-title">
        {currentPage}
      </h1>
    </div>
  );

  const menuItemSearch = () => (
    <div>
      <button
        type="button"
        onClick={ () => setShowSearch(!showSearch) }
        data-testid="exec-search-btn"
      >
        <img
          className="btnSearch"
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="icone de pesquisar"
        />
      </button>
    </div>
  );

  return (
    <div className="header">
      {showProfile ? menuItemProfile() : false}
      {showTitlePage ? menuItemTitlePage() : false}
      { showSearchButton ? menuItemSearch() : false }
      {showSearch ? renderSearch() : false}
    </div>
  );
}

export default Header;
