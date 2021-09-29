import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkicon from '../images/drinkIcon.svg';
import exploreicon from '../images/exploreIcon.svg';
import mealicon from '../images/mealIcon.svg';
import '../css/Footer.css';
import Context from '../Context/Context';

function Footer() {
  const { setFoods, setFoodsClone, setDrinks, setDrinksClone } = useContext(Context);

  const handlefoodClick = async () => {
    const { meals } = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    ).then((data) => data.json());
    const magicNumber = 12;
    const SplitArray = meals.filter((item, idx) => idx < magicNumber);
    await setFoods(SplitArray);
    await setFoodsClone(SplitArray);
  };

  const handledrinkClick = async () => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    ).then((data) => data.json());
    const magicNumber = 12;
    const SplitArray = response.drinks.splice(0, magicNumber);

    setDrinks(SplitArray);
    setDrinksClone(SplitArray);
  };

  return (
    <div data-testid="footer" className="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ handledrinkClick }
      >
        <img src={ drinkicon } alt="drink icon" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
        type="button"
      >
        <img src={ exploreicon } alt="explore icon" />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
        type="button"
        onClick={ handlefoodClick }
      >
        <img src={ mealicon } alt="meal icon" />
      </Link>
    </div>
  );
}

export default Footer;
