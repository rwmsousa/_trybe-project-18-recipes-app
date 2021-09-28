import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchIngredientofDrinks } from '../services';

function ExploreByIngredientDrink() {
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
      const res = await fetchIngredientofDrinks();
      setdata(res);
    }
    fetch();
  }, []);
  // console.log(history);
  return (
    <div>
      <Header />
      {data.map((item) => (
        <button
          type="button"
          key={ item.strIngredient1 }
          onClick={ () => history.push('/bebidas', [item.strIngredient1]) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient1}.png` }
            alt={ item.strIngredient1 }
            width="100px"
          />
          {item.strIngredient1}
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreByIngredientDrink;
