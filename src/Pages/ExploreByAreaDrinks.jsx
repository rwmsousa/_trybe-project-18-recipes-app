import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function ExploreByAreaDrinks() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Origem');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreByAreaDrinks;
