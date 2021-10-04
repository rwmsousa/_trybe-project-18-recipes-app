import React, { useEffect, useContext } from 'react';

import Context from '../Context/Context';

function DrinkInProgress() {
  const { setCurrentPage, setShowProfile } = useContext(Context);

  useEffect(() => {
    setShowProfile(false);
  }, [setCurrentPage, setShowProfile]);

  return (
    <div>
      adsflgkjldfg
    </div>
  );
}

export default DrinkInProgress;
