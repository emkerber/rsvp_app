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

const responses = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESPONSES': 
      return action.payload;
    case 'UNSET_RESPONSES':
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  inviteStatus,
  responses,
});