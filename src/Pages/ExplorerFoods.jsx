import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchRandomFoodDetails } from '../services';

function ExplorerFoods() {
  const history = useHistory();
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Comidas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  async function handleClick() {
    const response = await fetchRandomFoodDetails();
    const id = response[0].idMeal;
    console.log(`/comidas/${id}`);
    history.push(`/comidas/${id}`);
  }

  return (
    <div>
      <Header />
      <Link
        to="/explorar/comidas/ingredientes"
      >
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link
        to="/explorar/comidas/area"
      >
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
