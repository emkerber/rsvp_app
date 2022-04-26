import { combineReducers } from 'redux';

const guestDuties = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GUEST_DUTIES':
      return action.payload;
    case 'UNSET_GUEST_DUTIES':
      return {};
    default:
      return state;
  }
}

const allDuties = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_DUTIES':
      return action.payload;
    case 'UNSET_ALL_DUTIES':
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  guestDuties,
  allDuties,
});