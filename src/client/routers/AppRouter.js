import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import Register from '../components/Register';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <Header />
        <Switch>
            <Route path="/register" component={Register} />
        </Switch>
    </Router>
);

export default AppRouter;