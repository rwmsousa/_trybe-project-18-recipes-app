import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ list }) {
  return (
    <ul>
      <li data-testid="0-ingredient-name-and-measure">
        { `${list[0].strIngredient1} - ${list[0].strMeasure1}` }
      </li>
      <li data-testid="1-ingredient-name-and-measure">
        { `${list[0].strIngredient2} - ${list[0].strMeasure2}` }
      </li>
      <li data-testid="2-ingredient-name-and-measure">
        { `${list[0].strIngredient3} - ${list[0].strMeasure3}` }
      </li>
      <li data-testid="3-ingredient-name-and-measure">
        { `${list[0].strIngredient4} - ${list[0].strMeasure4}` }
      </li>
      <li data-testid="4-ingredient-name-and-measure">
        { `${list[0].strIngredient5} - ${list[0].strMeasure5}` }
      </li>
      <li data-testid="5-ingredient-name-and-measure">
        { `${list[0].strIngredient6} - ${list[0].strMeasure6}` }
      </li>
      <li data-testid="6-ingredient-name-and-measure">
        { `${list[0].strIngredient7} - ${list[0].strMeasure7}` }
      </li>
      <li data-testid="7-ingredient-name-and-measure">
        { `${list[0].strIngredient8} - ${list[0].strMeasure8}` }
      </li>
      <li data-testid="8-ingredient-name-and-measure">
        { `${list[0].strIngredient9} - ${list[0].strMeasure9}` }
      </li>
      <li data-testid="9-ingredient-name-and-measure">
        { `${list[0].strIngredient10} - ${list[0].strMeasur10}` }
      </li>
      <li data-testid="10-ingredient-name-and-measure">
        { `${list[0].strIngredient11} - ${list[0].strMeasure11}` }
      </li>
      <li data-testid="11-ingredient-name-and-measure">
        { `${list[0].strIngredient12} - ${list[0].strMeasure12}` }
      </li>
      <li data-testid="12-ingredient-name-and-measure">
        { `${list[0].strIngredient13} - ${list[0].strMeasure13}` }
      </li>
      <li data-testid="13-ingredient-name-and-measure">
        { `${list[0].strIngredient14} - ${list[0].strMeasure14}` }
      </li>
      <li data-testid="14-ingredient-name-and-measure">
        { `${list[0].strIngredient15} - ${list[0].strMeasure15}` }
      </li>
      <li data-testid="15-ingredient-name-and-measure">
        { `${list[0].strIngredient16} - ${list[0].strMeasure16}` }
      </li>
      <li data-testid="16-ingredient-name-and-measure">
        { `${list[0].strIngredient17} - ${list[0].strMeasure17}` }
      </li>
      <li data-testid="17-ingredient-name-and-measure">
        { `${list[0].strIngredient18} - ${list[0].strMeasure18}` }
      </li>
      <li data-testid="18-ingredient-name-and-measure">
        { `${list[0].strIngredient19} - ${list[0].strMeasure19}` }
      </li>
      <li data-testid="19-ingredient-name-and-measure">
        { `${list[0].strIngredient20} - ${list[0].strMeasure20}` }
      </li>
    </ul>
  );
}

IngredientsList.propTypes = {
  list: PropTypes.objectOf().isRequired,
};

export default IngredientsList;
