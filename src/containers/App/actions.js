import { toastr } from 'react-redux-toastr';
import { SUCCESS_MESSAGES } from 'utils/constants';
import {
  AUTH_TOKEN_ERROR,
  LOGOUT,
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

/**
 * Dispatched when auth token is invalid
 *
 * @return {object} An action object with a type of AUTH_TOKEN_ERROR
 */
export function authTokenFailed() {
  return {
    type: AUTH_TOKEN_ERROR,
    payload: {},
  };
}

/**
 * Dispatched when logging out
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}

/**
 * Fetch roles, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_ROLES
 */
export function fetchRoles() {
  return {
    type: FETCH_ROLES,
    payload: {},
  };
}

/**
 * Dispatched when the roles are fetched by the request saga
 *
 * @param  {object} roles roles info
 *
 * @return {object} An action object with a type of FETCH_ROLES_SUCCESS passing the roles
 */
export function fetchRolesSucceeded({ roles }) {
  return {
    type: FETCH_ROLES_SUCCESS,
    payload: { roles },
  };
}

/**
 * Dispatched when fetching roles fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_ROLES_ERROR passing the error
 */
export function fetchRolesFailed(error) {
  toastr.error(error.message);

  return {
    type: FETCH_ROLES_ERROR,
    payload: { error },
  };
}

/**
 * Register user, this action starts the request saga
 *
 * @return {object} An action object with a type of REGISTER
 */
export function register({ email, password, role }) {
  return {
    type: REGISTER,
    payload: {
      email,
      password,
      role,
    },
  };
}

/**
 * Dispatched when the user is registered by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of REGISTER_SUCCESS passing the user
 */
export function registerSucceeded({ token, user }) {
  toastr.success(SUCCESS_MESSAGES.REGISTER_SUCCESS);

  return {
    type: REGISTER_SUCCESS,
    payload: { token, user },
  };
}

/**
 * Dispatched when registering user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of REGISTER_ERROR passing the error
 */
export function registerFailed(error) {
  toastr.error(error.message);

  return {
    type: REGISTER_ERROR,
    payload: { error },
  };
}

/**
 * Login user, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN
 */
export function login({ email, password }) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

/**
 * Dispatched when the user is logged in by the request saga
 *
 * @param  {object} user user info
 *
 * @return {object} An action object with a type of LOGIN_SUCCESS passing the user
 */
export function loginSucceeded({ token, user }) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, user },
  };
}

/**
 * Dispatched when logging in user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOGIN_ERROR passing the error
 */
export function loginFailed(error) {
  toastr.error(error.message);

  return {
    type: LOGIN_ERROR,
    payload: { error },
  };
}
