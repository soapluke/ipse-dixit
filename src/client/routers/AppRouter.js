import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import Header from '../components/Header';
import Register from '../components/Register';
import RegisterSuccess from '../components/RegisterSuccess';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <AuthProvider>
            <Header />
            <Switch>
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/registered" component={RegisterSuccess} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </AuthProvider>
    </Router>
);

export default AppRouter;