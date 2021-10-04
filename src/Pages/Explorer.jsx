import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function Explorer() {
  const {
    setCurrentPage,
    setShowTitlePage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar');
    setSearchButton(false);
  }, [setCurrentPage, setShowTitlePage, setSearchButton]);

  return (
    <div>
      <Header />
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
