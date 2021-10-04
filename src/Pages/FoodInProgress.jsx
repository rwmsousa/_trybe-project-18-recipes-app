import React, { useEffect, useContext } from 'react';

import Context from '../Context/Context';

function FoodInProgress() {
  const { setCurrentPage, setShowProfile } = useContext(Context);

  useEffect(() => {
    setShowProfile(false);
  }, [setCurrentPage, setShowProfile]);

  return (
    <div>
      asdhjas
    </div>
  );
}

export default FoodInProgress;
