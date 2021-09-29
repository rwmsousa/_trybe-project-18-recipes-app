import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryFoods } from '../services';

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
    setFoodsClone,
  } = useContext(Context);

  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = meals.filter((item, idx) => idx < magicNumber);

      setFoods(SplitArray);
      setFoodsClone(SplitArray);
    }

    // async function fetchIngFoods() {
    //   const { meals } = await fetch(
    //     'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    //   ).then((data) => data.json());

    //   const SplitArray = meals.filter(
    //     (i) => i.strIngredient1 === history.location.state[0],
    //   );

    //   if (SplitArray.length === 0) {
    //     setFoods([]);
    //   } else {
    //     setFoods(SplitArray);
    //   }
    // }

    // if (history.action === 'PUSH') {
    //   fetchIngFoods();
    // } else {
      fetchFoods();
    // }
    setCurrentPage('Comidas');
  }, [setCurrentPage, setFoods]);

  useEffect(() => {
    async function fetchCategories() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => data.json());

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
    console.log();
    setIdFoodDetails(value);
    history.push(`/comidas/${value}`);
  };

  if (foods.length === 1) {
    const { idMeal } = foods[0];
    setIdFoodDetails(idMeal);
    history.push(`/comidas/${idMeal}`);
  }

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
        {foods.length === 0 ? (
          <p> Nenhum resultado encontrado! </p>
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
          ))
        )}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
