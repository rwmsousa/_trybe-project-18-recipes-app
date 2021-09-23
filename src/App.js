import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks, Profile, Explorer } from './Pages';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/explorar" component={ Explorer } />
      {/* <Route path="/bebidas/{id}" component={ DrinkDetail } /> */ }
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
