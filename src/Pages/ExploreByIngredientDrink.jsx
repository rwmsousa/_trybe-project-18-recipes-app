import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function ExploreByIngredientDrink() {
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Ingredientes');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreByIngredientDrink;
