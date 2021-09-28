import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchIngredientofDrinks } from '../services';

function ExploreByIngredientDrink() {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const {
    setCurrentPage,
    setSearchButton,
    setDrinks } = useContext(Context);

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

  const handleClick = ({ target: { value } }) => {
    async function fetchIngDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((date) => date.json());
      const SplitArray = response.drinks
        .filter((i) => i.strIngredient1 === value);
      if (SplitArray.length === 0) {
        setDrinks([]);
      } else {
        setDrinks(SplitArray);
      }
    }
    fetchIngDrinks();
    history.push('/bebidas');
  };

  return (
    <div>
      <Header />
      {data.map((item) => (
        <button
          type="button"
          key={ item.strIngredient1 }
          onClick={ handleClick }
          value={ item.strIngredient1 }
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
