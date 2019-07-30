import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { APP_BAR_STYLES } from './constants';

class TopAppBar extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUserData: PropTypes.any,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentUserData: null,
  };

  state = {
    anchorEl: null,
  };

  handleAccountMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  goToMyAccount = () => {
    const { history } = this.props;

    this.handleAccountMenuClose();
    history.push('/account');
  };

  logout = () => {
    const { logout } = this.props;

    this.handleAccountMenuClose();
    logout();
  };

  getAuthenticatedMenuItems = () => {
    const { classes, currentUserData } = this.props;
    const { anchorEl } = this.state;
    const { email, firstName, lastName, role } = currentUserData;
    const mainMenuItems = [];
    let currentUserLabel = (
      <span className={classes.menuButtonEmail}>{email}</span>
    );

    if (firstName) {
      currentUserLabel = (
        <span className={classes.menuButtonName}>
          {firstName} {lastName}
        </span>
      );
    }

    const accountMenuItems = [
      <Fragment key="authenticated-account">
        <Button
          className={classes.menuButton}
          aria-owns={anchorEl ? 'account-menu-items' : undefined}
          aria-haspopup="true"
          onClick={this.handleAccountMenuClick}
        >
          {currentUserLabel}
        </Button>
        <Menu
          id="account-menu-items"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleAccountMenuClose}
        >
          <MenuItem onClick={this.goToMyAccount}>My Account</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </Fragment>,
    ];

    return { mainMenuItems, accountMenuItems };
  };

  render() {
    const { classes, isAuthenticated } = this.props;
    let mainMenuItems = [];
    let accountMenuItems = [
      <Link key="register" to="/register" className={classes.menuItem}>
        Register
      </Link>,
      <Link key="login" to="/login" className={classes.menuItem}>
        Login
      </Link>,
    ];

    if (isAuthenticated) {
      mainMenuItems = this.getAuthenticatedMenuItems().mainMenuItems;
      accountMenuItems = this.getAuthenticatedMenuItems().accountMenuItems;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div>
              <Link to="/" className={classes.brandText}>
                React + Redux + JWT Authentication
              </Link>
            </div>
            <div className={classes.mainMenu}>{mainMenuItems}</div>
            <div>{accountMenuItems}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(APP_BAR_STYLES),
)(TopAppBar);
