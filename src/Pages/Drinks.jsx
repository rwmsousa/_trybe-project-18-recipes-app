import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = response.drinks.splice(0, magicNumber);

      setDrinks(SplitArray);
    }
    fetchDrinks();
  }, []);

  return (
    <div>
      <Header />
      <ul>
        {drinks.map((drink, idx) => (
          <li data-testid={ `${idx}-recipe-card` } key={ drink.idDrink }>
            <img
              src={ drink.strDrinkThumb }
              alt={ `Bebida: ${drink.strDrink}` }
              width="150px"
              data-testid={ `${idx}-card-img` }
            />
            <p data-testid={ `${idx}-card-name` }>{ drink.strDrink }</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Drinks;
