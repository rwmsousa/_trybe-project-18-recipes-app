import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useLocation } from 'react-router-dom';
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
  ExplorerDrinks
} from './Pages/Index';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ Foods } />
      <Route path="/comidas/:id" component={ FoodDetail } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/bebidas/:id" component={ DrinkDetail } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route path="/explorar" component={ Explorer } />
      <Route path="/explorar/comidas" component={ ExplorerFoods } />
      <Route path="/explorar/comidas/area" component={ ExploreByAreaFood } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreByIngredientFood } />
      <Route path="/explorar/bebidas" component={ ExplorerDrinks } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreByIngredientDrink } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesMade } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
