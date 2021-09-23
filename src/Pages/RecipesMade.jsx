import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function RecipesMade() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
      <h1> RecipesMade </h1>
      <Footer />
    </div>
  );
}

export default RecipesMade;
