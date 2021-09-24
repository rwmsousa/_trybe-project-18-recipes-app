import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function Explorer() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title"> Explorar </h1>
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        Explorar Comidas
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Link>
      <Footer />
    </div>
  );
}

export default Explorer;
