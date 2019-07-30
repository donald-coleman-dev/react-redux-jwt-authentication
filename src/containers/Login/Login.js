import React from 'react';
import PropTypes from 'prop-types';
import UserForm, { FORM_MODE } from 'components/UserForm';

import 'styles/containers/user.css';

const Login = ({ currentUser, loginUser }) => (
  <div className="user-page page">
    <UserForm
      mode={FORM_MODE.LOGIN}
      user={currentUser}
      onSubmit={loginUser}
    />
  </div>
);

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  location: PropTypes.object
};

Login.defaultProps = {
  location: {}
};

export default Login;
