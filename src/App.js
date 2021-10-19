import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  Profile,
  Explore,
  DrinkDetail,
  FoodDetail,
  FoodInProgress,
  DrinkInProgress,
  RecipesMade,
  FavoriteRecipes,
  ExploreFoods,
  ExploreByAreaFood,
  ExploreByIngredientFood,
  ExploreByIngredientDrink,
  ExploreDrinks,
  NotFound,
} from './Pages/Index';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodDetail } />
        <Route exact path="/drinks/:id" component={ DrinkDetail } />
        <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          path="/explore/foods/ingredients"
          component={ ExploreByIngredientFood }
        />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreByIngredientDrink }
        />
        <Route path="/explore/foods/area" component={ ExploreByAreaFood } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/recipes-made" component={ RecipesMade } />
        <Route path="/recipes-favorite" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
