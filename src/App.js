import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks, Profile, Explorer } from './Pages/Index';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/explorar" component={ Explorer } />
        {/* <Route path="/bebidas/{id}" component={ DrinkDetail } /> */ }
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
