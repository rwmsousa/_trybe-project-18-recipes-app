import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ list }) {
  return (
    <ul>
      <li>{ `${list[0].strIngredient1} - ${list[0].strMeasure1}` }</li>
      <li>{ `${list[0].strIngredient2} - ${list[0].strMeasure2}` }</li>
      <li>{ `${list[0].strIngredient3} - ${list[0].strMeasure3}` }</li>
      <li>{ `${list[0].strIngredient4} - ${list[0].strMeasure4}` }</li>
      <li>{ `${list[0].strIngredient5} - ${list[0].strMeasure5}` }</li>
      <li>{ `${list[0].strIngredient6} - ${list[0].strMeasure6}` }</li>
      <li>{ `${list[0].strIngredient7} - ${list[0].strMeasure7}` }</li>
      <li>{ `${list[0].strIngredient8} - ${list[0].strMeasure8}` }</li>
      <li>{ `${list[0].strIngredient9} - ${list[0].strMeasure9}` }</li>
      <li>{ `${list[0].strIngredient10} - ${list[0].strMeasur10}` }</li>
      <li>{ `${list[0].strIngredient11} - ${list[0].strMeasure11}` }</li>
      <li>{ `${list[0].strIngredient12} - ${list[0].strMeasure12}` }</li>
      <li>{ `${list[0].strIngredient13} - ${list[0].strMeasure13}` }</li>
      <li>{ `${list[0].strIngredient14} - ${list[0].strMeasure14}` }</li>
      <li>{ `${list[0].strIngredient15} - ${list[0].strMeasure15}` }</li>
      <li>{ `${list[0].strIngredient16} - ${list[0].strMeasure16}` }</li>
      <li>{ `${list[0].strIngredient17} - ${list[0].strMeasure17}` }</li>
      <li>{ `${list[0].strIngredient18} - ${list[0].strMeasure18}` }</li>
      <li>{ `${list[0].strIngredient19} - ${list[0].strMeasure19}` }</li>
      <li>{ `${list[0].strIngredient20} - ${list[0].strMeasure20}` }</li>
    </ul>
  );
}

IngredientsList.propTypes = {
  list: PropTypes.objectOf().isRequired,
};

export default IngredientsList;
