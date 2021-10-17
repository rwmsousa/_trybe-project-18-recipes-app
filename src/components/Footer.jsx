import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkicon from '../images/drinkIcon.svg';
import exploreicon from '../images/exploreIcon.svg';
import mealicon from '../images/mealIcon.svg';
import '../css/footer.css';
import Context from '../Context/Context';
import { fetchFoods, fetchDrinks } from '../services';

function Footer() {
  const { setFoods,
    setFoodsClone,
    setDrinks,
    setDrinksClone,
    setShouldUpdate } = useContext(Context);

  const handlefoodClick = () => {
    async function fetch() {
      const res = await fetchFoods();
      setFoods(res);
      setFoodsClone(res);
    }
    fetch();
    setShouldUpdate(false);
    // const { meals } = await fetch(
    //   'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    // ).then((data) => data.json());
    // const magicNumber = 12;
    // const SplitArray = meals.filter((item, idx) => idx < magicNumber);
    // await setFoods(SplitArray);
    // await setFoodsClone(SplitArray);
  };

  const handledrinkClick = () => {
    async function fetch() {
      const res = await fetchDrinks();
      setDrinks(res);
      setDrinksClone(res);
    }
    fetch();
    setShouldUpdate(false);
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
        {/* <img src={ drinkicon } alt="drink icon" /> */}
        <i className="fas fa-cocktail" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreicon }
      >
        {/* <img src={ exploreicon } alt="explore icon" /> */}
        <i className="fas fa-globe" />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
        type="button"
        onClick={ handlefoodClick }
        src={ mealicon }
      >
        {/* <img src={ mealicon } alt="meal icon" /> */}
        <i className="fas fa-utensils" />
      </Link>
    </div>
  );
}

export default Footer;
