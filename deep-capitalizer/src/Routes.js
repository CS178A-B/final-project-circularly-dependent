import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import TestPage from './components/TestPage';
import App from './components/App';
import ButtonAppBar from './components/Navbar';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <>
      <ButtonAppBar/>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/testPage' exact component={TestPage} />
          <Route path='/app' exact component={App} />
        </Switch>
      </Router>
    </>
  )
}

export default Routes
