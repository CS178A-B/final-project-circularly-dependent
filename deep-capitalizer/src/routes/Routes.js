import React, { useState, useMemo } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

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
import Goal from '../components/Goal'

export const history = createBrowserHistory();

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='App'>
      <Router history={history}>
        <UserContext.Provider value={{loggedIn, setLoggedIn}}>
          {/* <ButtonAppBar/> */}
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={Login}>
                {(loggedIn)? <Redirect to='/' /> : <Login />}
              </Route> 
              <Route path='/logout' exact component={Logout} />
              <Route path='/dashboard' exact component={Dashboard}>
                {(!loggedIn)? <Redirect to='/login' /> : <Dashboard />}
              </Route>
              <Route path='/visualization' exact component={Visualization}>
                {(!loggedIn)? <Redirect to='/login' /> : <Visualization />}
              </Route>
              <Route path='/sum-chart' exact component={SumChart}>
                {(!loggedIn)? <Redirect to='/login' /> : <SumChart />}
              </Route>
              <Route path='/server-test' exact component={ServerTest} />
              <Route path='/upload' exact component={Upload}>
                {(!loggedIn)? <Redirect to='/login' /> : <Upload />} 
              </Route>
              <Route path='/goal' exact component={Goal} />
              <Route path='/server-test' exact component={ServerTest} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default Routes
