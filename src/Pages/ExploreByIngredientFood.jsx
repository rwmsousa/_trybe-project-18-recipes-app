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
    setSearchButton } = useContext(Context);

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

  return (
    <div>
      <Header />
      {data.map((item) => (
        <button
          type="button"
          key={ item.strIngredient }
          onClick={ () => history.push('/comidas', [item.strIngredient]) }
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
