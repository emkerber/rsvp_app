import { combineReducers } from 'redux';

// current user's row from users
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// true when registration or login is successful
const authSuccess = (state = false, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return true;
    case 'UNSET_AUTH_SUCCESS':
      return false;
    default:
      return state;
  }
}

// user will be on the redux state at:
// state.user
export default combineReducers({
  userReducer,
  authSuccess,
});