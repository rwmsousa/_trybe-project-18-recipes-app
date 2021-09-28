import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [currentPage, setCurrentPage] = useState(''); // variável utilizada para alterar o título da página no header.// variável utilizada
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProfile, setShowProfile] = useState(true);
  const [showTitlePage, setShowTitlePage] = useState(true);
  const [showSearchButton, setSearchButton] = useState(true);
  const [idFoodDetails, setIdFoodDetails] = useState('');
  const [idDrinkDetails, setIdDrinkDetails] = useState('');
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [details, setDetails] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const providerValue = {
    currentPage,
    setCurrentPage,
    searchText,
    setSearchText,
    searchRadio,
    setSearchRadio,
    foodName,
    setFoodName,
    foods,
    setFoods,
    categories,
    setCategories,
    showProfile,
    setShowProfile,
    showTitlePage,
    setShowTitlePage,
    showSearchButton,
    setSearchButton,
    idFoodDetails,
    setIdFoodDetails,
    idDrinkDetails,
    setIdDrinkDetails,
    foods,
    setFoods,
    details,
    setDetails,
    drinks,
    setDrinks,
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
