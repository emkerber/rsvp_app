import { combineReducers } from 'redux';

// might not use any of this??

const guestList = (state = [], action) => {
  switch (action.type) {
    case 'SET_GUEST_LIST':
      return action.payload;
    case 'EMPTY_GUEST_LIST':
      return [];
    default:
      return state;
  }
};

const pendingList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PENDING_LIST':
      return action.payload;
    case 'EMPTY_PENDING_LIST':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  guestList,
  pendingList,
});