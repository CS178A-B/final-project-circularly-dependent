import React, { useState, useMemo } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Visualization from '../components/Visualization';
import ServerTest from '../components/ServerTest';
import ButtonAppBar from '../components/shared-components/Navbar';
import Login from '../components/Login'
import Logout from '../components/Logout'
import { createBrowserHistory } from 'history';
import { UserContext } from '../globals';

export const history = createBrowserHistory();

const Routes = () => {
  const [value, setValue] = useState(false);
  return (
    <div className='App'>
      <Router history={history}>
        <UserContext.Provider value={{value, setValue}}>
        <ButtonAppBar/>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/visualization' exact component={Visualization} />
            <Route path='/server-test' exact component={ServerTest} />
        </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default Routes
