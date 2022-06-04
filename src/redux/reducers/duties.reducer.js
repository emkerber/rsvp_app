import { combineReducers } from 'redux';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const dutyResponses = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DUTY_RESPONSES':
      return action.payload;
    case 'UNSET_DUTY_RESPONSES':
      return {};
    default:
      return state;
  }
}

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

export default combineReducers({
  // guests:
  dutyResponses,
  // admin:
});