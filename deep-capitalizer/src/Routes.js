
import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import TestPage from './TestPage';
import App from './App'
import history from './History';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/testPage' exact component={TestPage} />
                    <Route path='/app' exact component={App} />
                </Switch>
            </Router>
        )
    }
}