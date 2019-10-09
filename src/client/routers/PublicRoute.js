import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Redirect to="/dashboard" /> : <Component {...props} /> 
        }
        {...rest}
      />
    )}
  </AuthConsumer>
);

export default PublicRoute;