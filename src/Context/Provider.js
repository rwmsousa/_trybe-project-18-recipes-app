import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [currentPage, setCurrentPage] = useState(''); // variável utilizada para alterar o título da página no header.// variável utilizada
  const [foods, setFoods] = useState([]);
  const [foodsClone, setFoodsClone] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProfile, setShowProfile] = useState(true);
  const [showTitlePage, setShowTitlePage] = useState(true);
  const [showSearchButton, setSearchButton] = useState(true);
  const [idFoodDetails, setIdFoodDetails] = useState('');
  const [idDrinkDetails, setIdDrinkDetails] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [drinksClone, setDrinksClone] = useState([]);
  const [details, setDetails] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const [test, setTest] = useState('');
  const [test1, setTest1] = useState('');
  const [searchStart, setSearchStart] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(true);

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
    foodsClone,
    setFoodsClone,
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
    details,
    setDetails,
    drinks,
    setDrinks,
    test,
    setTest,
    test1,
    setTest1,
    drinksClone,
    setDrinksClone,
    searchStart,
    setSearchStart,
    shouldUpdate,
    setShouldUpdate,
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
