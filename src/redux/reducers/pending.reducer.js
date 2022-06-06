import { combineReducers } from 'redux';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

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

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const nopeList = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOPE_LIST':
      return action.payload;
    case 'UNSET_NOPE_LIST':
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  // for guests
  info,
  // for admin
  nopeList,
});