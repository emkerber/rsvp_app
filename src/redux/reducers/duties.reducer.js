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

// const allDuties = (state = {}, action) => {
//   switch (action.type) {
//     case 'SET_ALL_DUTIES':
//       return action.payload;
//     case 'UNSET_ALL_DUTIES':
//       return {};
//     default:
//       return state;
//   }
// }

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

export default combineReducers({
  // guests:
  dutyResponses,
  // allDuties,
  // admin:
});