import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const [foods, setFoods] = useState([]);

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

  return (
    <div className="foods">
      <Header />
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
