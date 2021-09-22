import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = response.drinks.splice(0, magicNumber);

      setCategories(SplitArray);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <Header />
      <ul>
        {categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      </ul>
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
