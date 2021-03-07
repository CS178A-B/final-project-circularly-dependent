import React, { useState, useMemo } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Visualization from '../components/Visualization';
import SumChart from '../components/SumChart';
import ServerTest from '../components/ServerTest';
import ButtonAppBar from '../components/shared-components/Navbar';
import Login from '../components/Login'
import Logout from '../components/Logout'
import { createBrowserHistory } from 'history';
import { UserContext } from '../globals';
import Upload from '../components/Upload'

export const history = createBrowserHistory();

const Routes = () => {
  const [value, setValue] = useState(false);
  return (
    <div className='App'>
      <Router history={history}>
        <UserContext.Provider value={{value, setValue}}>
          {/* <ButtonAppBar/> */}
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={Login} />
              <Route path='/logout' exact component={Logout} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/visualization' exact component={Visualization} />
              <Route path='/sum-chart' exact component={SumChart} />
              <Route path='/server-test' exact component={ServerTest} />
              <Route path='/upload' exact component={Upload} />
              {/* <Route path='/server-test' exact component={ServerTest} /> */}
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default Routes
