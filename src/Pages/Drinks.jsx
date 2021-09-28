import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryDrinks } from '../services';

function Drinks() {
  const history = useHistory();

  const [drinksClone, setDrinksClone] = useState([]);
  const [actualCategory, setActualCategory] = useState('');

  const {
    setCurrentPage,
    setIdDrinkDetails,
    categories,
    setCategories,
    setDrinks,
    drinks } = useContext(Context);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = response.drinks.filter((item, idx) => (
        idx < magicNumber
      ));

      setDrinks(SplitArray);
      setDrinksClone(SplitArray);
    }

    async function fetchIngDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());

      const SplitArray = response.drinks
        .filter((i) => i.strIngredient1 === history.location.state[0]);

      if (SplitArray.length === 0) {
        setDrinks([]);
        setDrinksClone([]);
      } else {
        setDrinks(SplitArray);
        setDrinksClone(SplitArray);
      }
    }

    if (history.action === 'PUSH') {
      fetchIngDrinks();
    } else {
      fetchDrinks();
    }
    setCurrentPage('Bebidas');
  }, [history]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = response.drinks.filter((item, idx) => (
        idx < magicNumber
      ));

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
    // const magicNumber = 24;
    // const recipeToDetail = drinksClone.filter((drink) => drink.idDrink === value);
    // setDrinkDetails(recipeToDetail);
    setIdDrinkDetails(value);
    history.push(`/bebidas/${value}`);
  };

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
            { category.strCategory }
          </button>
        ))}
      </ul>
      <ul>
        {drinks.map((drink, idx) => (
          <li key={ drink.idDrink }>
            <img
              src={ drink.strDrinkThumb }
              alt={ `Bebida: ${drink.strDrink}` }
              width="150px"
              data-testid={ `${idx}-card-img` }
            />
            <p data-testid={ `${idx}-card-name` }>{ drink.strDrink }</p>
            <button
              value={ drink.idDrink }
              type="button"
              onClick={ handleLink }
              data-testid={ `${idx}-recipe-card` }
            >
              detalhes
            </button>
          </li>
        ))}
        {/* {drinks.length === 0 ? (<p> Nenhum Resultdo </p>)
          : drinks.map((drink, idx) => (
            <li data-testid={ `${idx}-recipe-card` } key={ drink.idMeal }>
              <img
                src={ drink.strMealThumb }
                alt={ `Comida: ${drink.strMeal}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{drink.strMeal}</p>
              <button value={ drink.idMeal } type="button" onClick={ handleLink }>
                detalhes
              </button>
            </li>
          ))} */}
      </ul>
      <Footer />
    </div>
  );
}

export default Drinks;
