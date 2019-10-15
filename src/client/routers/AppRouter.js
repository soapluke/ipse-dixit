import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import Header from '../components/Header';
import Register from '../components/Register';
import RegisterSuccess from '../components/RegisterSuccess';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import CreatePost from '../components/CreatePost';
import NotFound from '../components/NotFound';
import ProfilePage from '../components/ProfilePage';
import ErrorBoundary from '../components/ErrorBoundary'


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <AuthProvider>
            <Header />
            <Switch>
                <ErrorBoundary>
                    <PublicRoute path="/register" component={Register} />
                    <PublicRoute path="/registered" component={RegisterSuccess} />
                    <PublicRoute path="/login" component={Login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/new" component={CreatePost} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    
                    <Redirect from="/" to="/login" />
                </ErrorBoundary>
            </Switch>
        </AuthProvider>
    </Router>
);

export default AppRouter;

//<Route component={NotFound}/>