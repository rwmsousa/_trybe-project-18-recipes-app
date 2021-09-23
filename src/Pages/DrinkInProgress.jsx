import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';

import Context from '../Context/Context';

function DrinkInProgress() {
  const { setCurrentPage } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Detalhes');
  }, [setCurrentPage]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default DrinkInProgress;
