import React from 'react';
import { Link } from 'react-router-dom';
import drinkicon from '../images/drinkIcon.svg';
import exploreicon from '../images/exploreIcon.svg';
import mealicon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        type="button"
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
      >
        <img src={ mealicon } alt="meal icon" />
      </Link>
    </div>
  );
}

export default Footer;
