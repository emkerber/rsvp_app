import { combineReducers } from 'redux';

const info = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PENDING_INFO': 
      return action.payload;
    case 'UNSET_PENDING_INFO':
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  info,
});