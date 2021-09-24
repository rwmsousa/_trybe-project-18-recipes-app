import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryDrinks } from '../services';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [drinksClone, setDrinksClone] = useState([]);
  const [categories, setCategories] = useState([]);
  const { setCurrentPage } = useContext(Context);
  const [actualCategory, setActualCategory] = useState('');

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = response.drinks.splice(0, magicNumber);

      setDrinks(SplitArray);
      setDrinksClone(SplitArray);
    }
    fetchDrinks();
    setCurrentPage('Bebidas');
  }, [setCurrentPage]);

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

  const HandleClick = async ({ target: { name, value } }) => {
    if (actualCategory === value) {
      setDrinks(drinksClone);
    } else {
      const arrayCategory = await fetchByCategoryDrinks(name);
      setDrinks(arrayCategory);
      setActualCategory(value);
    }
  };

  return (
    <div>
      <Header />
      <ul>
        <button type="button" onClick={ () => setDrinks(drinksClone) }>
          All
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            name={ category.strCategory }
            value={ category.strCategory }
            onClick={ (event) => HandleClick(event) }
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
            <Link to={ `/bebidas/${drink.idDrink}` }>detalhes</Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Drinks;
