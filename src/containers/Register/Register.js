import React from 'react';
import PropTypes from 'prop-types';
import UserForm, { FORM_MODE } from 'components/UserForm';
import { ROLES } from 'utils/constants';

import 'styles/containers/user.css';

const Register = ({ roles, currentUser, registerUser }) => {
  const rolesData = roles.data.filter(role => role.name !== ROLES.ADMIN);

  return (
    <div className="user-page page">
      <UserForm
        mode={FORM_MODE.REGISTER}
        rolesData={rolesData}
        user={currentUser}
        onSubmit={registerUser}
      />
    </div>
  );
};

Register.propTypes = {
  roles: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

export default Register;
