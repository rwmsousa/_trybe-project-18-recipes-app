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

  const [ showSearch, setShowSearch ] = useState(false);
  const [ currentPage ] = useContext();

  const renderSearch = () => {
    return (
      <div className="search">
        <input type="text" data-testid="search-input" name="searchInput" className="searchInput" />
        <input className="searchIngredient" type="radio" name="searchIngredient">Ingrediente</input>
        <input className="searchName" type="radio" name="searchName">Nome</input>
        <input className="firstLetter" type="radio" name="firstLetter">Primeira Letra</input>
      </div>
    )
  }

  return (
    <div className="header">
      <Link to="/profile">
        <img className="btnProfile" src="../images/profileIcon.svg" data-testid="profile-top-btn" />
      </Link>
      <h1 className="pageTitle" data-testid="page-title">{ currentPage }</h1>
      <button onClick={ () => setShowSearch(!showSearch) }>
        <img className="btnSearch" src="../images/searchIcon.svg" data-testid="search-top-btn" />
      </button>
      { showSearch ? renderSearch() : false }
    </div >
  );
}

export default Header;
