import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rules from './Rules';
import About from './About';
import Login from './Login';
import Board from './Board';

function AppContainer(props) {
  const { players, apiUrl, hasTurn, mainPlayer } = { ...props };

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login apiUrl={apiUrl} />
        </Route>
        <Route path='/board'>
          <Board apiUrl={apiUrl} hasTurn={hasTurn} mainPlayer={mainPlayer} />
        </Route>
        <Route path='/rules'>
          <Rules />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Rules />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppContainer;
