import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchRandomFoodDetails, fetchFoods, fetchAreaofFoods } from '../services';

function ExplorerFoods() {
  const history = useHistory();
  const {
    setCurrentPage,
    setSearchButton,
    setfoodsarea,
    setareas,
    setfoodsareaClone,
  } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Comidas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  const handleClick = async () => {
    const response = await fetchRandomFoodDetails();
    const id = response[0].idMeal;
    history.push(`/foods/${id}`);
  };

  const handleArea = async () => {
    const res2 = await fetchAreaofFoods();
    const res = await fetchFoods();
    setareas(res2);
    setfoodsarea(res);
    setfoodsareaClone(res);
    history.push('/explorer/foods/area');
  };

  return (
    <div>
      <Header />
      <div className="content-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorer/foods/ingredients') }
          className="explore-btn"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ handleArea }
          className="explore-btn"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
          className="explore-btn"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
