import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import '../css/drinks.css';
import { fetchByCategoryDrinks, fetchDrinks } from '../services';

function Drinks() {
  const history = useHistory();
  const [actualCategory, setActualCategory] = useState('');
  const quantityRecipes = 12;
  const {
    setCurrentPage,
    categories,
    setCategories,
    setIdDrinkDetails,
    drinks,
    setDrinks,
    drinksClone,
    setSearchButton,
    shouldUpdate,
    setDrinksClone,
  } = useContext(Context);

  useEffect(() => {
    async function fetch() {
      const res = await fetchDrinks();
      setDrinks(res);
      setDrinksClone(res);
    }
    if (shouldUpdate) {
      fetch();
    }
    setCurrentPage('Bebidas');
    setSearchButton(true);
  }, [setCurrentPage, setSearchButton, shouldUpdate, setDrinks, setDrinksClone]);

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
  }, [setCategories]);

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

  useEffect(() => {
    if (drinks && drinks.length === 1) {
      const { idDrink } = drinks[0];
      setIdDrinkDetails(idDrink);
      history.push(`/bebidas/${idDrink}`);
    }
  }, [drinks, setIdDrinkDetails, history]);

  return (
    <div className="drinks">
      <Header />
      <ul className="categories">
        <button
          type="button"
          onClick={ () => setDrinks(drinksClone) }
          data-testid="All-category-filter"
          className="category-filter"
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
            className="category-filter"
          >
            {category.strCategory}
          </button>
        ))}
      </ul>
      <ul className="cards">
        { !drinks ? (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : (
          drinks.slice(0, quantityRecipes).map((drink, idx) => (
            <li key={ drink.idDrink } className="li-card">
              <img
                src={ drink.strDrinkThumb }
                alt={ `Bebida: ${drink.strDrink}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <button
                value={ drink.idDrink }
                type="button"
                onClick={ handleLink }
                data-testid={ `${idx}-recipe-card` }
              >
                { drink.strDrink }
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
