import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [currentPage, setCurrentPage] = useState('');
  // variável utilizada para alterar o título da página no header.
  const [foodName, setFoodName] = useState([]);

  const providerValue = {
    currentPage,
    setCurrentPage,
    foodName,
    setFoodName,
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
