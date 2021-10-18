import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchRandomDrinkDetails } from '../services';
import '../css/explorer.css';

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
    history.push(`/drinks/${id}`);
  }

  return (
    <div>
      <Header />
      <div className="content-explore">
        <Link
          to="/explorar/bebidas/ingredientes"
        >
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="explore-btn"
          >
            Por Ingredientes
          </button>
        </Link>
        {/* <Link
        to="/explorar/bebidas/area"
      >
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link> */}
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

export default ExplorerDrinks;
