import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchIngredientofFoods } from '../services';
import '../css/exploreByIngredient.css';

function ExploreByIngredientFood() {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const {
    setCurrentPage, setSearchButton, setFoods, setShouldUpdate } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Ingredients');
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

  const handleClick = async (value) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
    );
    const { meals } = await response.json();
    setFoods(meals);
    history.push('/foods');
  };

  return (
    <div>
      <Header />
      <div className="content-explore">
        { data.map((item, i) => (
          <div key={ item.strIngredient1 } className="ingredient">
            <Link
              data-testid={ `${i}-ingredient-card` }
              onClick={ () => handleClick(item.strIngredient) }
              to="/foods"
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                alt={ item.strIngredient }
                width="100px"
                data-testid={ `${i}-card-img` }
              />
              <p data-testid={ `${i}-card-name` }>{item.strIngredient}</p>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByIngredientFood;
