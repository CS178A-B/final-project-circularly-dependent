import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TestPage from './TestPage';

const Main = () => {
    return ( 
        <Switch> {/* The Switch decides which component to show based on the current URL */}
            <Route exact path='/testPage' component={TestPage}/>
        </Switch>
    );
}

export default Main;