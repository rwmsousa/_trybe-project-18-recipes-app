import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';

function Explorer() {
  const { setCurrentPage, setShowSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowSearchButton(false);
  }, [setCurrentPage, setShowSearchButton]);

  return (
    <div>
      <Header />
      <h1 data-testid="page-title"> Explorar </h1>
      <Footer />
    </div>
  );
}

export default Explorer;
