import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../Context/Context';
import { fetchByCategoryFoods } from '../services';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [foodsClone, setFoodsClone] = useState([]);
  const [actualCategory, setActualCategory] = useState('');
  const {
    setCurrentPage,
    categories,
    setCategories,
    setDetails,
    setYouTube,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = meals.splice(0, magicNumber);

      setFoods(SplitArray);
      setFoodsClone(SplitArray);
    }
    fetchFoods();
    setCurrentPage('Comidas');
  }, [setCurrentPage]);

  useEffect(() => {
    async function fetchCategories() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = meals.splice(0, magicNumber);
      setCategories(SplitArray);
    }
    fetchCategories();
  }, [categories, setCategories]);

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
    const magicNumber = 24;
    const recipeToDetail = foodsClone.filter((food) => food.idMeal === value);
    setDetails(recipeToDetail);
    setYouTube((recipeToDetail[0].strYoutube).substr(magicNumber));
    history.push(`/comidas/${value}`);
  };

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
        {foods.map((food, idx) => (
          <li data-testid={ `${idx}-recipe-card` } key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt={ `Comida: ${food.strMeal}` }
              width="150px"
              data-testid={ `${idx}-card-img` }
            />
            <p data-testid={ `${idx}-card-name` }>{food.strMeal}</p>
            <button value={ food.idMeal } type="button" onClick={ handleLink }>
              detalhes
            </button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
