import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReduxToastr from 'react-redux-toastr';
import isNil from 'lodash/isNil';
import injectSaga from 'utils/injectSaga';
import { ERROR_MESSAGES } from 'utils/constants';
import routes from './routes';
import { logout, fetchRoles } from './actions';
import {
  makeSelectRoles,
  makeSelectIsAuthenticated,
  makeSelectCurrentUser,
} from './selectors';
import saga from './saga';
import AppBar from 'components/AppBar';
import Alert, { ALERT_TYPE } from 'components/Alert';
import Spinner from 'components/Spinner';

import 'styles/containers/app.css';

const theme = createMuiTheme({ typography: { useNextVariants: true } });

class App extends Component {
  static propTypes = {
    roles: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    fetchUserRoles: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchUserRoles } = this.props;

    fetchUserRoles();
  }

  render() {
    const {
      roles: { loading: rolesLoading, error: rolesError, data: rolesData },
      isAuthenticated,
      currentUser: { data: currentUserData },
      logoutUser,
    } = this.props;

    if (isNil(rolesData) || rolesLoading) {
      return <Spinner />;
    }

    if (rolesError) {
      return <Alert type={ALERT_TYPE.ERROR} message={rolesError.message} />;
    }

    if (rolesData === false || rolesData.length === 0) {
      return (
        <Alert
          type={ALERT_TYPE.ERROR}
          message={ERROR_MESSAGES.NO_ROLES_FOUND}
        />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Helmet>
            <meta
              name="description"
              content="React + Redux + JWT Authentication"
            />
            <title>React + Redux + JWT Authentication</title>
          </Helmet>
          <AppBar
            isAuthenticated={isAuthenticated}
            currentUserData={currentUserData}
            rolesData={rolesData}
            logout={logoutUser}
          />
          {routes(isAuthenticated)}
          <ReduxToastr
            timeOut={5000}
            newestOnTop={true}
            preventDuplicates
            position="top-right"
            transitionIn="bounceIn"
            transitionOut="bounceOut"
            progressBar={false}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  currentUser: makeSelectCurrentUser(),
  roles: makeSelectRoles(),
});
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
  fetchUserRoles: () => dispatch(fetchRoles()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withRouter,
  withSaga,
  withConnect,
)(App);
