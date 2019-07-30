import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from 'containers/Register';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';

const ControlledRoute = ({
  mode,
  component: Component,
  shouldLoad,
  unloadRedirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (shouldLoad) {
        return mode ? (
          <Component mode={mode} {...props} />
        ) : (
          <Component {...props} />
        );
      }

      return <Redirect to={{ pathname: unloadRedirectTo }} />;
    }}
  />
);

const routes = isAuthenticated => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <ControlledRoute
      path="/register"
      component={Register}
      shouldLoad={!isAuthenticated}
      unloadRedirectTo="/"
    />
    <ControlledRoute
      path="/login"
      component={Login}
      shouldLoad={!isAuthenticated}
      unloadRedirectTo="/"
    />
    <Route component={NotFound} />
  </Switch>
);

export default routes;
