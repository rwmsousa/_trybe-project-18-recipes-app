import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

function Header() {
  // HEADER NAS PÁGINAS:
  // Comidas
  // Bebidas
  // explorar
  // explorar Comidas
  // explorar Comidas por ingrediente
  // explorar Bebidas
  // explorar Bebidas por ingrediente
  // explorar comidas por local de origem
  // tela de perfil
  // receitas Feitas
  // receitas Favoritas

  const [showSearch, setShowSearch] = useState(false);
  const { currentPage } = useContext(Context);

  const renderSearch = () => (
    <div className="search">
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        className="searchInput"
      />
      <label htmlFor="input-ingredient">
        Ingrediente
        <input
          className="searchIngredient"
          type="radio"
          name="searchIngredient"
          id="input-ingredient"
        />
      </label>
      <label htmlFor="input-name">
        Nome
        <input
          className="searchName"
          type="radio"
          name="searchName"
          id="input-name"
        />
      </label>
      <label htmlFor="input-first-letter">
        Primeira Letra
        <input
          className="firstLetter"
          type="radio"
          name="firstLetter"
          id="input-first-letter"
        />
      </label>
    </div>
  );

  return (
    <div className="header">
      <Link to="/profile">
        <img
          className="btnProfile"
          src="../images/profileIcon.svg"
          data-testid="profile-top-btn"
          alt="icone de profile"
        />
      </Link>
      <h1 className="pageTitle" data-testid="page-title">{ currentPage }</h1>
      <button type="button" onClick={ () => setShowSearch(!showSearch) }>
        <img
          className="btnSearch"
          src="../images/searchIcon.svg"
          data-testid="search-top-btn"
          alt="icone de pesquisar"
        />
      </button>
      { showSearch ? renderSearch() : false }
    </div>
  );
}

export default Header;
