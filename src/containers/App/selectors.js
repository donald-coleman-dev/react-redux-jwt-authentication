import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const makeSelectLocation = () => createSelector(
  selectRouter,
  routerState => routerState.location
);

const selectGlobal = state => state.global;
const makeSelectRoles = () => createSelector(
  selectGlobal,
  globalState => globalState.roles
);
const makeSelectIsAuthenticated = () => createSelector(
  selectGlobal,
  globalState => globalState.isAuthenticated
);
const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  globalState => globalState.currentUser
);

export {
  makeSelectLocation,
  selectGlobal,
  makeSelectRoles,
  makeSelectIsAuthenticated,
  makeSelectCurrentUser
};
