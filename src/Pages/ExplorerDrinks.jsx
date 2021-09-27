import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchRandomDrinkDetails } from '../services';

function ExplorerDrinks() {
  const history = useHistory();
  const {
    setCurrentPage,
    setSearchButton } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Explorar Bebidas');
    setSearchButton(false);
  }, [setCurrentPage, setSearchButton]);

  async function handleClick() {
    const response = await fetchRandomDrinkDetails();
    const { drinks } = response;
    const id = drinks[0].idDrink;
    history.push(`/bebidas/${id}`);
  }

  return (
    <div>
      <Header />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        <button type="button">
          Por Ingredientes
        </button>
      </Link>
      {/* <Link
        to="/explorar/bebidas/area"
        data-testid="explore-by-area"
      >
        <button type="button">
          Por Local de Origem
        </button>
      </Link> */}
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

export default ExplorerDrinks;
