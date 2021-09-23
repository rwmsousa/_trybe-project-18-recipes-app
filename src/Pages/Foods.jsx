import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = meals.splice(0, magicNumber);

      setFoods(SplitArray);
    }
    fetchFoods();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = meals.splice(0, magicNumber);

      setCategories(SplitArray);
    }
    fetchCategories();
  }, []);

  const HandleClick = ({ target: { name } }) => {
    const results = fetch(`www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then((response) => (
        response
          .json()
          .then((data) => data)
      ));
    console.log(results);
  };
  // async function HandleClick({ target: { name } }) {
  //   const results = await fetch(
  //     `www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
  //   );
  //   const data = await results.json();
  //   console.log(data);
  // };

  return (
    <div className="foods">
      <Header />
      <ul>
        {categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            name={ category.strCategory }
            onClick={ (event) => HandleClick(event) }
          >
            { category.strCategory }
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
            <p data-testid={ `${idx}-card-name` }>{ food.strMeal }</p>

          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
