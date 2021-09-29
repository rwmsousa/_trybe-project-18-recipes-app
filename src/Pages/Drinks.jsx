import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryDrinks } from '../services';

function Drinks() {
  const history = useHistory();

  const [drinksClone, setDrinksClone] = useState([]);
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState('');
  const { setCurrentPage, setIdDrinkDetails, drinks, setDrinks } = useContext(Context);
  const magicNumberSearch = 12;

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());
      const magicNumber = 12;
      const SplitArray = response.drinks.splice(0, magicNumber);

      setDrinks(SplitArray);
      setDrinksClone(SplitArray);
    }
    fetchDrinks();
    setCurrentPage('Bebidas');
  }, [history, setCurrentPage, setDrinks]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = response.drinks.filter(
        (item, idx) => idx < magicNumber,
      );

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

  const handleLink = ({ target: { value } }) => {
    setIdDrinkDetails(value);
    history.push(`/bebidas/${value}`);
  };

  if (drinks.length === 1) {
    const { idDrink } = drinks[0];
    setIdDrinkDetails(idDrink);
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <div>
      <Header />
      <ul>
        <button
          type="button"
          onClick={ () => setDrinks(drinksClone) }
          data-testid="All-category-filter"
        >
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
            {category.strCategory}
          </button>
        ))}
      </ul>
      <ul>
        {drinks.length === 0 ? (
          <p> Nenhum resultado encontrado! </p>
        ) : (
          drinks.slice(0, magicNumberSearch).map((drink, idx) => (
            <li key={ drink.idDrink } data-testid={ `${idx}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ `Bebida: ${drink.strDrink}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{drink.strDrink}</p>
              <button
                value={ drink.idDrink }
                type="button"
                onClick={ handleLink }
                data-testid={ `${idx}-recipe-card` }
              >
                detalhes
              </button>
            </li>
          ))
        )}
      </ul>
      <Footer />
    </div>
  );
}

export default Drinks;
