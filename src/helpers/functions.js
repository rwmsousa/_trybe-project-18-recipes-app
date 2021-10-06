import React, { useContext } from 'react';
import Context from '../Context/Context';

function Loading() {
  const { drinksDetails } = useContext(Context);

  if (!drinksDetails || !drinksDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }
}

export default Loading;
