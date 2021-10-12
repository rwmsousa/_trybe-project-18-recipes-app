import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryFoods, fetchFoods } from '../services';
import '../css/foods.css';

function Foods() {
  const history = useHistory();
  const [actualCategory, setActualCategory] = useState('');

  const {
    setCurrentPage,
    categories,
    setCategories,
    setIdFoodDetails,
    foods,
    setFoods,
    foodsClone,
    setSearchButton,
    shouldUpdate,
    setFoodsClone,
  } = useContext(Context);

  useEffect(() => {
    async function fetch() {
      const res = await fetchFoods();
      setFoods(res);
      setFoodsClone(res);
    }
    if (shouldUpdate) {
      fetch();
    }
    setCurrentPage('Comidas');
    setSearchButton(true);
  }, [setCurrentPage, setSearchButton, setFoods, shouldUpdate, setFoodsClone]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();

      const magicNumber = 5;
      const SplitArray = meals
        .filter((item, idx) => idx < magicNumber);

      setCategories(SplitArray);
    }
    fetchCategories();
  }, [setCategories]);

  const HandleClick = async ({ target: { name, value } }) => {
    if (actualCategory === value) {
      setFoods(foodsClone);
    } else {
      const arrayCategory = await fetchByCategoryFoods(name);
      setFoods(arrayCategory);
      setActualCategory(value);
    }
  };

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    history.push(`/comidas/${value}`);
  };

  useEffect(() => {
    if (foods && foods.length === 1 && foods[0].idMeal !== '52968') {
      const { idMeal } = foods[0];
      setIdFoodDetails(idMeal);
      history.push(`/comidas/${idMeal}`);
    }
  }, [foods, setIdFoodDetails, history]);

  return (
    <div className="foods">
      <Header />
      <ul className="categories">
        <button
          type="button"
          onClick={ () => setFoods(foodsClone) }
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
        { !foods ? (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : (
          foods.map((food, idx) => (
            <li key={ food.idMeal } className="li-card">
              <img
                src={ food.strMealThumb }
                alt={ `Comida: ${food.strMeal}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{food.strMeal}</p>
              <button
                value={ food.idMeal }
                type="button"
                onClick={ handleLink }
                data-testid={ `${idx}-recipe-card` }
              >
                Detalhes
              </button>
            </li>
          )))}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
