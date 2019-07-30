export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const ERROR_MESSAGES = {
  NOT_FOUND_PAGE: 'Not found what you wanted to see. Try different route.',
  NO_ROLES_FOUND: 'No roles found. Please try again later.',
};

export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully.',
};

export const API_BASE = process.env.REACT_APP_API_SERVER_URL;

export const ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
};
