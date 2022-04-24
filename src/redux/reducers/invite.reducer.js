import { combineReducers } from 'redux';

const inviteStatus = (state = '', action) => {
  switch (action.type) {
    // payload can be can be 'guest', 'pending', 'nope', or 'none'
    case 'SET_INVITE_STATUS': 
      return action.payload;
    case 'UNSET_INVITE_STATUS':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  inviteStatus,
});