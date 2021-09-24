import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';

import Context from '../Context/Context';

function DrinkDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [setCurrentPage, setShowTitlePage, setShowProfile, setSearchButton]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default DrinkDetail;
