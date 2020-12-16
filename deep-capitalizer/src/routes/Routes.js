import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Visualization from '../components/Visualization';
import ServerTest from '../components/ServerTest';
import ButtonAppBar from '../components/shared-components/Navbar';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default Routes = () => {
  return (
    <div className='App'>
      <ButtonAppBar/>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/visualization' exact component={Visualization} />
          <Route path='/server-test' exact component={ServerTest} />
        </Switch>
      </Router>
    </div>
  )
}
