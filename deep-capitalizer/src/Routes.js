import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Visualization from './components/Visualization';
import App from './components/App';
import ButtonAppBar from './components/shared-components/Navbar';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <div className='App'>
      <ButtonAppBar/>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/visualization' exact component={Visualization} />
          <Route path='/app' exact component={App} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
