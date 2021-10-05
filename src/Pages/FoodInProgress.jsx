import React, { useEffect, useContext } from 'react';

import Context from '../Context/Context';

function FoodInProgress() {
  const { setCurrentPage, setShowProfile } = useContext(Context);

  useEffect(() => {
    setShowProfile(false);
  }, [setCurrentPage, setShowProfile]);

  return (
    <div>
      <div>
        <h3>Ingredientes</h3>
      </div>
      <div>
        <h3>Instruções</h3>
      </div>
      <div>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>
    </div>
  );
}

export default FoodInProgress;
