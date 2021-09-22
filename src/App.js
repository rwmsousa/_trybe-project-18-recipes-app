import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks, Profile, Explorer } from './Pages/Index';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
