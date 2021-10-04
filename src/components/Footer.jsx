import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkicon from '../images/drinkIcon.svg';
import exploreicon from '../images/exploreIcon.svg';
import mealicon from '../images/mealIcon.svg';
import '../css/Footer.css';
import Context from '../Context/Context';
import { fetchFoods, fetchDrinks } from '../services';

function Footer() {
  const { setFoods, setFoodsClone, setDrinks, setDrinksClone } = useContext(Context);

  const handlefoodClick = () => {
    async function fetch() {
      const res = await fetchFoods();
      setFoods(res);
      setFoodsClone(res);
    }
    fetch();
    // const { meals } = await fetch(
    //   'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    // ).then((data) => data.json());
    // const magicNumber = 12;
    // const SplitArray = meals.filter((item, idx) => idx < magicNumber);
    // await setFoods(SplitArray);
    // await setFoodsClone(SplitArray);
  };

  const handledrinkClick = async () => {
    async function fetch() {
      const res = await fetchDrinks();
      setDrinks(res);
      setDrinksClone(res);
    }
    fetch();
    // const { drinks } = await fetch(
    //   'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    // ).then((data) => data.json());
    // const magicNumber = 12;
    // const SplitArray = drinks.filter((item, idx) => idx < magicNumber);
    // await setDrinks(SplitArray);
    // await setDrinksClone(SplitArray);
  };

  return (
    <div data-testid="footer" className="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ handledrinkClick }
        src={ drinkicon }
      >
        <img src={ drinkicon } alt="drink icon" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreicon }
      >
        <img src={ exploreicon } alt="explore icon" />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
        type="button"
        onClick={ handlefoodClick }
        src={ mealicon }
      >
        <img src={ mealicon } alt="meal icon" />
      </Link>
    </div>
  );
}

export default Footer;
