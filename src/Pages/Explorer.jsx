import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import '../css/explorer.css';

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
      <div className="content-explore">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="explore-btn"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="explore-btn"
        >
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
