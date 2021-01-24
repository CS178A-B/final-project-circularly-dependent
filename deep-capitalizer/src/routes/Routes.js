import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Visualization from '../components/Visualization';
import ServerTest from '../components/ServerTest';
import ButtonAppBar from '../components/shared-components/Navbar';
import Login from '../components/Login'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <div className='App'>
      <Router history={history}>
        <ButtonAppBar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/visualization' exact component={Visualization} />
          <Route path='/server-test' exact component={ServerTest} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
