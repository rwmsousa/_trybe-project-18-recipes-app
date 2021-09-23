import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function ExploreByAreaFood() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title"> Explorar Origem </h1>
      <Footer />
    </div>
  );
}

export default ExploreByAreaFood;
