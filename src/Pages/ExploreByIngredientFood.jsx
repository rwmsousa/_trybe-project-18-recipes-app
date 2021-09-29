import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchIngredientofFoods } from '../services';

function ExploreByIngredientFood() {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const {
    setCurrentPage,
    setSearchButton,
    setFoods } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Ingredientes');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  useEffect(() => {
    async function fetch() {
      const res = await fetchIngredientofFoods();
      setdata(res);
    }
    fetch();
  }, []);

  const handleClick = async ({ target: { value } }) => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((date) => date.json());
    const SplitArray = meals
      .filter((i) => i.strIngredient1 === value);
    if (SplitArray.length === 0) {
      setFoods([]);
    } else {
      setFoods(SplitArray);
    }
    history.push('/comidas');
  };

  return (
    <div>
      <Header />
      {data.map((item) => (
        <button
          type="button"
          key={ item.strIngredient }
          onClick={ handleClick }
          value={ [item.strIngredient] }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}.png` }
            alt={ item.strIngredient }
            width="100px"
          />
          {item.strIngredient}
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreByIngredientFood;
