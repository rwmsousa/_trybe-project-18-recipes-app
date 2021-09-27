export async function fetchIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
}

export async function fetchName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
}

export async function fetchFirstLetter(firstLetter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
}

export async function fetchByCategoryFoods(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const magicNumber = 12;
  const SplitArray = data.meals.splice(0, magicNumber);
  return SplitArray;
}

export async function fetchByCategoryDrinks(category) {
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  const magicNumber = 12;
  const SplitArray = drinks.splice(0, magicNumber);
  return SplitArray;
}

export async function fetchRandomFoodDetails() {
  const response = await
  fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  const { meals } = data;
  return meals;
}

export async function fetchRandomDrinkDetails() {
  const response = await
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}
