import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchFoods, fetchFoodByArea } from '../services';

function ExploreByAreaFood() {
  const [areas, setareas] = useState();
  const [foodsarea, setfoodsarea] = useState();
  const { setCurrentPage,
  } = useContext(Context);

  useEffect(() => {
    async function fetch() {
      const res = await fetchFoods();
      const res2 = await fetchFoodByArea();
      setfoodsarea(res);
      setareas(res2);
    }
    fetch();
    setCurrentPage('Explorar Origem');
  }, [setCurrentPage, setfoodsarea]);

  return (
    <div>
      <Header />
      <select name="dropdownArea" data-testId="explore-by-area-dropdown">
        <option value="all">All</option>
        {areas.map((a, i) => (
          <option
            key={ a.strArea }
            value={ a.strArea }
            data-testid={ `${a.strArea}-option` }
          >
            {a.strArea}
          </option>
        ))}
      </select>
      <ul>
        { !foodsarea ? (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : (
          foodsarea.map((food, idx) => (
            <li key={ food.idMeal }>
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
                detalhes
              </button>
            </li>
          )))}
      </ul>
      <Footer />
    </div>
  );
}

export default ExploreByAreaFood;
