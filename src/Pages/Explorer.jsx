import React, { useEffect, useContext } from 'react';
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
      <Footer />
    </div>
  );
}

export default Explorer;
