import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    toastr: toastrReducer,
    ...injectedReducers,
  });

  return connectRouter(history)(rootReducer);
}
