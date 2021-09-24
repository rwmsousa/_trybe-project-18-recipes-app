import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';

import Context from '../Context/Context';

function FoodInProgress() {
  const { setCurrentPage, setShowProfile } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
  }, [setCurrentPage, setShowProfile]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default FoodInProgress;
