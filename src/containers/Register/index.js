import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { register } from 'containers/App/actions';
import {
  makeSelectRoles,
  makeSelectCurrentUser
} from 'containers/App/selectors';
import saga from './saga';
import Register from './Register';

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
  currentUser: makeSelectCurrentUser()
});
const mapDispatchToProps = dispatch => ({
  registerUser: ({ email, password, role }) =>
    dispatch(register({ email, password, role }))
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withSaga,
  withConnect
)(Register);
