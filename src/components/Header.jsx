import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const {
    showProfile,
    showTitlePage,
    showSearchButton,
    currentPage,
    searchText,
    setSearchRadio,
    searchRadio,
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
    <div>
      <Link to="/perfil" src={ profileIcon }>
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
        data-testid="search-top-btn"
        src={ searchIcon }
      >
        <img className="btnSearch" src={ searchIcon } alt="icone de pesquisar" />
      </button>
    </div>
  );

  return (
    <div className="header">
      {showProfile ? menuItemProfile() : false}
      {showTitlePage ? menuItemTitlePage() : false}
      {showSearchButton ? menuItemSearch() : false}
      {showSearch ? SearchBar() : false}
    </div>
  );
}

export default Header;
