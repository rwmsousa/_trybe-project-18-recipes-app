import React, { useContext } from 'react';
import Context from '../Context/Context';

function SearchMealByName(type, food) {
  const value = useContext(Context);
  console.log(value);
  console.log(type);
  console.log(food);

  return (
    <span>cae</span>
    // useEffect((food) => {
    //   fetch(`www.themealdb.com/api/json/v1/1/search.php?${type}=${food}`)
    //     .then(
    //       (response)
    //         .then((data) => setFood(data))
    //     )
    // }, [])
  );
}

export default SearchMealByName;
