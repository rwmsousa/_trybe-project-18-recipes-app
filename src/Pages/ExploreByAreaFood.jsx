import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchFoodByArea, fetchFoods, fetchAreaofFoods } from '../services';
import '../css/exploreByArea.css';

function ExploreByAreaFood() {
  const history = useHistory();
  const { setCurrentPage,
    setIdFoodDetails,
    areas,
    foodsarea,
    setfoodsarea,
    foodsareaClone,
    setareas,
    setfoodsareaClone,
  } = useContext(Context);

  useEffect(() => {
    const fetch = async () => {
      const res2 = await fetchAreaofFoods();
      const res = await fetchFoods();
      setareas(res2);
      setfoodsarea(res);
      setfoodsareaClone(res);
    };
    fetch();
    setCurrentPage('Explorar Origem');
  }, [setCurrentPage, setareas, setfoodsarea, setfoodsareaClone]);

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    history.push(`/comidas/${value}`);
  };

  const handleChange = async ({ target: { value } }) => {
    if (value === 'all') {
      setfoodsarea(foodsareaClone);
    } else {
      const res = await fetchFoodByArea(value);
      setfoodsarea(res);
    }
  };

  return (
    <div>
      <Header />
      <select
        name="dropdownArea"
        data-testId="explore-by-area-dropdown"
        onChange={ handleChange }
        className="select-area"
      >
        <option value="all" data-testId="All-option">All</option>
        {areas.map((a) => (
          <option
            key={ a.strArea }
            value={ a.strArea }
            data-testid={ `${a.strArea}-option` }
          >
            {a.strArea}
          </option>
        ))}
      </select>
      <ul className="cards">
        { !foodsarea ? (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : (
          foodsarea.map((food, idx) => (
            <li key={ food.idMeal } className="li-card">
              <img
                src={ food.strMealThumb }
                alt={ `Comida: ${food.strMeal}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{food.strMeal}</p>
              <button
                value={ food.idMeal }
                type="button"
                onClick={ handleLink }
                data-testid={ `${idx}-recipe-card` }
              >
                Detalhes
              </button>
            </li>
          )))}
      </ul>
      <Footer />
    </div>
  );
}

export default ExploreByAreaFood;
