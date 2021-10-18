import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  Profile,
  Explorer,
  DrinkDetail,
  FoodDetail,
  FoodInProgress,
  DrinkInProgress,
  RecipesMade,
  FavoriteRecipes,
  ExplorerFoods,
  ExploreByAreaFood,
  ExploreByIngredientFood,
  ExploreByIngredientDrink,
  ExplorerDrinks,
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
        <Route exact path="/explorer" component={ Explorer } />
        <Route exact path="/explorer/foods" component={ ExplorerFoods } />
        <Route exact path="/explorer/drinks" component={ ExplorerDrinks } />
        <Route
          path="/explorer/foods/ingredients"
          component={ ExploreByIngredientFood }
        />
        <Route
          path="/explorer/drinks/ingredients"
          component={ ExploreByIngredientDrink }
        />
        <Route path="/explorer/foods/area" component={ ExploreByAreaFood } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/recipes-made" component={ RecipesMade } />
        <Route path="/recipes-favorites" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
