import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
    setFoods,
    setShouldUpdate,
  } = useContext(Context);

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
    setShouldUpdate(false);
  }, [setShouldUpdate]);

  async function handleClick(value) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const { meals } = await response.json();
    console.log(meals);
    setFoods(meals);
    history.push('/comidas');
  }

  return (
    <div>
      <Header />
      {data.map((item, i) => (
        <Link
          key={ item.strIngredient }
          data-testid={ `${i}-ingredient-card` }
          onClick={ () => handleClick(item.strIngredient) }
          to="/comidas"
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            alt={ item.strIngredient }
            width="100px"
            data-testid={ `${i}-card-img` }
          />
          <p data-testid={ `${i}-card-name` }>{item.strIngredient}</p>
        </Link>
        // <div
        //   key={ item.strIngredient }
        //   // data-testid={ `${i}-ingredient-card` }
        // >
        //   <input
        //     type="button"
        //     data-testid={ `${i}-ingredient-card` }
        //     value={ item.strIngredient }
        //     onClick={ handleClick }
        //   />
        //   <input
        //     type="image"
        //     src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
        //     alt={ item.strIngredient }
        //     width="100px"
        //     // value={ item.strIngredient }
        //     // onClick={ handleClick }
        //     data-testid={ `${i}-card-img` }
        //   />
        //   <p data-testid={ `${i}-card-name` }>
        //     { item.strIngredient }
        //   </p>
        // </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreByIngredientFood;
