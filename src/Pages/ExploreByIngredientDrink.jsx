import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
    setDrinks,
    setShouldUpdate,
  } = useContext(Context);

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
    setShouldUpdate(false);
  }, [setShouldUpdate]);

  async function handleClick(value) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
    const { drinks } = await response.json();
    history.push('/bebidas');
    return drinks.length === 0 ? setDrinks([]) : setDrinks(drinks);
  }

  return (
    <div>
      <Header />
      {data.map((item, i) => (
        <Link
          key={ item.strIngredient1 }
          data-testid={ `${i}-ingredient-card` }
          onClick={ () => handleClick(item.strIngredient1) }
          to="/comidas"
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            alt={ item.strIngredient1 }
            width="100px"
            data-testid={ `${i}-card-img` }
          />
          <p data-testid={ `${i}-card-name` }>{item.strIngredient1}</p>
        </Link>
        // <div
        //   key={ item.strIngredient1 }
        //   // data-testid={ `${i}-ingredient-card` }
        // >
        //   <input
        //     type="button"
        //     value={ item.strIngredient1 }
        //     onClick={ handleClick }
        //     data-testid={ `${i}-ingredient-card` }
        //   />
        //   <input
        //     type="image"
        //     src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
        //     alt={ item.strIngredient1 }
        //     width="100px"
        //     // value={ item.strIngredient1 }
        //     // onClick={ handleClick }
        //     data-testid={ `${i}-card-img` }
        //   />
        //   <p data-testid={ `${i}-card-name` }>
        //     { item.strIngredient1 }
        //   </p>
        // </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreByIngredientDrink;
