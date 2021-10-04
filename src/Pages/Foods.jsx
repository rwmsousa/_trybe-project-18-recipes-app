import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryFoods, fetchFoods } from '../services';

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
      const SplitArray = meals.filter((item, idx) => idx < magicNumber);

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
    if (foods.length === 1) {
      const { idMeal } = foods[0];
      setIdFoodDetails(idMeal);
      history.push(`/comidas/${idMeal}`);
    }
  }, []);

  return (
    <div className="foods">
      <Header />
      <ul>
        <button
          type="button"
          onClick={ () => setFoods(foodsClone) }
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
        { !foods ? (
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        ) : (
          foods.map((food, idx) => (
            <li key={ food.idMeal }>
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
                detalhes
              </button>
            </li>
          )))}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
