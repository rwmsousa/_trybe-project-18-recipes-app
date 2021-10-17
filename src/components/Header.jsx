import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../css/header.css';

function Header() {
  const {
    showProfile,
    showTitlePage,
    showSearchButton,
    currentPage,
    searchText,
    setSearchRadio,
    searchRadio, showSearch, setShowSearch,
  } = useContext(Context);

  useEffect(() => {
    if (
      searchRadio === 'firstLetter'
      && (searchText.length > 1)
    ) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      setSearchRadio('');
      document.getElementById('input-first-letter').checked = false;
    }
  }, [searchRadio, searchText, setSearchRadio]);

  const menuItemProfile = () => (
    <div className="menuItemProfile">
      <Link to="/perfil" src={ profileIcon }>
        <i className="far fa-user" data-testid="profile-top-btn" />
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
        className="menuItemSearch"
        type="button"
        onClick={ () => setShowSearch(!showSearch) }
        data-testid="search-top-btn"
        src={ searchIcon }
      >
        {/* <img className="btnSearch" src={ searchIcon } alt="icone de pesquisar" /> */ }
        <i className="fas fa-search" />
      </button>
    </div>
  );

  return (
    <div className="header">
      <div className="headerButtons">
        {showProfile ? menuItemProfile() : false}
        {showTitlePage ? menuItemTitlePage() : false}
        {showSearchButton ? menuItemSearch() : false}
      </div>
      <div className="headerSearchBar">
        {showSearch ? SearchBar() : false}
      </div>
    </div>
  );
}

export default Header;
