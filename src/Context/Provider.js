import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../services';

function Provider({ children }) {
  const [currentPage, setCurrentPage] = useState(''); // variável utilizada para alterar o título da página no header.
  const [searchText, setSearchText] = useState('');
  const [searchRadio, setSearchRadio] = useState('');// variável utilizada
  const [foodName, setFoodName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProfile, setShowProfile] = useState(true);
  const [showTitlePage, setShowTitlePage] = useState(true);
  const [showSearchButton, setSearchButton] = useState(true);

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

  const providerValue = {
    currentPage,
    setCurrentPage,
    fetchIngredient,
    handleSearchText,
    searchText,
    setSearchText,
    handleClick,
    searchRadio,
    setSearchRadio,
    handleRadio,
    foodName,
    setFoodName,
    categories,
    setCategories,
    showProfile,
    setShowProfile,
    showTitlePage,
    setShowTitlePage,
    showSearchButton,
    setSearchButton,
  };

  return (
    <Context.Provider value={ providerValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.func).isRequired,
};

export default Provider;
