import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function ExploreByIngredientDrink() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
      <h1> ExploreByIngredientDrink </h1>
      <Footer />
    </div>
  );
}

export default ExploreByIngredientDrink;
